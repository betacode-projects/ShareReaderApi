import express from 'express'
import downloadCheckParams from '../middleware/downloadCheckParams'

const downloadController = (req: express.Request, res: express.Response): void => {
  console.log(req.query)
  const paramsResult = downloadCheckParams(req.query.sender, req.query.receiver)
  if(paramsResult.result === false){
    res.status(401).send(paramsResult.response)
    return
  }
  
  return
}

export default downloadController