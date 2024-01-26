import express from 'express'
import { signInRouter, signUpRouter } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/sign-up', signUpRouter)
router.post('/sign-in', signInRouter)

export default router