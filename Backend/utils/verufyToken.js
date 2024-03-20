import jwt from 'jsonwebtoken'
import { errorHandler } from './errorHandle.js'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.LoggedInToken
    if (!token) return next(errorHandler(401, "Unauthorised"))
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, "Forbidden"))

        req.user = user
        next()
    })

}