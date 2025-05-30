import express from "express";
import { authLogin, authlogout, authregister } from "../controllers/authcontroller.js";

const router = express.Router();

router.post("/login", authLogin)
router.post("/register", authregister)
router.post("/logout",authlogout)

export default router;