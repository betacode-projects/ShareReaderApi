import DBConfig from '../database/dbConfig'
import { initModels } from '../models/init-models'
import { UserMode, FlagID, TokenMode } from './flags'
import crypto from 'crypto'


export class TokenManager {
  private _private_token = ''
  private _public_token = ''
    
  public async checkToken(user_mode: UserMode, bearer_auth?: string, token_mode:TokenMode = TokenMode.Private): Promise<any> {
    return new Promise<void>((resolve, reject) => {
      if (typeof bearer_auth === 'undefined') {
        reject()
        return
      }
    
      const tokens: string[] = bearer_auth.split(' ')
      if (tokens.length === 2 && tokens[0].toLowerCase() !== 'bearer') {
        reject()
        return
      }

      initModels(DBConfig).user.findOne({
        where: {
          [token_mode]: tokens[1],
          user_mode_id: user_mode,
          flag_id: FlagID.Working,
        }
      }).then((record) => {
        if (typeof record?.user_private_token === 'undefined' || typeof record?.user_public_token === 'undefined'){
          reject()
          return
        }

        this._private_token = record?.user_private_token
        this._public_token = record?.user_public_token

        resolve()
      }).catch((error) => {
        console.log(error)
        reject()
      })
    })
  }

  public async deleteToken(user_mode: UserMode, bearer_auth?: string): Promise<any> {
    return new Promise<void>((resolve, reject) => {
      if (typeof bearer_auth === 'undefined') {
        reject()
        return
      }
            
      const tokens: string[] = bearer_auth.split(' ')
      if (tokens.length === 2 && tokens[0].toLowerCase() !== 'bearer') {
        reject()
        return
      }

      initModels(DBConfig).user.update({
        flag_id: FlagID.LogicalDeletion
      },
      {
        where: { 'user_private_token': tokens[1], 'user_mode_id': user_mode }
      }).then((result) => {
        if (result[0] === 0) reject()
        resolve()
      }).catch(() => reject())
    })
  }

  public generateRandom(digit: number): string {
    const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_"
    return Array.from(crypto.randomFillSync(new Uint8Array(digit))).map((n) => S[n % S.length]).join('')
  }

  public generateToken(): void{
    this._private_token = this.generateRandom(32)
    this._public_token = this.generateRandom(32)
  }

  public async insertUserToken(user_mode: UserMode, remote_addr?: string, user_agent_data?: string): Promise<any>{
    this.generateToken()

    return initModels(DBConfig).user.create({
      flag_id: FlagID.Working,
      user_public_token: this._public_token,
      user_private_token: this._private_token,
      user_agent: user_agent_data as string,
      user_ip: remote_addr as string,
      user_mode_id: user_mode
    })
  }

  public get private(): string {
    return this._private_token
  }

  public get public(): string {
    return this._public_token
  }
}
