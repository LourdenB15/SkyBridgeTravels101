import * as authService from '../services/authService.js'
import { verifyToken } from '../utils/jwt.js'
import { UnauthorizedError } from '../middlewares/errorHandler.js'

const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000

const setAuthCookie = (res, token) => {
  res.cookie('auth_token', token, {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === 'true',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE
  })
}

const clearAuthCookie = (res) => {
  res.clearCookie('auth_token', {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === 'true',
    sameSite: 'lax'
  })
}

export const register = async (req, res, next) => {
  try {
    const { user, token } = await authService.register(req.body)
    setAuthCookie(res, token)
    res.status(201).json({ user })
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const { user, token } = await authService.login(email, password)
    setAuthCookie(res, token)
    res.status(200).json({ user })
  } catch (error) {
    next(error)
  }
}

export const logout = async (req, res, next) => {
  try {
    clearAuthCookie(res)
    res.status(200).json({ message: 'Logged out successfully' })
  } catch (error) {
    next(error)
  }
}

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body
    const result = await authService.forgotPassword(email)
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body
    const result = await authService.resetPassword(token, password)
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

export const me = async (req, res, next) => {
  try {
    const token = req.cookies?.auth_token
    if (!token) {
      throw new UnauthorizedError('Authentication required')
    }

    const decoded = verifyToken(token)
    const user = await authService.getCurrentUser(decoded.userId)
    res.status(200).json({ user })
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return next(new UnauthorizedError('Invalid or expired token'))
    }
    next(error)
  }
}
