# Stage 1: Build
FROM node:lts AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
ARG NODE_ENV=production
RUN if [ "$NODE_ENV" = "development" ]; then npm install; else npm install --production; fi

# Copy the rest of the application code
COPY . .

# Build the application
RUN if [ "$NODE_ENV" != "development" ]; then npm run build; fi

# Stage 2: Production
FROM node:lts-jod

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package.json /app/package-lock.json /app/
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules

# Expose port 3000 (or any port your agent listens on)
EXPOSE 3000

# Start the application
CMD if [ "$NODE_ENV" = "development" ]; then npm run start:dev; else npm run start:prod; fi
