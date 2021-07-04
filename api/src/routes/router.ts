import express from 'express'
import multer from 'multer'
import isMatchedSenderAuth from '../authentication/isMutchedSenderAuth'
import uploadController from '../controllers/file/uploadController'
import downloadController from '../controllers/downloadController'
import isMatchedReceiverAuth from '../middleware/isMutchedReceiverAuth'

export const router: express.Router = express.Router()

const path = '/v1/api'

router.post(path + '/file', isMatchedSenderAuth, multer({dest: 'storage/'}).single('file'), uploadController)
router.get(path + '/file', isMatchedReceiverAuth, downloadController)