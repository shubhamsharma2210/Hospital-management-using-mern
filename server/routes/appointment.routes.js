import express from 'express'
import { deleteAppointment, getAllAppointment, postAppointment, updateAppointmentStatus } from '../controller/appointment.controller.js'
import { isAdminAuthenticated, isPatientAuthenticated } from '../middleware/auth.js'

const router = express.Router()
router.post('/sent',isPatientAuthenticated, postAppointment)
router.get('/getall',isAdminAuthenticated, getAllAppointment)
router.put('/updatestatus/:id', isAdminAuthenticated, updateAppointmentStatus)
router.delete('/delete/:id', isAdminAuthenticated, deleteAppointment)

export default router