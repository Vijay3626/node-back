import express from "express";
import {  authget, authLogin, authlogout, authregister } from "../controllers/authcontroller.js";
import { userList } from "../controllers/userController.js";

const router = express.Router();

router.post("/login", authLogin)
router.post("/register", authregister)
router.post("/logout",authlogout)
router.get("/userlist",userList);
router.get("/get",authget)

export default router;