import { Card, CardContent, CardHeader, CardTitle } from "../Ui/card";
import { Button } from "../Ui/button";

export function DocsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>API Documentation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="rounded-md bg-muted p-4">
            <pre className="text-sm">
              <code>
                {`# Python Example
from transformodocs import Client

client = Client(api_key="your-api-key")
result = client.convert(
    file="document.pdf",
    format="docx",
    options={
        "quality": "high",
        "ocr": True
    }
)`}
              </code>
            </pre>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Quick Start Guide</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Authentication</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Learn how to authenticate your API requests using API keys
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">File Conversion</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Explore our file conversion API endpoints and options
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            View Full Documentation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
