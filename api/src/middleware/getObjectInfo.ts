import express from 'express'
import { initModels } from "../models/init-models"
import DBConfig from '../database/dbConfig'

const getObjectInfo = (req: express.Request, res: express.Response, next: (record: any[]) => void): void => {
  const senderToken = req.query.sender
  const receiverToken = req.query.receiver

  const models = initModels(DBConfig)
  models.user.findAll({
    where: {
      user_public_token: senderToken
    },
    raw: true,
    include: [{
      model: models.file_info,
      as: 'file_infos',
      required: true
    }]
  }).then((record) => {
    console.log('成功: ' + JSON.stringify(record))
    next(record)
  }).catch((error) => {
    console.log('SQL エラー: ' + error)
    res.status(401).send(JSON.stringify({
      "status": "error",
      "message": "File not found"
    }))
  })
  return
}

export default getObjectInfo