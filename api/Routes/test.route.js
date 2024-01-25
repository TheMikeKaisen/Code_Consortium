import express from 'express'
const router = express.Router()

//controllers
import { testController } from '../controllers/test.controller.js';

router.get('/test', testController)

export default router