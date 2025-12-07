import * as userRepo from '../repositories/userRepository.js'
import { hashPassword, comparePassword } from '../utils/password.js'
import { generateToken, generateResetToken } from '../utils/jwt.js'
import { sendPasswordResetEmail } from '../utils/email.js'
import { NotFoundError, UnauthorizedError, ConflictError } from '../middlewares/errorHandler.js'

const RESET_TOKEN_EXPIRY_HOURS = 1

export const register = async (userData) => {
  const existingUser = await userRepo.findByEmail(userData.email)
  if (existingUser) {
    throw new ConflictError('Email already registered')
  }

  const hashedPassword = await hashPassword(userData.password)
  const user = await userRepo.create({
    ...userData,
    password: hashedPassword
  })

  const token = generateToken({ userId: user.id })

  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    },
    token
  }
}

export const login = async (email, password) => {
  const user = await userRepo.findByEmail(email)
  if (!user) {
    throw new UnauthorizedError('Invalid email or password')
  }

  const isValidPassword = await comparePassword(password, user.password)
  if (!isValidPassword) {
    throw new UnauthorizedError('Invalid email or password')
  }

  const token = generateToken({ userId: user.id })

  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    },
    token
  }
}

export const forgotPassword = async (email) => {
  const user = await userRepo.findByEmail(email)
  if (!user) {
    return { message: 'If an account exists, a reset email has been sent' }
  }

  const resetToken = generateResetToken()
  const resetTokenExpiry = new Date(Date.now() + RESET_TOKEN_EXPIRY_HOURS * 60 * 60 * 1000)

  await userRepo.updateResetToken(user.id, resetToken, resetTokenExpiry)
  await sendPasswordResetEmail(user.email, resetToken)

  return { message: 'If an account exists, a reset email has been sent' }
}

export const resetPassword = async (token, newPassword) => {
  const user = await userRepo.findByResetToken(token)
  if (!user) {
    throw new UnauthorizedError('Invalid or expired reset token')
  }

  const hashedPassword = await hashPassword(newPassword)
  await userRepo.updatePassword(user.id, hashedPassword)

  return { message: 'Password reset successful' }
}

export const getCurrentUser = async (userId) => {
  const user = await userRepo.findById(userId)
  if (!user) {
    throw new NotFoundError('User not found')
  }

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    createdAt: user.createdAt
  }
}
