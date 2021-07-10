import DBConfig from '../database/DBConfig'
import { initModels } from '../models/init-models'
import { UserMode, FlagID } from './flags'
import crypto from 'crypto'


export class TokenManager {
    private _private_token: string = ''
    private _public_token: string = ''

    public async checkToken(user_mode: UserMode, bearer_auth?: string): Promise<any> {
        if (typeof bearer_auth === 'undefined') return
    
        const tokens: string[] = bearer_auth.split(' ')
        if (tokens.length === 2 && tokens[0].toLowerCase() !== 'bearer') return

        return new Promise<void>((resolve, reject) => {
            initModels(DBConfig).user.findOne({
                where: {
                    user_private_token: tokens[1]
                }
            }).then((record) => {
                if(record?.user_mode_id !== user_mode){
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

    public generateRandom(digit: number): string {
        const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        return Array.from(crypto.randomFillSync(new Uint8Array(digit))).map((n) => S[n % S.length]).join('')
    }

    public generateToken(): void{
        this._private_token = this.generateRandom(32)
        this._public_token = this.generateRandom(32)
    }

    public async insertUserToken(user_mode: UserMode, remote_addr?: string, user_agent_data?: string): Promise<any>{
        this.generateToken()
        console.log('insert')

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
