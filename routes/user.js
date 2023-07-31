import express from "express";
import {
  getUser,
  getUsers,
  deleteUser,
  updateUser,
} from "../controllers/user.js";

import { verifyToken, verifyUser, verifyAdmin } from "./utils/verifyToken.js";

const router = express.Router();

//get
router.get("/:id", verifyUser, getUser);

//update
router.put("/:id", verifyUser, updateUser);

//delete
router.delete("/:id", verifyUser, deleteUser);

//getall
router.get("/", verifyAdmin, getUsers);

router.get("/", (req, res) => {
  res.send("this is the auth endpoint");
});

router.get("/register", (req, res) => {
  res.send("this is the auth register endpoint");
});

export default router;
