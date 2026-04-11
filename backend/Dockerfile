# Backend Dockerfile
FROM node:18-alpine

WORKDIR /app/backend

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY src ./src

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "src/index.js"]
