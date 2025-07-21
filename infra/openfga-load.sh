#!/bin/bash
# Load OpenFGA model, tuples, and policies into a running OpenFGA server
# Prerequisites: OpenFGA server running on localhost:8080
# Usage: ./infra/openfga-load.sh

set -e

# 1. Create the store
echo "Creating OpenFGA store..."
STORE_ID=$(curl -s -X POST http://localhost:8080/stores \
  -H 'Content-Type: application/json' \
  -d '{"name": "ecomm-store", "description": "E-commerce authorization store for users, groups, and policies"}' \
  | grep -o '"id":"[^"]*"' | cut -d '"' -f4)
echo "Store ID: $STORE_ID"

# 2. Load the authorization model
echo "Loading authorization model..."
curl -s -X POST http://localhost:8080/stores/$STORE_ID/authorization-models \
  -H 'Content-Type: application/json' \
  -d @infra/openfga-model.json

echo "Model loaded."

# 3. Load tuples from openfga-seed.json
echo "Loading tuples..."
TUPLES=$(jq -c '.tuples' infra/openfga-seed.json)
cat > /tmp/openfga-tuples.json <<EOF
{"writes": {"tuple_keys": $TUPLES}}
EOF
curl -s -X POST http://localhost:8080/stores/$STORE_ID/write \
  -H 'Content-Type: application/json' \
  -d @/tmp/openfga-tuples.json

echo "Tuples loaded."

# 4. Load policies as tuples (policy assignments)
# Note: OpenFGA does not natively store policy objects, but we can store policy assignments as tuples.
# This step is for reference and can be extended for custom logic.
echo "Policies in seed file (for reference):"
jq '.policies' infra/openfga-seed.json

echo "Done."
