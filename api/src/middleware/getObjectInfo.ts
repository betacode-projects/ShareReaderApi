import express from 'express'
import { initModels } from "../models/init-models"
import DBConfig from '../database/dbConfig'

const getObjectInfo = (req: express.Request, res: express.Response, next: () => void): void => {
  const models = initModels(DBConfig)
  models.user.findAll({
    where: {
      user_public_token: req.query.sender
    },
    raw: true,
    include: [{
      model: models.file_info,
      as: 'file_infos',
      required: true
    }]
  }).then((record) => {
    res.locals.fileInfo = record[record.length - 1]
    next()
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