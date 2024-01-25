import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

// routes
import userRouter from './Routes/auth.route.js'
app.use('/api/v1/user', userRouter)

export default app


