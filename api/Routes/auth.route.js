import express from 'express'
import { google, signInRouter, signUpRouter } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/sign-up', signUpRouter)
router.post('/sign-in', signInRouter)
router.post('/google', google)

export default router