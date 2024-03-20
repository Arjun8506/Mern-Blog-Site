import express from "express"
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import ConnectToDB from "./connectToDB/connectsToDB.js"
import authRoutes from './routes/authRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import commentRoutes from './routes/comment.Routes.js'

const app = express()
dotenv.config()

const __dirname = path.resolve()

app.use(express.json())
app.use(cookieParser())

const port = process.env.PORT || 3000

app.use("/api/auth", authRoutes)
app.use("/api/blog", blogRoutes)
app.use("/api/comment", commentRoutes)

app.listen(port, () => {
    ConnectToDB()
    console.log(`server is running on ${port}`)
})

app.use(express.static(path.join(__dirname, '/Frontend/dist')))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'Frontend', 'dist', 'index.html'))
}) 

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Inter Server Error"
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})