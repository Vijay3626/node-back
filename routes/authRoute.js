import express from "express";
import { authLogin, authregister } from "../controllers/authcontroller.js";

const router = express.Router();

router.get("/login", authLogin)
router.post("/register", authregister)

export default router;