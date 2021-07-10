import express from 'express'
import fs from 'fs'
import DBConfig from '../database/dbConfig'
import { initModels } from '../models/init-models'

const downloadResponse = (req: express.Request, res: express.Response): void => {
  const fileInfo = res.locals.fileInfo
  const receiverUserInfo = res.locals.receiverUserInfo
  const destFileName = res.locals.destFileName
  console.log('fileInfoのid：' + fileInfo['file_infos.file_info_id'])

  const models = initModels(DBConfig)
  Promise.all([
    models.download.create({
      user_id: receiverUserInfo.user_id,
      file_info_id: fileInfo['file_infos.file_info_id'],
      download_date: new Date()
    }),
    models.user.update(
      {
        user_mode_id: 2,
        flag_id: 2
      },
      {
        where: {
          user_id: receiverUserInfo.user_id
        }
      }
    )
  ]).then(() => {
    const file = fs.readFileSync(destFileName)
    const fileName = encodeURIComponent(res.locals.fileName)
    res.set({"Content-disposition": `attachment; filename=${fileName}`})
    res.status(200).send(file)
  }).catch((error) => {
    res.status(401).send(JSON.stringify({
      "status": "error",
      "message": error
    }))
  })
  return
}

export default downloadResponse