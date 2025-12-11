import express from 'express'
import { getLessons, getLesson, getTranscript } from '../controllers/lessons'

const router = express.Router()

// GET /api/lessons - Get all lessons
router.get('/', getLessons)

// GET /api/lessons/:id - Get lesson by ID
router.get('/:id', getLesson)

// GET /api/lessons/:id/transcript - Get transcript for lesson
router.get('/:id/transcript', getTranscript)

export default router

