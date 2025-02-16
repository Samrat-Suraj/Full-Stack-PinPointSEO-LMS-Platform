import express from "express"
import { GetUserProfile, LoginUser, LogOutUser, RegisterUser, UpdateUser } from "../controller/user.controller.js"
import protectRoute from "../middleware/protect.router.js"
import upload from "../utils/Multer.js"
const router = express.Router()

router.post("/register", RegisterUser)
router.post("/login" ,LoginUser)
router.post("/logout", LogOutUser )

router.get("/profile", protectRoute, GetUserProfile )
router.post("/profile", protectRoute, upload.single("profilePic") ,UpdateUser )

export default router