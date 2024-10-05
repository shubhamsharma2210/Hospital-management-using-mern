import express from "express";
import {
  adminRegister,
  logIn,
  patientRegister,
} from "../controller/userController.controller.js";

const router = express.Router();

router.post("/patitent/register", patientRegister);
router.post("/login", logIn);
router.post("/admin/addNew", adminRegister);

export default router;
