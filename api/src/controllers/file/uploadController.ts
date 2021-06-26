import express from 'express'
import { Storage } from '@google-cloud/storage'
import multer from 'multer'
import { user } from '../../models/user'

const fileController = (req: express.Request, res: express.Response): void => {
  const public_token: string | undefined = req.headers.authorization
  const bucketName = 'share-objects'
  const filePath = ''
  const destFileName = 'storage/'
  const storage = new Storage()

  
  if(typeof public_token === 'undefined'){
    res.status(401).send(JSON.stringify({
      "status": "error",
      "message": "Unauthorized",
      "data": {
        "detail": "authorization undefined"
      }
    }))
    return
  }
  
  const findByPublicToken = (): void => {
    user.findOne({
      where: {
        user_public_token: public_token
      }
    }).then((record) => {
      if(record?.user_mode_id != 1){
        res.status(401).send(JSON.stringify({
          "status": "error",
          "message": "Unauthorized",
          "data": {
            "detail": "Different user modes"
          }
        }))
        return
      }
    }).catch(() => {
      res.status(401).send(JSON.stringify({
        "status": "error",
        "messsage": "Unauthorized",
        "data": {
          "detail": "No matching token"
        }
      }))
      return
    })
  }

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
  }).catch(() => {
    res.status(400).send(JSON.stringify({
      "status": "error",
      "message": console.error,
      "data": {}
    }))
  })
  return
}

export default fileController