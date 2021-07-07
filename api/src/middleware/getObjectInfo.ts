import { initModels } from "../models/init-models"
import DBConfig from '../database/dbConfig'
import { result } from "lodash"

const getObjectInfo = (publicToken: string): {result: boolean, response: string} => {
  let resultData = {
    result: false,
    response: JSON.stringify({
      "status": "error",
      "message": "server error"
    })
  }

  const models = initModels(DBConfig)
  models.user.findAll({
    where: {
      user_public_token: publicToken
    },
    raw: true,
    include: [{
      model: models.file_info,
      required: true
    }]
  }).then((record) => {
    console.log(record)
  }).catch((error) => {
    resultData = {
      result: false,
      response: JSON.stringify({
        "status": "error",
        "message": "not found",
        "data": {
          "detail": error
        }
      })
    }
  })
  
  return resultData
}

export default getObjectInfo