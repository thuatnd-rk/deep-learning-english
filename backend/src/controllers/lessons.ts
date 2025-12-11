import { Request, Response } from 'express'
import { dynamoDB, TABLES } from '../config/dynamodb'

export const getLessons = async (req: Request, res: Response) => {
  try {
    const result = await dynamoDB.scan({
      TableName: TABLES.LESSONS,
    })

    res.json(result.Items || [])
  } catch (error) {
    console.error('Error fetching lessons:', error)
    res.status(500).json({ error: 'Failed to fetch lessons' })
  }
}

export const getLesson = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const result = await dynamoDB.get({
      TableName: TABLES.LESSONS,
      Key: {
        PK: `LESSON#${id}`,
        SK: 'METADATA',
      },
    })

    if (!result.Item) {
      return res.status(404).json({ error: 'Lesson not found' })
    }

    res.json(result.Item)
  } catch (error) {
    console.error('Error fetching lesson:', error)
    res.status(500).json({ error: 'Failed to fetch lesson' })
  }
}

export const getTranscript = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const result = await dynamoDB.get({
      TableName: TABLES.LESSONS,
      Key: {
        PK: `LESSON#${id}`,
        SK: 'TRANSCRIPT',
      },
    })

    if (!result.Item) {
      return res.status(404).json({ error: 'Transcript not found' })
    }

    res.json(result.Item)
  } catch (error) {
    console.error('Error fetching transcript:', error)
    res.status(500).json({ error: 'Failed to fetch transcript' })
  }
}

