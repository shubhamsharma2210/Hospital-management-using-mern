import express from 'express'
import { getAllMessage, sendMessage } from '../controller/message.contorller.js'
import { isAdminAuthenticated } from '../middleware/auth.js'

const router = express.Router()

router.post('/send', sendMessage)
router.get('/getmessage',isAdminAuthenticated ,getAllMessage)

export default router