import express from "express";
import {
  register,
  login,
  authenticate,
  getHospital,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/authenticate", authenticate);
router.get("/local", getHospital);

export default router;
