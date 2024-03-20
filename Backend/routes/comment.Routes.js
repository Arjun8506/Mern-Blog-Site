import express from "express"
import { verifyToken } from "../utils/verufyToken.js"
import { commentCreate, deleteComment, getAllComments } from "../controllers/comments.controllers.js"

const router = express.Router()

router.post("/create/:id", verifyToken, commentCreate)

router.post("/delete/:id", verifyToken, deleteComment)

router.get("/allcomments/:id", getAllComments)

export default router