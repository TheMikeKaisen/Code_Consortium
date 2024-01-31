import express from 'express'
import { google, signInRouter, signUpRouter, updateUser } from '../controllers/auth.controller.js'
import { verifyToken } from '../middleware/verifyUser.js'

const router = express.Router()

router.post('/sign-up', signUpRouter)
router.post('/sign-in', signInRouter)
router.post('/google', google)
router.post('/update', verifyToken, updateUser)

export default router