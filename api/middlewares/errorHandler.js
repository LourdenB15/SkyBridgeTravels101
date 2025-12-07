export const errorHandler = (err, req, res, next) => {
  console.error(err.stack || err.message || err)

  if (err.name === 'ZodError') {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.errors
    })
  }

  if (err.name === 'NotFoundError' || err.statusCode === 404) {
    return res.status(404).json({
      error: err.message || 'Resource not found'
    })
  }

  if (err.name === 'UnauthorizedError' || err.statusCode === 401) {
    return res.status(401).json({
      error: err.message || 'Unauthorized'
    })
  }

  if (err.name === 'ForbiddenError' || err.statusCode === 403) {
    return res.status(403).json({
      error: err.message || 'Forbidden'
    })
  }

  if (err.code === 'P2002') {
    return res.status(409).json({
      error: 'A record with this value already exists'
    })
  }

  if (err.code === 'P2025') {
    return res.status(404).json({
      error: 'Record not found'
    })
  }

  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal server error'

  res.status(statusCode).json({
    error: message
  })
}

export class NotFoundError extends Error {
  constructor(message = 'Resource not found') {
    super(message)
    this.name = 'NotFoundError'
    this.statusCode = 404
  }
}

export class ValidationError extends Error {
  constructor(message = 'Validation failed') {
    super(message)
    this.name = 'ValidationError'
    this.statusCode = 400
  }
}

export class UnauthorizedError extends Error {
  constructor(message = 'Unauthorized') {
    super(message)
    this.name = 'UnauthorizedError'
    this.statusCode = 401
  }
}

export class ConflictError extends Error {
  constructor(message = 'Resource already exists') {
    super(message)
    this.name = 'ConflictError'
    this.statusCode = 409
  }
}
