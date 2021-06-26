import express from 'express'
import { user } from '../models/user'
import { initModels } from '../models/init-models'
import DBConfig from '../database/DBConfig'
import { Sequelize } from 'sequelize'

const isMatchedSenderAuth = (req: express.Request, res: express.Response, next: () => void): void => {
  const public_token = req.headers.authorization 
  
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
  
  const models = initModels(DBConfig)
  models.user.findOne({
    where: {
      user_public_token: public_token
    }
  }).then((record) => {
    if(record?.user_mode_id != 1){
      res.status(401).send(JSON.stringify({
        "status": "error",
        "message": "Unauthorized",
        "data": {
          "detail": "Different user modes. not sender"
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

  return next()
}

export default isMatchedSenderAuth