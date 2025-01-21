#!/bin/bash

SERVER_URL="${1:-http://localhost:8080}"

WIDDERSHINS_OPTIONS="-l false --expandBody true --language_tabs 'http' --language_tabs 'shell' --language_tabs 'javascript' --language_tabs 'python'"
DOCUMENTATION_PATH="../docs/server"

echo ""
echo "[TransformoDocs] Generating Authentication API documentation..."
echo ""
widdershins $SERVER_URL/api-docs/auth -o $DOCUMENTATION_PATH/AuthenticationAPI.md $WIDDERSHINS_OPTIONS

echo ""
echo "[TransformoDocs] Generating Public API documentation..."
echo ""
widdershins $SERVER_URL/api-docs/public -o $DOCUMENTATION_PATH/PublicAPI.md $WIDDERSHINS_OPTIONS

echo ""
echo "[TransformoDocs] Generating Private API documentation..."
echo ""
widdershins $SERVER_URL/api-docs/private -o $DOCUMENTATION_PATH/PrivateAPI.md $WIDDERSHINS_OPTIONS

echo ""
echo "[TransformoDocs] Done!"
