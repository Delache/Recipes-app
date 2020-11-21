#!make .PHONY: all

export GPG_TTY := tty # GPG fix on Macos
export SHELL := /bin/bash

ifeq ($(SERVER),)
	SERVER := $(CI_COMMIT_BRANCH)
endif

# VERSION := $(shell grep '"version":' package.json -m1 | cut -d\" -f4)
VERSION := $(shell cat version.txt)
# NODE_VERSION := $(shell grep '"node":' package.json -m1 | cut -d\" -f4)
export FRONT_NODE_VERSION := $(shell grep '"node":' ./front/package.json -m1 | cut -d\" -f4)
BUILD := "poc"
ENV := $(shell git describe --contains --all HEAD)

# export VERSION
# export NODE_VERSION
# export BUILD
# export ENV

# # HELP
# # thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
# # And: https://gist.github.com/jed-frey/fcfb3adbf2e5ff70eae44b04d30640ad
help: ## This help. 💡
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@echo -e "\n\e[94mversion: $(VERSION)\nbuild: $(BUILD)\nfront node version: $(FRONT_NODE_VERSION)\nenv: $(ENV)"
	@echo -e "\n\e[1m\e[34mRunning containers 🚚:\e[0m\n----------------------"
	@docker-compose ps

.DEFAULT_GOAL := help
init: ## 👷 Download submodules, packages dependencies
	@echo "+ $@"
	@git submodule init
	@git submodule update
	@npm install

build: ## 🐳 Build docker image
	@echo "+ $@"
	npm run build

up: ## Start with npm in localhost with localhost api
	@echo "+ $@"
	@npm run local

