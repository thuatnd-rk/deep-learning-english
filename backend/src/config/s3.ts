import { S3Client } from '@aws-sdk/client-s3'

export const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'ap-southeast-1',
})

export const BUCKETS = {
  AUDIO: process.env.S3_AUDIO_BUCKET || 'deep-learning-english-audio',
  RECORDINGS: process.env.S3_RECORDINGS_BUCKET || 'deep-learning-english-recordings',
} as const

