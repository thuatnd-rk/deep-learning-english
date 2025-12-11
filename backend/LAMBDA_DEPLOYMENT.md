# Lambda Deployment Guide

## Overview

The backend is deployed as AWS Lambda functions. The Express.js application is wrapped in a Lambda handler using `@vendia/serverless-express`.

## Architecture

```
API Gateway (HTTP API)
    ↓
Lambda Function (handler: lambda.handler)
    ↓
Express App (wrapped by serverless-express)
    ↓
Routes → Controllers → AWS Services (DynamoDB, S3)
```

## Key Files

- `src/index.ts` - Express app setup (exports app, doesn't start server)
- `src/lambda.ts` - Lambda handler wrapper
- `package.json` - Includes `@vendia/serverless-express` dependency

## Building for Lambda

```bash
cd backend
npm install
npm run build
# Output in dist/ directory
```

## Lambda Configuration

### Handler
- Handler: `lambda.handler` (points to `dist/lambda.js` export)
- Runtime: Node.js 22.x (LTS recommended) or Node.js 20.x
- Architecture: x86_64 or arm64

### Environment Variables
Configure in Terraform (`terraform/main.tf`):
- `AWS_REGION`
- `DYNAMODB_LESSONS_TABLE`
- `DYNAMODB_PROGRESS_TABLE`
- `DYNAMODB_VOCABULARY_TABLE`
- `DYNAMODB_RECORDINGS_TABLE`

### Lambda Settings
- **Timeout**: 30 seconds (adjust based on your needs)
- **Memory**: 256 MB minimum (increase if needed for heavy operations)
- **Concurrency**: Configure based on expected load

## Deployment

Deployment is handled via Terraform. The Lambda function code is packaged and deployed automatically.

### Package Structure for Lambda

```
dist/
├── index.js          # Express app
├── lambda.js         # Lambda handler
├── routes/
├── controllers/
├── config/
└── middleware/
```

## Local Development vs Lambda

### Local Development
- Run `npm run dev` - starts Express server on port 3001
- Uses `.env` file for environment variables
- Full Express server with `app.listen()`

### Lambda Deployment
- Express app exported (no `app.listen()`)
- Environment variables from Lambda configuration
- Wrapped by `@vendia/serverless-express` in `lambda.ts`

## Testing Lambda Locally

You can test Lambda functions locally using:
- AWS SAM CLI
- Serverless Framework
- AWS Lambda Runtime Interface Emulator

## Cold Start Optimization

To minimize cold start times:
- Keep dependencies minimal
- Use Lambda Layers for common dependencies if needed
- Consider Provisioned Concurrency for critical functions
- Optimize bundle size

## Monitoring

- CloudWatch Logs: Automatic logging for Lambda functions
- CloudWatch Metrics: Monitor invocations, errors, duration
- X-Ray: Enable for distributed tracing (optional)

## Troubleshooting

### Common Issues

1. **Timeout Errors**: Increase Lambda timeout in Terraform
2. **Memory Errors**: Increase Lambda memory allocation
3. **Cold Starts**: Consider Provisioned Concurrency
4. **Environment Variables**: Ensure configured in Terraform

### Debugging

- Check CloudWatch Logs for errors
- Use `console.log` statements (appear in CloudWatch Logs)
- Test locally first before deploying to Lambda

