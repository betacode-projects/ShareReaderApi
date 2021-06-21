import express from 'express'
import uploadController from '../controllers/file/uploadController'

export const router: express.Router = express.Router()
router.post('/file', uploadController)