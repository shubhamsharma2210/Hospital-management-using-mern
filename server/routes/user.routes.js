import express from "express";
import {
  adminRegister,
  getAllDoctors,
  getUserDetails,
  logIn,
  logoutAdmin,
  patientRegister,
  patientLogout,
  addNewDoctor
} from "../controller/userController.controller.js";
import {isAdminAuthenticated,isPatientAuthenticated} from '../middleware/auth.js'

const router = express.Router();

router.post("/patitent/register", patientRegister);
router.post("/login", logIn);
router.post("/addnew", isAdminAuthenticated,adminRegister);
router.get('/doctors/list', getAllDoctors)
router.get('/admin',isAdminAuthenticated, getUserDetails)
router.get('/patient/me',isPatientAuthenticated, getUserDetails)
router.get('/admin/logout', isAdminAuthenticated, logoutAdmin)
router.get('/patient/logout', isPatientAuthenticated, patientLogout)
router.post('/doctor/addnew',isAdminAuthenticated, addNewDoctor)
export default router;
