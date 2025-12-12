import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { errorHandler } from './middlewares/errorHandler.js'
import { requireAuthentication } from './middlewares/auth.js'
import hotelRoutes from './routes/hotelRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())

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

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.get('/api/auth/test', requireAuthentication, (req, res) => {
  res.json({
    message: 'Authentication successful',
    userId: req.user.userId
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/hotels', hotelRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/payments', paymentRoutes)

app.use(errorHandler)

export default app
