import express from "express";
import {
  getDoctor,
  getDoctors,
  deleteDoctor,
  updateDoctor,
} from "../controllers/doctor.js";

import { verifyToken, verifyUser, verifyAdmin } from "./utils/verifyToken.js";

const router = express.Router();

//get
router.get("/:id", getDoctor);
//update
router.put("/:id", verifyUser, updateDoctor);

//delete
router.delete("/:id", deleteDoctor);

//getall
router.get("/", getDoctors);

router.get("/register", (req, res) => {
  res.send("this is the auth register endpoint");
});

export default router;
