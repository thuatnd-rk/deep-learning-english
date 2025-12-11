import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'ap-southeast-1',
})

export const dynamoDB = DynamoDBDocumentClient.from(client)

export const TABLES = {
  LESSONS: process.env.DYNAMODB_LESSONS_TABLE || 'lessons',
  PROGRESS: process.env.DYNAMODB_PROGRESS_TABLE || 'user-progress',
  VOCABULARY: process.env.DYNAMODB_VOCABULARY_TABLE || 'vocabulary',
  RECORDINGS: process.env.DYNAMODB_RECORDINGS_TABLE || 'recordings',
} as const

