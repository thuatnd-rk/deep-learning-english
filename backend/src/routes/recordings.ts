import express from 'express'
import {
  getUserRecordings,
  uploadRecording,
  deleteRecording,
} from '../controllers/recordings'

const router = express.Router()

// GET /api/recordings/user/:userId - Get user recordings
router.get('/user/:userId', getUserRecordings)

// POST /api/recordings - Upload recording
router.post('/', uploadRecording)

// DELETE /api/recordings/:id - Delete recording
router.delete('/:id', deleteRecording)

export default router