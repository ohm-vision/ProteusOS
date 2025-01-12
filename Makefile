# Variables
ENV_FILE ?= .env # Can be either dev, prod or debug
NODE_MODULES = node_modules

# Rules
.PHONY: dev hi install install-web install-agent build start start-docker

hi: install-dev dev

all: install-local build start

dev: install-local build start-dev


# Initializes the repository
install: install-local install-agent install-web

install-local:
	@if [ ! -f $(ENV_FILE) ]; then \
		cp .env.example $(ENV_FILE); \
	fi

install-dev:
	npm install -g @nestjs/cli

install-web:
	@echo "Installing dependencies for web..."
	cd web && npm install

install-agent:
	@echo "Installing dependencies for agent..."
	cd agent && npm install

clean: clean-env clean-agent clean-web

clean-env:
	docker compose down

clean-web:
	rm -rf web/$(NODE_MODULES)

clean-agent:
	rm -rf agent/$(NODE_MODULES)


build:
	docker compose build --build-arg ENV_FILE=$(ENV_FILE)

start:
	docker compose --env-file $(ENV_FILE) up -d

start-dev:
	docker compose --env-file $(ENV_FILE) up

stop:
	docker compose down
