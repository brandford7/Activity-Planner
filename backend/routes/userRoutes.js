import express from "express";
import {
  loginUser,
  registerUser,
  updateUser,
  getUserData,
} from "../controllers/userController.js";
import protect from '../middleware/authMiddleWare.js'

const router = express.Router();

router.get("/me",protect, getUserData);
router.post('/login', loginUser);

router.post("/", registerUser);

router.put("/:id", updateUser);



export default router;
