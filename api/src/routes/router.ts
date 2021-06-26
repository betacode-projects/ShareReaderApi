import express from 'express'
import isMatchedSenderAuth from '../authentication/isMutchedSenderAuth'
import uploadController from '../controllers/file/uploadController'

export const router: express.Router = express.Router()

router.post('/file', isMatchedSenderAuth)
router.post('/file', uploadController)