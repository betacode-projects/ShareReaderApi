import express from 'express'
import multer from 'multer'
import isMatchedSenderAuth from '../authentication/isMutchedSenderAuth'
import uploadController from '../controllers/file/uploadController'

export const router: express.Router = express.Router()

router.post('/file', isMatchedSenderAuth, multer({dest: 'storage/'}).single('file'), uploadController)