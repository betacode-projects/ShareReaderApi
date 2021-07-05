import qs from 'qs'
import DBConfig from '../database/dbConfig'
import { initModels } from '../models/init-models'

const downloadCheckParams = (senderToken: string | qs.ParsedQs | string[] | qs.ParsedQs[] | undefined, receiverToken: string | qs.ParsedQs | string[] | qs.ParsedQs[] | undefined): {result: boolean, response: string} => {
  if(typeof senderToken === 'undefined'){
    return {
      result: false,
      response: JSON.stringify({
        "status": "error",
        "message": "Param of sender undefined"
      })
    }
  }

  if(typeof receiverToken === 'undefined'){
    return {
      result: false,
      response: JSON.stringify({
        "status": "error",
        "message": "Param of receiver undefined"
      })
    }
  }

  const models = initModels(DBConfig)
  let resultData: {result: boolean, response: string}| null = null
  models.user.findOne({
    where: {
      user_private_token: receiverToken
    }
  }).then((record) => {
    if(record?.user_mode_id != 2){
      resultData = {
        result: false,
        response: JSON.stringify({
          "status": "error",
          "message": "Unauthorized",
          "data": {
            "detail": "Different user modes. not receiver"
          }
        })
      }
    }
  }).catch((error) => {
    console.log('エラー：' + error)
    resultData = {
      result: false,
      response: JSON.stringify({
        "status": "error",
        "messsage": "Unauthorized",
        "data": {
          "detail": [
            "No matching token",
            error
          ]
        }
      })
    }
  })
  
  if(resultData !== null){
    return resultData
  }

  return {
    result: true,
    response: JSON.stringify({
      "sender": senderToken,
      "receiver": receiverToken
    })
  }
}

export default downloadCheckParams