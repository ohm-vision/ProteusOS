# Stage 1: Build
FROM node:lts-alpine AS builder

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

ARG NODE_ENV="production"
ARG TERRAFORM_VERSION="1.10.5"

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package.json /app/package-lock.json /app/
COPY --from=builder /app/dist /app/dist

# Install production-only dependencies (all in development)
RUN if [ "$NODE_ENV" == "development" ]; then npm ci; else npm ci --omit=dev; fi

# Install common deps
RUN apk update && \
    apk add --no-cache gnupg curl openssh

# Install Terraform
RUN apk add --update --virtual .deps --no-cache gnupg curl unzip && \
    cd /tmp && \
    wget https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_linux_amd64.zip && \
    wget https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_SHA256SUMS && \
    wget https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_SHA256SUMS.sig && \
    wget -qO- https://www.hashicorp.com/.well-known/pgp-key.txt | gpg --import && \
    gpg --verify terraform_${TERRAFORM_VERSION}_SHA256SUMS.sig terraform_${TERRAFORM_VERSION}_SHA256SUMS && \
    grep "terraform_${TERRAFORM_VERSION}_linux_amd64.zip" terraform_${TERRAFORM_VERSION}_SHA256SUMS | sha256sum -c - && \
    unzip terraform_${TERRAFORM_VERSION}_linux_amd64.zip -d /usr/local/bin && \
    chmod +x /usr/local/bin/terraform && \
    rm -f terraform_${TERRAFORM_VERSION}_linux_amd64.zip terraform_${TERRAFORM_VERSION}_SHA256SUMS terraform_${TERRAFORM_VERSION}_SHA256SUMS.sig && \
    apk del .deps

RUN mkdir -p /modules/backends
RUN terraform --version && \
    cat <<EOF > /modules/terraform.tf 
terraform {
}
EOF

# Configure NPM
RUN cat <<EOF > /modules/package.json
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
CMD [ "npm", "run", "start:prod" ]
