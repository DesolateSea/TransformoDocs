# PowerShell Script to generate documentation for TransformoDocs

param(
    [string]$SERVER_URL = "http://localhost:8080"
)

$documentationPath = "../docs/server"

echo ""
echo "[TransformoDocs] Generating Authentication API documentation..."
echo ""
widdershins $SERVER_URL/api-docs/auth -o $documentationPath/AuthenticationAPI.md --expandBody true

echo ""
echo "[TransformoDocs] Generating Public API documentation..."
echo ""
widdershins $SERVER_URL/api-docs/public -o $documentationPath/PublicAPI.md --expandBody true

echo ""
echo "[TransformoDocs] Generating Private API documentation..."
echo ""
widdershins $SERVER_URL/api-docs/private -o $documentationPath/PrivateAPI.md --expandBody true

echo ""
echo "[TransformoDocs] Done!"
