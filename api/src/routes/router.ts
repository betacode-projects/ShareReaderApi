import express from 'express'
import multer from 'multer'
import isMatchedSenderAuth from '../modules/isMutchedSenderAuth'
import uploadController from '../controllers/file/uploadController'
import generateToken from '../controllers/token/generateUploaderToken'

export const router: express.Router = express.Router()

router.post('/file', isMatchedSenderAuth, multer({dest: 'storage/'}).single('file'), uploadController)
router.post('/token', generateToken)