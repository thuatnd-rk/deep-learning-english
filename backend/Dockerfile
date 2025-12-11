# Dockerfile for local development and testing
# Note: Production deployment uses AWS Lambda, not Docker containers
# This Dockerfile is useful for local development, CI/CD, or testing

FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 3001

# Start application
CMD ["npm", "start"]

