# Backend - Deep Learning English

Express.js API service deployed as AWS Lambda functions for Deep Learning English platform.

## Tech Stack

- Node.js 22.x (Lambda runtime, LTS)
- TypeScript
- Express.js
- AWS SDK (DynamoDB, S3)
- AWS Lambda (Serverless deployment)
- API Gateway (HTTP API)

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
│   ├── index.ts      # Express app setup
│   └── lambda.ts     # Lambda handler wrapper
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

### Local Development
See `env.example` for required environment variables. Use `.env` file for local development.

### Lambda Deployment
Environment variables are configured in Terraform (`terraform/main.tf`). Lambda functions receive environment variables at runtime, not from `.env` files.

Required Lambda environment variables:
- `AWS_REGION`
- `DYNAMODB_LESSONS_TABLE`
- `DYNAMODB_PROGRESS_TABLE`
- `DYNAMODB_VOCABULARY_TABLE`
- `DYNAMODB_RECORDINGS_TABLE`

## Local Development

```bash
# Run Express server locally
npm run dev
# API available at http://localhost:3001
```

## Lambda Deployment

The backend is deployed as AWS Lambda functions. The Express app is wrapped in a Lambda handler using `@vendia/serverless-express` or similar library.

### Building for Lambda

```bash
npm run build
# Output will be in dist/ directory
```

### Lambda Handler

The Lambda handler (`src/lambda.ts`) wraps the Express app:

```typescript
import serverlessExpress from '@vendia/serverless-express'
import app from './index'

export const handler = serverlessExpress({ app })
```

### Deployment

Deployment is handled via Terraform. See `terraform/` directory for infrastructure configuration.

**Key Lambda Configuration**:
- Runtime: Node.js 22.x (LTS, recommended) or Node.js 20.x
- Handler: `lambda.handler` (points to `lambda.ts` export)
- Timeout: Configure appropriately (default 30s, adjust as needed)
- Memory: Configure based on workload (128MB minimum, increase if needed)
- Environment variables: Set in Terraform configuration

## Docker (Optional - for Local Development/Testing)

If you want to run the backend in a Docker container for local development or testing:

```bash
# Build image
docker build -t deep-learning-english-backend .

# Run container
docker run -p 3001:3001 --env-file .env deep-learning-english-backend
```

**Note**: Production deployment uses AWS Lambda, not Docker containers. The Dockerfile is provided for convenience in local development and testing scenarios.

