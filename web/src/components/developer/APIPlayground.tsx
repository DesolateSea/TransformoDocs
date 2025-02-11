
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, Play } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const apiExamples = [
  {
    name: "Convert Document",
    endpoint: "/api/v1/convert",
    method: "POST",
    body: {
      file: "document.pdf",
      targetFormat: "docx",
      options: {
        quality: "high",
        preserveLinks: true
      }
    }
  },
  {
    name: "Extract Text",
    endpoint: "/api/v1/extract",
    method: "POST",
    body: {
      file: "document.pdf",
      pages: "all",
      language: "en"
    }
  },
  {
    name: "Analyze Document",
    endpoint: "/api/v1/analyze",
    method: "POST",
    body: {
      file: "document.pdf",
      analysis: ["structure", "tables", "entities"]
    }
  }
];

export function APIPlayground() {
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const testRequest = () => {
    setIsLoading(true);
    setTimeout(() => {
      setResponse(JSON.stringify({
        success: true,
        data: {
          fileId: "doc_123",
          status: "completed",
          downloadUrl: "https://example.com/download"
        }
      }, null, 2));
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card className="dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="dark:text-white">API Playground</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Select defaultValue={apiExamples[0].name} onValueChange={(val) => {
            const example = apiExamples.find(ex => ex.name === val);
            if (example) {
              setResponse(JSON.stringify(example.body, null, 2));
            }
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Select API endpoint" />
            </SelectTrigger>
            <SelectContent>
              {apiExamples.map((ex) => (
                <SelectItem key={ex.name} value={ex.name}>
                  {ex.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="rounded-md bg-muted p-4 relative group">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => copyCode(response || '')}
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
            <pre className="text-sm overflow-x-auto dark:text-gray-300">
              <code>{response}</code>
            </pre>
          </div>

          <div className="flex gap-2">
            <Button onClick={testRequest} disabled={isLoading}>
              <Play className="mr-2 h-4 w-4" />
              {isLoading ? "Testing..." : "Test Request"}
            </Button>
            <Button variant="outline" onClick={() => setResponse(null)}>
              Clear
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
