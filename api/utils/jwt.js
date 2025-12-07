import jwt from 'jsonwebtoken'
import crypto from 'crypto'

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' })
}

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

export const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex')
}
