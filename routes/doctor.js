import express from "express";
import {
  getDoctor,
  getDoctors,
  deleteDoctor,
  updateDoctor,
} from "../controllers/doctor.js";

import { verifyToken, verifyUser, verifyAdmin } from "./utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next)=>{
//     res.send("Hello user, you are logged in!")
// })

// router.get("/checkuser/:id", verifyDoctor, (req, res, next)=>{
//     res.send("Hello user, you are logged in and you can delete your account")
// })
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next)=>{
//     res.send("Hello admin, you are logged in and you can delete all account")
// })

//get
router.get("/:id", getDoctor); // verifyUser

//update
router.put("/:id", updateDoctor); // verifyUser

//delete
router.delete("/:id", verifyUser, deleteDoctor);

//getall
router.get("/", getDoctors);

router.get("/", (req, res) => {
  res.send("this is the auth endpoint");
});

router.get("/register", (req, res) => {
  res.send("this is the auth register endpoint");
});

export default router;
