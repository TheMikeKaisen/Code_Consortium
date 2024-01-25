import express from 'express'

const app = express()


// routes
import userRouter from './Routes/test.route.js'
app.use('/api/v1/user', userRouter)

export default app


