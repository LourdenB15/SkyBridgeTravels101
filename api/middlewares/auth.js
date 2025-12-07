import { verifyToken } from '../utils/jwt.js'

export const requireAuth = (req, res, next) => {
  const token = req.cookies?.auth_token

  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Authentication required'
    })
  }

  try {
    const decoded = verifyToken(token)
    req.user = {
      userId: decoded.userId
    }
    next()
  } catch (error) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid or expired token'
    })
  }
}

export const requireAuthentication = requireAuth
