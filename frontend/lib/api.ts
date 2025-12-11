const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export interface Lesson {
  id: string
  title: string
  level: string
  audioUrl: string
  duration: number
  createdAt: string
}

export interface Transcript {
  id: string
  lessonId: string
  content: string
  timestamps: Array<{ text: string; start: number; end: number }>
}

export interface UserProgress {
  id: string
  userId: string
  lessonId: string
  blindListeningCompleted: boolean
  vocabularyMinedCount: number
  shadowingCompleted: boolean
  dictationScore: number
  retellingCompleted: boolean
  completedAt?: string
}

// Lessons API
export async function getLessons(): Promise<Lesson[]> {
  const response = await fetch(`${API_URL}/api/lessons`)
  if (!response.ok) {
    throw new Error('Failed to fetch lessons')
  }
  return response.json()
}

export async function getLesson(id: string): Promise<Lesson> {
  const response = await fetch(`${API_URL}/api/lessons/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch lesson')
  }
  return response.json()
}

// Transcripts API
export async function getTranscript(lessonId: string): Promise<Transcript> {
  const response = await fetch(`${API_URL}/api/lessons/${lessonId}/transcript`)
  if (!response.ok) {
    throw new Error('Failed to fetch transcript')
  }
  return response.json()
}

// Progress API
export async function getUserProgress(userId: string): Promise<UserProgress[]> {
  const response = await fetch(`${API_URL}/api/progress/user/${userId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch progress')
  }
  return response.json()
}

export async function saveProgress(progress: Partial<UserProgress>): Promise<UserProgress> {
  const response = await fetch(`${API_URL}/api/progress`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(progress),
  })
  if (!response.ok) {
    throw new Error('Failed to save progress')
  }
  return response.json()
}

