import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())

// routes
import userRouter from './Routes/auth.route.js'
app.use('/api/v1/user', userRouter)

export default app


