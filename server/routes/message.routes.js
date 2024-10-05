import express from 'express'
import { sendMessage } from '../controller/message.contorller.js'

const router = express.Router()

router.post('/send', sendMessage)

export default router