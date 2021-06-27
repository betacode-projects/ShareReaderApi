import express from 'express'
import { Storage } from '@google-cloud/storage'
import multer from 'multer'

const fileController = (req: express.Request, res: express.Response): void => {
  const bucketName = 'share-objects'
  const filePath = ''
  const destFileName = 'storage/' + req.headers.authorization
  const storage = new Storage()

  async function uploadFile(): Promise<void> {
    await storage.bucket(bucketName).upload(filePath, {
      destination: destFileName,
    })
  
    console.log(`${filePath} uploaded to ${bucketName}`)
  }
  
  uploadFile().then(() => {
    res.status(200).send(JSON.stringify({
      "satus": "success",
      "message": "Upload complete!",
      "data": {}
    }))
  }).catch((error) => {
    res.status(400).send(JSON.stringify({
      "status": "error",
      "message": error,
      "data": {}
    }))
  })
  return
}

export default fileController