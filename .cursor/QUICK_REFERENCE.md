# Quick Reference Guide

## ⏰ Time Context
**IMPORTANT**: Always use the CURRENT DATE and LATEST documentation when referencing versions, dates, or best practices. Do not hardcode dates - use the actual current date.

## Project Quick Facts

**Project Name**: Deep Learning English  
**Type**: Full-stack web application  
**Purpose**: English learning platform using Deep Listening Loop methodology

## Tech Stack Summary

| Component | Technology |
|-----------|-----------|
| Frontend | Next.js 14, React 18, TypeScript, Tailwind CSS |
| Backend | AWS Lambda, Node.js, Express.js, TypeScript |
| Database | AWS DynamoDB |
| Storage | AWS S3 |
| Infrastructure | Terraform, AWS (Lambda, CloudFront, API Gateway) |

## Key Directories

```
deep-learning-english/
├── frontend/          # Next.js app (port 3000)
├── backend/           # Express API (port 3001)
└── terraform/         # AWS infrastructure
```

## Common Commands

### Frontend
```bash
cd frontend
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:3000)
npm run build        # Build for production
```

### Backend
```bash
cd backend
npm install          # Install dependencies
cp env.example .env  # Setup environment
npm run dev          # Start dev server (localhost:3001)
npm run build        # Build TypeScript
```

### Infrastructure
```bash
cd terraform
terraform init       # Initialize Terraform
terraform plan       # Preview changes
terraform apply      # Apply changes
```

## API Endpoints

Base URL: `http://localhost:3001/api`

- `GET /lessons` - Get all lessons
- `GET /lessons/:id` - Get lesson by ID
- `GET /lessons/:id/transcript` - Get transcript
- `GET /progress/user/:userId` - Get user progress
- `POST /progress` - Save progress
- `GET /vocabulary/user/:userId` - Get user vocabulary
- `POST /vocabulary` - Save vocabulary
- `GET /recordings/user/:userId` - Get recordings
- `POST /recordings` - Upload recording

## Environment Variables

### Backend (.env)
```
PORT=3001
AWS_REGION=ap-southeast-1
DYNAMODB_LESSONS_TABLE=lessons
DYNAMODB_PROGRESS_TABLE=user-progress
DYNAMODB_VOCABULARY_TABLE=vocabulary
DYNAMODB_RECORDINGS_TABLE=recordings
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## DynamoDB Table Structure

### Lessons Table
- PK: `LESSON#${id}`
- SK: `METADATA` or `TRANSCRIPT`

### Progress Table
- PK: `USER#${userId}`
- SK: `LESSON#${lessonId}`

### Vocabulary Table
- PK: `USER#${userId}`
- SK: `VOCAB#${vocabId}`

### Recordings Table
- PK: `USER#${userId}`
- SK: `RECORDING#${recordingId}`

## Code Patterns

### Express Route Handler
```typescript
export const handler = async (req: Request, res: Response) => {
  try {
    // Logic here
    res.json(result)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Failed' })
  }
}
```

### DynamoDB Get Item
```typescript
const result = await dynamoDB.get({
  TableName: TABLES.LESSONS,
  Key: { PK: `LESSON#${id}`, SK: 'METADATA' }
})
```

### Next.js Component
```typescript
export default function Component() {
  return <div className="tailwind-classes">Content</div>
}
```

## File Naming Conventions

- Routes: `kebab-case.ts` (e.g., `lessons.ts`)
- Controllers: `kebab-case.ts` (e.g., `lessons.ts`)
- Components: `PascalCase.tsx` (e.g., `AudioPlayer.tsx`)
- Config: `kebab-case.ts` (e.g., `dynamodb.ts`)

## When Adding New Features

1. **Backend**: Route → Controller → AWS Service
2. **Frontend**: Component → API Client → Backend
3. **Database**: Update Terraform if new tables needed
4. **Documentation**: Update relevant README files

## Useful Resources

**CRITICAL**: Always reference the LATEST/CURRENT documentation available at the time of use:

- [Next.js Docs](https://nextjs.org/docs) - Always check for latest Next.js patterns (currently Next.js 14+)
- [Express.js Docs](https://expressjs.com/) - Always check for latest Express.js best practices
- [AWS SDK v3 Docs](https://docs.aws.amazon.com/sdk-for-javascript/v3/) - Always check for latest AWS SDK v3 patterns
- [DynamoDB Best Practices](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html) - Current DynamoDB recommendations
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs) - Always check for latest Terraform AWS provider
- [React Docs](https://react.dev/) - Always check for latest React patterns and hooks (currently React 18+)
- [TypeScript Docs](https://www.typescriptlang.org/docs/) - Always check for latest TypeScript features (currently TypeScript 5.x+)

**Note**: Version numbers mentioned above are current as of the file creation. Always verify and use the latest versions available at the time of use.

