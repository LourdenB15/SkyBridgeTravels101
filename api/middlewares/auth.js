import { clerkMiddleware, getAuth, requireAuth } from '@clerk/express'

export { clerkMiddleware, requireAuth }

export const requireAuthentication = (req, res, next) => {
  const auth = getAuth(req)

  if (!auth || !auth.userId) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Authentication required'
    })
  }

  req.auth = {
    userId: auth.userId,
    sessionId: auth.sessionId
  }

  next()
}
