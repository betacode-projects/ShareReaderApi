import express from 'express'
import { user } from '../models/user'

const isMatchedAuth = (req: express.Request, res: express.Response, next: () => void): void => {
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
  return next()
}

export default isMatchedAuth