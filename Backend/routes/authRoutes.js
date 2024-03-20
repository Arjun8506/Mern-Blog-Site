import express from "express"
import { deleteUser, login, logout, registerUser, updateUser } from "../controllers/auth.comntrollers.js"
import { verifyToken } from "../utils/verufyToken.js"

const router = express.Router()

router.post("/register", registerUser)

router.post("/login", login)

router.post("/logout", logout)

router.post("/update/:id", verifyToken, updateUser)

router.post("/delete/:id", verifyToken, deleteUser)

export default router