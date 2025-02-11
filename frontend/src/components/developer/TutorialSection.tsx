
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GripVertical, Eye } from "lucide-react";

export function TutorialSection() {
  return (
    <Card className="dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="dark:text-white">Interactive Tutorial</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-muted rounded-lg p-6 border-2 border-dashed border-primary/50 flex items-center justify-center min-h-[200px]">
            <div className="text-center space-y-2">
              <GripVertical className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground">Drag and drop files here to test the API</p>
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base dark:text-white">Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                  <Eye className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base dark:text-white">Results</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
                  <code>{JSON.stringify({ status: "waiting for file" }, null, 2)}</code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
