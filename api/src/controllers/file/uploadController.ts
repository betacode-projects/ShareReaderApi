import express from 'express'
import { Storage } from '@google-cloud/storage'
import hasha from 'hasha'
import fileType from 'file-type'
import fs from 'fs'
import { initModels } from '../../models/init-models'
import DBConfig from '../../database/dbConfig'
import {TokenManager} from '../../modules/TokenManager'
import { UserMode, FlagID, TokenMode } from '../../modules/flags'

const fileController = (req: express.Request, res: express.Response): void => {
  const filePath = req.file?.path || ''
  const bucketName = 'share-objects'
  const storage = new Storage()
  const fileSize: number = req.file?.size || 0
  const fileName = req.file?.originalname || ''
  const fileFormat = req.file?.mimetype || ''
  let fileExtension = ''
  const fileHash = hasha.fromFileSync(filePath, {algorithm: 'sha256'})

  const token = new TokenManager()
  token.insertUserToken(UserMode.Sender, req.ip, req.headers['user-agent']).then(() => {
    //拡張子取得
    fileType.fromFile(filePath).then((result) => {
      if(typeof result?.ext !== 'undefined'){
        console.log(result.ext)
        fileExtension = result.ext
      }
    }).then(() => {
      //DB登録
      let user_id = -1
      const models = initModels(DBConfig)
      models.user.findOne({
        where: {
          user_public_token: token
        }
      }).then((record) => {
        if(record !== null){
          user_id = record.user_id
        }
      }).then(()=> {
        models.file_info.create({
          user_id: user_id,
          file_size: fileSize,
          file_name: fileName,
          file_extension: fileExtension,
          file_format: fileFormat,
          file_hash: fileHash
        }).then((result) => {
          console.log('user_info created: ' + result)
        }).catch((error) => {
          console.log('失敗：' + error)
        })
      })
    }).then(() => {
      //アップロード
      async function uploadFile(): Promise<void> {
        await storage.bucket(bucketName).upload(filePath, {
          destination: destFileName,
        })
        console.log(`${filePath} uploaded to ${bucketName}`)
      }

      uploadFile().then((result) => {
        res.status(200).send(JSON.stringify({
          "satus": "success",
          "message": "Upload complete!",
          "data": {result}
        }))
        fs.unlink(filePath, () => {
          console.log(req.file?.filename + ' deleted')
        })
      }).catch((error) => {
        res.status(400).send(JSON.stringify({
          "status": "error",
          "message": error,
          "data": {}
        }))
        fs.unlink(filePath, () => {
          console.log(req.file?.filename + ' deleted')
        })
      })
    })
  }).catch((error) => {
    console.log(error)
  })
  return
}

export default fileController