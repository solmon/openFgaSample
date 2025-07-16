#!/bin/bash
# Show logs for OpenFGA and Postgres containers

docker compose -f infra/docker-compose.yml logs -f
