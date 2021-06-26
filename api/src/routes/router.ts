import express from 'express'
import isMatchedAuth from '../authentication/isMutchedAuth'
import uploadController from '../controllers/file/uploadController'

export const router: express.Router = express.Router()

router.post('/file', isMatchedAuth)
router.post('/file', uploadController)