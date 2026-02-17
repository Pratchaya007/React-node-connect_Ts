import express, { Router } from 'express'
import { authController } from '../controllers/auth.controllers.js'
import { authenticate } from '../middlewares/authenticatemiddlewares.js'
import { upload } from '../middlewares/uploadmiddleware.js'


export const authRouter: Router = express.Router()
authRouter.post('/register',authController.register)
authRouter.post('/login', authController.login)

authRouter.get('/me', authenticate ,authController.getMe)
authRouter.post('/logout', authController.logOut)
authRouter.get('/refresh', authController.refresh)
authRouter.patch('/profile', 
  upload.single('profileImage'),
    authController.uploadProfileImage
  // upload.fields([{name : 'profileImage' , maxCount: 5},{name: 'coverImage'}]));
)