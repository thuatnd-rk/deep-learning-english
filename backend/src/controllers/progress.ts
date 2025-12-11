import { Request, Response } from 'express'
import { dynamoDB, TABLES } from '../config/dynamodb'
import { QueryCommand, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb'

export const getUserProgress = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const result = await dynamoDB.send(
      new QueryCommand({
        TableName: TABLES.PROGRESS,
        KeyConditionExpression: 'PK = :pk',
        ExpressionAttributeValues: {
          ':pk': `USER#${userId}`,
        },
      })
    )

    res.json(result.Items || [])
  } catch (error) {
    console.error('Error fetching user progress:', error)
    res.status(500).json({ error: 'Failed to fetch progress' })
  }
}

export const getLessonProgress = async (req: Request, res: Response) => {
  try {
    const { lessonId } = req.params
    const userId = req.query.userId as string

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' })
    }

    const result = await dynamoDB.send(
      new GetCommand({
        TableName: TABLES.PROGRESS,
        Key: {
          PK: `USER#${userId}`,
          SK: `PROGRESS#${lessonId}`,
        },
      })
    )

    if (!result.Item) {
      return res.status(404).json({ error: 'Progress not found' })
    }

    res.json(result.Item)
  } catch (error) {
    console.error('Error fetching lesson progress:', error)
    res.status(500).json({ error: 'Failed to fetch progress' })
  }
}

export const saveProgress = async (req: Request, res: Response) => {
  try {
    const { userId, lessonId, ...progressData } = req.body

    if (!userId || !lessonId) {
      return res.status(400).json({ error: 'userId and lessonId are required' })
    }

    const item = {
      PK: `USER#${userId}`,
      SK: `PROGRESS#${lessonId}`,
      userId,
      lessonId,
      ...progressData,
      updatedAt: new Date().toISOString(),
    }

    await dynamoDB.send(
      new PutCommand({
        TableName: TABLES.PROGRESS,
        Item: item,
      })
    )

    res.json(item)
  } catch (error) {
    console.error('Error saving progress:', error)
    res.status(500).json({ error: 'Failed to save progress' })
  }
}

