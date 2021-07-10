import express from 'express'
import {TokenManager} from '../../modules/TokenManager'
import { UserMode } from '../../modules/flags'
import {APIJson, Status} from '../../modules/APIJson'

const generateToken = async (req: express.Request, res: express.Response): Promise<any> => {
    const token = new TokenManager()
    await token.checkToken(UserMode.Receiver, req.headers.authorization).then(() => {
        const api = new APIJson()
        api.status = Status.Success
        api.private_token = token.private
        api.public_token = token.public
        res.status(200).send(api.parse())
    }).catch(() => {
        token.insertUserToken(UserMode.Receiver, req.ip, req.headers['user-agent']).then(() =>{
            const api = new APIJson()
            api.status = Status.Success
            api.private_token = token.private
            api.public_token = token.public
            res.status(200).send(api.parse())
        }).catch((error) =>{
            const api = new APIJson()
            api.message = 'トークンを発行できませんでした。時間がたってから再度実行してください'
            res.status(200).send(api.parse())
        })
    })
}

export default generateToken