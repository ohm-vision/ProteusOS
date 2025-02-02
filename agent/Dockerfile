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

# Install common deps
RUN apt-get update && apt-get install -y gnupg software-properties-common curl

# HashiCorp
RUN curl -fsSL https://apt.releases.hashicorp.com/gpg | gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
RUN echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | tee /etc/apt/sources.list.d/hashicorp.list

# Update package lists
RUN apt-get update

# Install Terraform
RUN apt-get install -y terraform
RUN mkdir /modules/backend
RUN cat <<EOF > /modules/terraform.tf 
terraform {
}
EOF

# Configure NPM
RUN cas <<EOF > /modules/package.json
{
    "name": "@proteus/modules",
    "version": "1.0.0",
    "description": "ProteusOS installed modules",
    "author": "Ohm Vision, Inc",
    "keywords": [
        "proteus",
        "modules"
    ],
    "dependencies": {
    }
}
EOF

# Add the SSH configuration
RUN mkdir /root/.ssh && chmod 700 /root/.ssh
RUN touch /root/.ssh/known_hosts && chmod 600 /root/.ssh/known_hosts

RUN cat <<EOF > /root/.ssh/config
Host *
  User git
  IdentityFile ~/.ssh/id_ed25519
  IdentitiesOnly yes
EOF
RUN chmod 600 /root/.ssh/config

# Expose port 3000 (or any port your agent listens on)
EXPOSE 3000

# Start the application
CMD if [ "$NODE_ENV" = "development" ]; then npm run start:dev; else npm run start:prod; fi
