import qs from 'qs'
import DBConfig from '../database/dbConfig'
import { initModels } from '../models/init-models'
import Utility from '../utils/utility'

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

  /*const models = initModels(DBConfig)
  models.user.findOne({
    where: {
      user_private_token: 
    }
  })*/




  return {
    result: true,
    response: JSON.stringify({
      "sender": senderToken,
      "receiver": receiverToken
    })
  }
}

export default downloadCheckParams