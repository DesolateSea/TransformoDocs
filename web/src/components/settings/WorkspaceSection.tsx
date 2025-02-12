import { Button } from "../Ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../Ui/card";
import { Input } from "../Ui/input";
import { Palette, Upload, Gauge } from "lucide-react";

export function WorkspaceSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Brand Customization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Logo Upload</h4>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="w-full sm:w-auto">
                <Upload className="h-4 w-4 mr-2" />
                Upload Logo
              </Button>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Domain Settings</h4>
            <Input placeholder="your-domain.com" className="max-w-md" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="h-5 w-5" />
            API Limits
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium">Rate Limits</h4>
            <p className="text-sm text-muted-foreground">
              Configure API rate limits
            </p>
            <Input
              type="number"
              placeholder="Requests per minute"
              className="mt-2 max-w-md"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
