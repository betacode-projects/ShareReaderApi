import express from 'express'
import { Storage } from '@google-cloud/storage'
import hasha from 'hasha'
import fileType from 'file-type'
import fs from 'fs'
import Utility from '../../utils/utility'

const fileController = (req: express.Request, res: express.Response): void => {
  let filePath = ''
  let token = ''
  //undefined除去
  if(typeof req.file?.path === 'undefined'){
    res.status(400).send(JSON.stringify({
      "status": "success",
      "message": "Upload file not found",
      "data": {}
    }))
    return
  }else{
    filePath = req.file.path
  }
  if(typeof req.headers.authorization !== 'undefined'){
    token = Utility.getToken(req.headers.authorization)
  }
  console.log('結果：' + token)
  const bucketName = 'share-objects'
  const destFileName = 'storage/' + token
  const storage = new Storage()
  const fileSize: number = req.file.size
  const fileName = req.file.originalname
  const fileFormat = req.file.mimetype
  let fileExtension = ''
  let fileHash = ''
  console.log('アップロード名：' + destFileName)
  //拡張子取得
  fileType.fromFile(filePath).then((result) => {
    if(typeof result?.ext !== 'undefined'){
      fileExtension = result.ext
    }
  })

  //ファイルハッシュ化
  hasha.fromFile(filePath, {algorithm: 'sha256'}).then((result) => {
    console.log('ファイルハッシュ化成功：' + result)
    fileHash = result
  })

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
  return
}

export default fileController