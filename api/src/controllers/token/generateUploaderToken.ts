import express from 'express'
import {TokenManager} from '../../modules/TokenManager'
import { UserMode, ApiStatus } from '../../modules/flags'
import {APIJson } from '../../modules/APIJson'

const generateToken = async (req: express.Request, res: express.Response): Promise<any> => {
    const token = new TokenManager()
    const api = new APIJson()
    await token.checkToken(UserMode.Receiver, req.headers.authorization).then(() => {
        api.status = ApiStatus.Success
        api.private_token = token.private
        api.public_token = token.public
        res.status(200).send(api.parse())
    }).catch(() => {
        token.insertUserToken(UserMode.Receiver, req.ip, req.headers['user-agent']).then(() =>{
            api.status = ApiStatus.Success
            api.private_token = token.private
            api.public_token = token.public
            res.status(200).send(api.parse())
        }).catch((error) =>{
            api.message = 'トークンを発行できませんでした。時間がたってから再度実行してください'
            res.status(200).send(api.parse())
        })
    })
}

export default generateToken