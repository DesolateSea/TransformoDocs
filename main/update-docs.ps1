# PowerShell Script to generate documentation for TransformoDocs

param(
    [string]$SERVER_URL = "http://localhost:8080"
)

$widdershinsOptions = "-l false --expandBody true --language_tabs 'http' --language_tabs 'shell' --language_tabs 'javascript' --language_tabs 'python'"
$documentationPath = "../docs/server"

echo ""
echo "[TransformoDocs] Generating Authentication API documentation..."
echo ""
widdershins $SERVER_URL/api-docs/auth -o $documentationPath/AuthenticationAPI.md $widdershinsOptions

echo ""
echo "[TransformoDocs] Generating Public API documentation..."
echo ""
widdershins $SERVER_URL/api-docs/public -o $documentationPath/PublicAPI.md $widdershinsOptions

echo ""
echo "[TransformoDocs] Generating Private API documentation..."
echo ""
widdershins $SERVER_URL/api-docs/private -o $documentationPath/PrivateAPI.md $widdershinsOptions

echo ""
echo "[TransformoDocs] Done!"
