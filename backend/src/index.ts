import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import lessonsRoutes from './routes/lessons'
import progressRoutes from './routes/progress'
import vocabularyRoutes from './routes/vocabulary'
import recordingsRoutes from './routes/recordings'
import { logger } from './middleware/logger'
import { errorHandler } from './middleware/errorHandler'

// Load environment variables (for local development)
// In Lambda, environment variables are provided by AWS
if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Routes
app.use('/api/lessons', lessonsRoutes)
app.use('/api/progress', progressRoutes)
app.use('/api/vocabulary', vocabularyRoutes)
app.use('/api/recordings', recordingsRoutes)

// Error handling middleware
app.use(errorHandler)

// Export app for Lambda handler
export default app

// Start server only in local development
if (require.main === module) {
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

