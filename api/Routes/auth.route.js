import express from 'express'
import { signUpRouter } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/sign-up', signUpRouter)

export default router