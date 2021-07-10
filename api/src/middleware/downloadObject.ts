import express from 'express'
import { Storage } from '@google-cloud/storage'

const downloadObject = (req: express.Request, res: express.Response, next: () => void): void => {
  const fileInfo = res.locals.fileInfo
  const storage = new Storage()
  const bucketName = 'share-objects'
  const destFileName =  './storage/' + fileInfo['file_infos.file_name']

  if(typeof req.query.sender !== 'string'){
    res.status(401).send(JSON.stringify({
      "status": "error",
      "message": "not found params"
    }))
    return
  }
  const fileName = 'storage/' + req.query.sender

  async function downloadFile() {
    const options = {
      destination: destFileName,
    }

    await storage.bucket(bucketName).file(fileName).download(options)

    console.log('`gs://${bucketName}/${fileName} downloaded to ${destFileName}.`')
  }

  downloadFile().then(
    (result) => {
      res.locals.destFileName = destFileName
      res.locals.fileName = fileInfo['file_infos.file_name']
      next()
    }
  ).catch(
    (error) => {
      res.status(401).send(JSON.stringify({
        "status": "error",
        "message": {
          error
        }
      }))
    }
  )

  return
}

export default downloadObject