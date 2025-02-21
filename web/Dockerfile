# Stage 1: Build
FROM node:lts-alpine AS builder

ARG NODE_ENV="production"

# Set the working directory
WORKDIR /app

# Copy the rest of the application code
COPY . .

# Clean old cache files
RUN rm -rf ./dist ./node_modules

# Build the application
RUN npm ci && \
    npm run build

# Stage 2: Production
FROM node:lts-alpine

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package.json /app/package-lock.json /app/
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public

# Install production-only dependencies (all in development)
RUN if [ "$NODE_ENV" == "development" ]; then npm ci; else npm ci --omit=dev; fi

# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the application
CMD [ "npm", "run", "start" ]
