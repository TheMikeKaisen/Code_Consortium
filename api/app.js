import express from 'express'

const app = express()
app.use(express.json())

// routes
import userRouter from './Routes/auth.route.js'
app.use('/api/v1/user', userRouter)

export default app


