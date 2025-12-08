import { Router } from 'express'
import * as authController from '../controllers/authController.js'
import { validate } from '../middlewares/validate.js'
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateProfileSchema
} from '../utils/validationSchemas.js'

const router = Router()

router.post('/register', validate(registerSchema), authController.register)
router.post('/login', validate(loginSchema), authController.login)
router.post('/logout', authController.logout)
router.post('/forgot-password', validate(forgotPasswordSchema), authController.forgotPassword)
router.post('/reset-password', validate(resetPasswordSchema), authController.resetPassword)
router.get('/me', authController.me)
router.put('/profile', validate(updateProfileSchema), authController.updateProfile)

export default router
