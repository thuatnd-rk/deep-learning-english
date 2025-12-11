import express from 'express'
import { getUserVocabulary, saveVocabulary, deleteVocabulary } from '../controllers/vocabulary'

const router = express.Router()

// GET /api/vocabulary/user/:userId - Get user vocabulary
router.get('/user/:userId', getUserVocabulary)

// POST /api/vocabulary - Save vocabulary item
router.post('/', saveVocabulary)

// DELETE /api/vocabulary/:id - Delete vocabulary item
router.delete('/:id', deleteVocabulary)

export default router

