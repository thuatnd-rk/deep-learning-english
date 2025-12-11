import { Request, Response } from 'express'
import { dynamoDB, TABLES } from '../config/dynamodb'
import { QueryCommand, PutCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb'

export const getUserVocabulary = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const result = await dynamoDB.send(
      new QueryCommand({
        TableName: TABLES.VOCABULARY,
        KeyConditionExpression: 'PK = :pk',
        ExpressionAttributeValues: {
          ':pk': `USER#${userId}`,
        },
      })
    )

    res.json(result.Items || [])
  } catch (error) {
    console.error('Error fetching vocabulary:', error)
    res.status(500).json({ error: 'Failed to fetch vocabulary' })
  }
}

export const saveVocabulary = async (req: Request, res: Response) => {
  try {
    const { userId, lessonId, word, definition, pronunciationUrl } = req.body

    if (!userId || !word) {
      return res.status(400).json({ error: 'userId and word are required' })
    }

    const item = {
      PK: `USER#${userId}`,
      SK: `VOCAB#${lessonId || 'GENERAL'}#${word}`,
      userId,
      lessonId: lessonId || null,
      word,
      definition,
      pronunciationUrl,
      highlightedAt: new Date().toISOString(),
    }

    await dynamoDB.send(
      new PutCommand({
        TableName: TABLES.VOCABULARY,
        Item: item,
      })
    )

    res.json(item)
  } catch (error) {
    console.error('Error saving vocabulary:', error)
    res.status(500).json({ error: 'Failed to save vocabulary' })
  }
}

export const deleteVocabulary = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const userId = req.query.userId as string

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' })
    }

    // Extract SK from id (format: VOCAB#lessonId#word)
    await dynamoDB.send(
      new DeleteCommand({
        TableName: TABLES.VOCABULARY,
        Key: {
          PK: `USER#${userId}`,
          SK: id,
        },
      })
    )

    res.json({ message: 'Vocabulary item deleted' })
  } catch (error) {
    console.error('Error deleting vocabulary:', error)
    res.status(500).json({ error: 'Failed to delete vocabulary' })
  }
}

