import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { errorHandler, NotFoundError } from './middlewares/errorHandler.js'
import hotelRoutes from './routes/hotelRoutes.js'

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

app.get('/test-error', (req, res, next) => {
  next(new NotFoundError('Test resource not found'))
})

app.use('/api/hotels', hotelRoutes)

app.use(errorHandler)

export default app
