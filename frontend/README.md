# Frontend - Deep Learning English

Next.js frontend application for Deep Learning English platform.

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
frontend/
├── app/              # Next.js App Router
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Home page
│   └── globals.css   # Global styles
├── components/        # React components
│   └── AudioPlayer.tsx
├── lib/              # Utilities
│   └── api.ts        # API client
└── package.json
```

## Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Development

The app runs on `http://localhost:3000` by default.

## Deployment

The app is configured for static export and can be deployed to S3 + CloudFront.

```bash
npm run build
# Output will be in the `out/` directory
```

