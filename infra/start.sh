#!/bin/bash
# Start OpenFGA and Postgres using Docker Compose

docker compose -f infra/docker-compose.yml up -d
