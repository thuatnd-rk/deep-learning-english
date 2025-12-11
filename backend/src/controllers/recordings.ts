import { Request, Response } from 'express'
import { dynamoDB, TABLES } from '../config/dynamodb'
import { s3Client, BUCKETS } from '../config/s3'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { QueryCommand, PutCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb'

export const getUserRecordings = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const result = await dynamoDB.send(
      new QueryCommand({
        TableName: TABLES.RECORDINGS,
        KeyConditionExpression: 'PK = :pk',
        ExpressionAttributeValues: {
          ':pk': `USER#${userId}`,
        },
      })
    )

    res.json(result.Items || [])
  } catch (error) {
    console.error('Error fetching recordings:', error)
    res.status(500).json({ error: 'Failed to fetch recordings' })
  }
}

type MulterRequest = Request & { file?: Express.Multer.File }

export const uploadRecording = async (req: MulterRequest, res: Response) => {
  try {
    const { userId, lessonId, type } = req.body
    const audioFile = req.file

    if (!userId || !lessonId || !type || !audioFile) {
      return res.status(400).json({ 
        error: 'userId, lessonId, type, and audio file are required' 
      })
    }

    const fileName = `${userId}/${lessonId}/${Date.now()}.weba`

    // Upload to S3
    await s3Client.send(new PutObjectCommand({
      Bucket: BUCKETS.RECORDINGS,
      Key: fileName,
      Body: audioFile.buffer,
      ContentType: 'audio/webm',
    }))

    const audioUrl = `https://${process.env.CLOUDFRONT_DOMAIN}/recordings/${fileName}`

    // Save metadata to DynamoDB
    const item = {
      PK: `USER#${userId}`,
      SK: `RECORDING#${lessonId}#${Date.now()}`,
      userId,
      lessonId,
      type, // 'shadowing' or 'retelling'
      audioUrl,
      duration: req.body.duration || 0,
      createdAt: new Date().toISOString(),
    }

    await dynamoDB.send(
      new PutCommand({
        TableName: TABLES.RECORDINGS,
        Item: item,
      })
    )

    res.json(item)
  } catch (error) {
    console.error('Error uploading recording:', error)
    res.status(500).json({ error: 'Failed to upload recording' })
  }
}

export const deleteRecording = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const userId = req.query.userId as string

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' })
    }

    await dynamoDB.send(
      new DeleteCommand({
        TableName: TABLES.RECORDINGS,
        Key: {
          PK: `USER#${userId}`,
          SK: id,
        },
      })
    )

    res.json({ message: 'Recording deleted' })
  } catch (error) {
    console.error('Error deleting recording:', error)
    res.status(500).json({ error: 'Failed to delete recording' })
  }
}

