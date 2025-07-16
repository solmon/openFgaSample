#!/bin/bash
# Stop OpenFGA and Postgres containers

docker compose -f infra/docker-compose.yml down
