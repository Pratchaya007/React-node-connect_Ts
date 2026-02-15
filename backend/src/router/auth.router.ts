import express, { Router } from 'express'
import { authController } from '../controllers/auth.controllers.js'


export const authRouter: Router = express.Router()
authRouter.post('/register',authController.register)
authRouter.post('/login', authController.login)