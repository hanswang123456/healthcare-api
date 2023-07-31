import express from "express";
import {
  register,
  login,
  authenticate,
  getHospital,
} from "../controllers/auth.js";

const router = express.Router();


// login and register
router.post("/register", register);
router.post("/login", login);
router.post("/authenticate", authenticate);

// user based hospital locator
router.get("/local", getHospital);

export default router;
