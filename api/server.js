import app from './app.js'
import prisma from './utils/prisma.js'

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`)
  try {
    await prisma.$queryRaw`SELECT 1`
    console.log('Database connection established')
  } catch (error) {
    console.error('Database connection failed:', error.message)
  }
})
