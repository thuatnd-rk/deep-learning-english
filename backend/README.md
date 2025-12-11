# Backend - Deep Learning English

Express.js API service for Deep Learning English platform.

## Tech Stack

- Node.js 18+
- TypeScript
- Express.js
- AWS SDK (DynamoDB, S3)

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment file
cp env.example .env
# Edit .env with your AWS credentials

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
backend/
├── src/
│   ├── config/       # AWS configuration
│   │   ├── dynamodb.ts
│   │   └── s3.ts
│   ├── controllers/  # Request handlers
│   │   ├── lessons.ts
│   │   ├── progress.ts
│   │   ├── vocabulary.ts
│   │   └── recordings.ts
│   ├── routes/       # API routes
│   │   ├── lessons.ts
│   │   ├── progress.ts
│   │   ├── vocabulary.ts
│   │   └── recordings.ts
│   ├── middleware/   # Express middleware
│   │   ├── logger.ts
│   │   └── errorHandler.ts
│   └── index.ts      # Entry point
├── Dockerfile
└── package.json
```

## API Endpoints

### Lessons
- `GET /api/lessons` - Get all lessons
- `GET /api/lessons/:id` - Get lesson by ID
- `GET /api/lessons/:id/transcript` - Get transcript

### Progress
- `GET /api/progress/user/:userId` - Get user progress
- `GET /api/progress/lesson/:lessonId` - Get lesson progress
- `POST /api/progress` - Save progress

### Vocabulary
- `GET /api/vocabulary/user/:userId` - Get user vocabulary
- `POST /api/vocabulary` - Save vocabulary item
- `DELETE /api/vocabulary/:id` - Delete vocabulary item

### Recordings
- `GET /api/recordings/user/:userId` - Get user recordings
- `POST /api/recordings` - Upload recording
- `DELETE /api/recordings/:id` - Delete recording

## Environment Variables

See `env.example` for required environment variables.

## Docker

```bash
# Build image
docker build -t deep-learning-english-backend .

# Run container
docker run -p 3001:3001 --env-file .env deep-learning-english-backend
```

## Deployment

The backend is designed to run on ECS Fargate. See Terraform configuration for deployment setup.

