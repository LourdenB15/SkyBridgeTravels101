import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { errorHandler } from './middlewares/errorHandler.js'
import { clerkMiddleware, requireAuthentication } from './middlewares/auth.js'
import hotelRoutes from './routes/hotelRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'

dotenv.config()

const app = express()

app.use(express.json())

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
  : ['http://localhost:5173']

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`))
    }
  },
  credentials: true
}))

app.use(clerkMiddleware())

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.get('/api/auth/test', requireAuthentication, (req, res) => {
  res.json({
    message: 'Authentication successful',
    userId: req.auth.userId,
    sessionId: req.auth.sessionId
  })
})

app.use('/api/hotels', hotelRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/payments', paymentRoutes)

app.use(errorHandler)

export default app
