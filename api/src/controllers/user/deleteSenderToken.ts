import express from 'express'
import {TokenManager} from '../../modules/TokenManager'
import { UserMode, ApiStatus } from '../../modules/flags'
import {APIJson} from '../../modules/APIJson'


const deleteSenderToken = async (req: express.Request, res: express.Response): Promise<any> => {
    const token = new TokenManager()
    const api = new APIJson()
    await token.deleteToken(UserMode.Sender, req.headers.authorization).then(() => {
        api.status = ApiStatus.Success
        api.private_token = token.private
        api.public_token = token.public
        res.status(200).send(api.parse())
    }).catch(() => {
        api.message = 'トークンを削除できませんでした。時間がたってから再度実行してください'
        res.status(200).send(api.parse())
    })
}

export default deleteSenderToken