import Blog from "../models/blog.model.js";
import { errorHandler } from "../utils/errorHandle.js"

export const createBlog = async (req, res, next) => {

    try {
        const userID = req.params.id
        console.log(`Id : ${userID}`);
        if (req.user.id !== userID) return next(errorHandler(401, "You are not Authenticated"))

        const { title, content, coverImage } = req.body
        const newBlog = new Blog({
            title,
            content,
            coverImage,
            author: userID
        })
        if (!newBlog) return next(errorHandler(500, "Unable to Create Blog"))

        await newBlog.save()

        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "Created Blog Successfully"
        })
    } catch (error) {
        next(error)
    }
}

export const getAllBlogs = async (req, res, next) => {
    try {
        const allBlogs = await Blog.find().populate("author").sort({ createdAt: -1 })
        if (!allBlogs) return next(errorHandler(500, "Unable To Fetch The Data"))
        res.status(200).json({
            success: true,
            message: "Got All Blogs",
            Blogs: allBlogs
        })
    } catch (error) {
        next(error)
    }
}

export const readBlog = async (req, res, next) => {
    try {
        const blogID = req.params.id
        const blog = await Blog.findById(blogID).populate("author")
        if (!blog) return next(errorHandler(404, 'Blog Not Found'))
        res.status(200).json({
            success: true,
            message: "Got Blog",
            ReadBlog: blog
        })
    } catch (error) {
        next(error)
    }
}

export const deleteBlog = async (req, res, next) => {
    try {
        const blogID = req.params.id;
        if (!blogID) {
            return next(errorHandler(400, "Invalid blog ID"));
        }
        const blog = await Blog.findById(blogID);
        if (!blog) {
            return next(errorHandler(404, "Blog not found"));
        }
        if (req.user.id !== blog.author.toString()) {
            return next(errorHandler(403, "You can only delete your own blog"));
        }
        await Blog.findByIdAndDelete(blogID);
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        next(error);
    }
}

export const editBlog = async (req, res, next) => {
    try {
        const blogID = req.params.id;
        if (!blogID) {
            return next(errorHandler(400, "Invalid blog ID"));
        }
        const blog = await Blog.findById(blogID);
        if (!blog) {
            return next(errorHandler(404, "Blog not found"));
        }
        if (req.user.id !== blog.author.toString()) {
            return next(errorHandler(403, "You can only EDIT your own blog"));
        }
        res.status(200).json({
            success: true,
            message: "Got Blog To Edit",
            blogToUpdate: blog
        })
    } catch (error) {
        next(error)
    }
}

export const updateBlog = async (req, res, next) => {
    try {
        const blogID = req.params.id;
        if (!blogID) {
            return next(errorHandler(400, "Invalid blog ID"));
        }

        console.log(req.body.title);
        console.log(req.body.content);
        console.log(req.body.coverImage);

        const blog = await Blog.findByIdAndUpdate(blogID, {
            $set: {
                title: req.body.title,
                content: req.body.content,
                coverImage: req.body.coverImage
            }
        }, {new: true});
        if (!blog) return next(errorHandler(404, "Unable To Update Blog"))
        res.status(200).json({
            success: true,
            message: "Updated the Blog",
            updatedBlog: blog
        })
    } catch (error) {
        next(error)
    }
}

export const myBlogs = async (req, res, next) => {
    try {
        const userID = req.user.id
        const blogs = await Blog.find({author: userID})
        if (!blogs) {
            return next(errorHandler(403, "unable to fetch blogs"))
        }
        res.status(201).json({
            success: true,
            message: "got all your BLOGS",
            MyBlogs: blogs
        })
    } catch (error) {
        next(error)
    }
}