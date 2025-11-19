import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { errorHandler } from './middlewares/errorHandler.js'
import hotelRoutes from './routes/hotelRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'

dotenv.config()

const app = express()

app.use(express.json())

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}))

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/hotels', hotelRoutes)
app.use('/api/bookings', bookingRoutes)

app.use(errorHandler)

export default app
