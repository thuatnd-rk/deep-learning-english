# Deep Learning English

English learning platform implementing **Deep Listening Loop** methodology for effective listening practice.

## Overview

Deep Learning English is a web application designed to help users master English listening skills through a structured 5-step methodology. The platform focuses on deep, repetitive listening practice rather than passive consumption.

## Features

The application follows the **Deep Listening Loop** methodology with five sequential steps:

### 1. Blind Listening
- Listen to audio content without viewing transcripts
- Complete comprehension quizzes to test understanding
- Focus on grasping main ideas and context

### 2. Vocabulary Mining
- View full transcripts with vocabulary highlighting
- Save and organize new words and phrases
- Access definitions, pronunciations, and usage examples
- Build personal vocabulary lists

### 3. Shadowing
- Listen to audio while following along with transcripts
- Practice pronunciation by repeating after the audio
- Record and compare your pronunciation
- Improve intonation and rhythm

### 4. Dictation
- Listen to audio segments and type what you hear
- Practice spelling and listening accuracy
- Receive immediate feedback on accuracy
- Track improvement over time

### 5. Retelling
- Summarize or retell the content in your own words
- Record your retelling (1-2 minutes)
- Practice organizing thoughts and expressing ideas
- Review and self-assess your performance

## Architecture

The application is built on AWS cloud infrastructure with a fully serverless approach:

```
┌─────────────────────────────────────────┐
│  Frontend: S3 + CloudFront              │
│  (Next.js Static Site)                  │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│  API Gateway (HTTP API)                 │
│  (Request routing, authentication)     │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│  Backend: AWS Lambda                    │
│  (Serverless Functions)                 │
│  (Express.js API wrapped in Lambda)     │
└─────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
┌──────────────┐        ┌──────────────┐
│  DynamoDB    │        │  S3 + CF     │
│  (On-Demand) │        │  (Audio,     │
│              │        │   Recordings)│
└──────────────┘        └──────────────┘
```

### Components

- **Frontend**: Next.js static site hosted on S3 and distributed via CloudFront CDN
- **API Gateway**: HTTP API for request routing, rate limiting, and authentication
- **Backend**: AWS Lambda functions running Express.js API (Node.js/TypeScript)
- **Database**: DynamoDB On-Demand for flexible, pay-per-use data storage
- **Storage**: S3 buckets with CloudFront for audio files and user recordings

## Tech Stack

### Frontend
- Next.js (Static Export)
- React
- Tailwind CSS
- Web Audio API

### Backend
- Node.js / TypeScript
- Express.js
- AWS SDK

### Infrastructure
- AWS S3 (Static hosting, file storage)
- AWS CloudFront (CDN)
- AWS API Gateway (HTTP API)
- AWS Lambda (Serverless compute)
- AWS DynamoDB (NoSQL database)
- Terraform (Infrastructure as Code)

## Project Structure

```
deep-learning-english/
├── frontend/          # Next.js application
│   ├── app/          # App router pages
│   ├── components/   # React components
│   ├── lib/          # Utilities and API client
│   └── package.json
├── backend/          # API service (Lambda)
│   ├── src/
│   │   ├── routes/   # API routes
│   │   ├── controllers/ # Request handlers
│   │   ├── config/   # AWS config
│   │   ├── index.ts  # Express app setup
│   │   └── lambda.ts # Lambda handler wrapper
│   └── package.json
├── terraform/        # Infrastructure code
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 22.x (LTS recommended) or Node.js 20.x
- AWS CLI configured
- Terraform 1.0+

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
npm install
cp env.example .env
# Edit .env with your AWS credentials (for local development)
npm run dev
```

**Note**: For Lambda deployment, environment variables are configured in Terraform, not via `.env` files.

### Infrastructure Setup

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

## Development

### Frontend Development

```bash
cd frontend
npm run dev
# Open http://localhost:3000
```

### Backend Development

```bash
cd backend
npm run dev
# API available at http://localhost:3001
# Note: Local development uses Express server
# Lambda deployment wraps Express app in Lambda handler
```

## License

_To be determined._
