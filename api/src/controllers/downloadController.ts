import express from 'express'
import downloadCheckParams from '../middleware/downloadCheckParams'
import getObjectInfo from '../middleware/getObjectInfo'

const downloadController = (req: express.Request, res: express.Response): void => {
  console.log(req.query)
  const paramsResult = downloadCheckParams(req.query.sender, req.query.receiver)
  if(paramsResult.result === false){
    res.status(401).send(paramsResult.response)
    return
  }

  //ダウンロードするファイルの情報を取得
  const ObjectInfoResult = getObjectInfo(req.query.receiver)
  if(ObjectInfoResult.result === false){
    res.status(401).send(ObjectInfoResult.response)
    return
  }
  console.log(ObjectInfoResult.response)
  
  return
}

export default downloadController