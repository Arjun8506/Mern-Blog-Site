import bcyptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import { errorHandler } from "../utils/errorHandle.js"

export const registerUser = async (req, res, next) => {
    try {
        const { fullname, username, email, password, confirmPassword } = req.body
        if (password != confirmPassword) return next(errorHandler(400, "Passwords don't match"))

        const hashedPassword = bcyptjs.hashSync(password, 10)
        const newUser = await User({
            fullname, username, email, password: hashedPassword
        })
        await newUser.save()
        res.status(201).json("user Created Successfully.")
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const validUser = await User.findOne({ email })
        if (!validUser) return next(errorHandler(404, "User Not Found"))
        const validPassword = bcyptjs.compareSync(password, validUser.password)
        if (!validPassword) return next(errorHandler(400, "Wrong Credentials"))
        const { password: pass, ...rest } = validUser._doc
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
            expiresIn: "15d"
        })
        res.cookie("LoggedInToken", token, { httpOnly: true, maxAge: 15 * 24 * 60 * 60 * 1000 }).status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

export const logout = async (req, res, next) => {
    try {
        res.clearCookie("LoggedInToken")
        res.cookie("loggedOutCookie", "", {maxAge: 0})
        res.status(200).json({message: "User LoggedOut Successfully"})
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const userID = req.params.id
        if (req.user.id !== userID) return next(errorHandler(401, "You are not Authenticated"))
        
        if (req.body.password) {
            req.body.password = bcyptjs.hashSync(req.body.password, 10)
        }
        const updatedUser = await User.findByIdAndUpdate(userID, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profilePic: req.body.profilePic
            }
        }, {new: true})

        if (!updatedUser) return next(errorHandler(404, "user not found"))
        const {password , ...rest} = updatedUser._doc
        res.status(200).json({
            success: true,
            message: "User Updated Successfully",
            user: rest
        })
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const userID = req.params.id
        console.log(`Id : ${userID}`);

        if (req.user.id !== userID) return next(errorHandler(401, "You are not Authenticated"))
        const user = await User.findByIdAndDelete(userID)
        if(!user) return next(errorHandler(500, 'Unable to delete'))
        res.clearCookie("LoggedInToken")
        res.cookie("loggedOutCookie", "", {maxAge: 0})
        res.status(200).json({message: "Deleted Account Successfully"})
    } catch (error) {
        next(error)
    }
}