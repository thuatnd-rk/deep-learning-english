import express from 'express'
import { getUserProgress, getLessonProgress, saveProgress } from '../controllers/progress'

const router = express.Router()

// GET /api/progress/user/:userId - Get all progress for user
router.get('/user/:userId', getUserProgress)

// GET /api/progress/lesson/:lessonId - Get progress for specific lesson
router.get('/lesson/:lessonId', getLessonProgress)

// POST /api/progress - Save progress
router.post('/', saveProgress)

// PUT /api/progress/:id - Update progress
router.put('/:id', saveProgress)

export default router

