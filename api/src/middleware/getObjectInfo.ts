import co from 'co'
import { initModels } from "../models/init-models"
import DBConfig from '../database/dbConfig'

const getObjectInfo = (publicToken: string | qs.ParsedQs | string[] | qs.ParsedQs[] | undefined): {result: boolean, response: string} => {
  let resultData: {result: boolean, response: string} | null = null

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
    resultData = {
      result: true,
      response: JSON.stringify(record)
    }
  }).catch((error) => {
    console.log('SQL エラー: ' + error)
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
  if(resultData !== null){
    return resultData
  }
  return {
    result: false,
    response: JSON.stringify({
      "status": "error"
    })
  }
}

export default getObjectInfo