import express from 'express'
import DBConfig from '../database/dbConfig'
import { initModels } from '../models/init-models'

const downloadCheckParams = (req: express.Request, res: express.Response, next: () => void): void => {
  console.log('-------------into downloadCheckParams middleware!!-------------')
  const senderToken = req.query.sender
  const receiverToken = req.query.receiver
  
  if(typeof senderToken === 'undefined'){
    res.status(401).send(JSON.stringify({
      "status": "error",
      "message": "Param of sender undefined"
    }))
    return
  }

  if(typeof receiverToken === 'undefined'){
    res.status(401).send(JSON.stringify({
      "status": "error",
      "message": "Param of receiver undefined"
    }))
    return
  }

  const models = initModels(DBConfig)
  models.user.findOne({
    where: {
      user_private_token: receiverToken
    }
  }).then((record) => {
    res.locals.receiverUserInfo = record
    next()
  }).catch((error) => {
    console.log('エラー：' + error)
    res.status(401).send(JSON.stringify({
      "status": "error",
      "messsage": "Unauthorized",
      "data": {
        "detail": [
          "No matching token",
          error
        ]
      }
    }))
  })

  return 
}

export default downloadCheckParams