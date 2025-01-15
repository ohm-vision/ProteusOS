FROM node:lts

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
# ARG NODE_ENV=production
# RUN if [ "$NODE_ENV" == "development" ]; then npm install; else npm install --production; fi
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the application
CMD npm run dev
