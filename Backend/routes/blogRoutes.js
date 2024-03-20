import express from 'express'
import { verifyToken } from '../utils/verufyToken.js'
import { createBlog, deleteBlog, editBlog, getAllBlogs, myBlogs, readBlog, updateBlog } from '../controllers/blog.controllers.js'

const router = express.Router()

router.post("/create/:id", verifyToken, createBlog)

router.get("/AllBlogs", getAllBlogs)

router.get("/read/:id", readBlog)

router.post("/delete/:id", verifyToken ,deleteBlog)

router.post("/edit/:id", verifyToken ,editBlog)

router.post("/update/:id", verifyToken ,updateBlog)

router.get("/myblogs", verifyToken, myBlogs)

export default router