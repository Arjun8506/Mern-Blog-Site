import Comment from "../models/comment.model.js"
import { errorHandler } from "../utils/errorHandle.js"

export const commentCreate = async (req, res, next) => {
    try {
        const blogID = req.params.id
        const userID = req.user.id
        const { comment } = req.body

        const existingComment = await Comment.findOne({ user: userID, blog: blogID });
        if (existingComment) return next(errorHandler(400, "You have already commented on this blog"));

        const newComment = new Comment({
            user: userID,
            comment: comment,
            blog: blogID,
        })
        if (!newComment) return next(errorHandler(500, "Unable To Create Comment"))

        await newComment.save()

        res.status(201).json({
            success: true,
            statuscode: 201,
            message: "saved the comment"
        })
    } catch (error) {
        next(error)
    }
}

export const getAllComments = async (req, res, next) => {
    try {
        const blogid = req.params.id
        const comments = await Comment.find({ blog: blogid }).populate("user").sort({ createdAt: -1 })
        if (!comments) return next(errorHandler(404, "comments not found related to thsi Blog"))
        res.status(200).json({
            success: true,
            message: "All comments are here",
            AllComments: comments
        })
    } catch (error) {
        next(error)
    }
}

export const deleteComment = async (req, res, next) => {
    try {
        const commentid = req.params.id
        console.log(commentid);
        const comment = await Comment.findByIdAndDelete(commentid)
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Deleted Comment Successfully",
            comment: comment
        })
    } catch (error) {
        next(error)
    }
}