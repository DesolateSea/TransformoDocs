import { Card, CardContent, CardHeader, CardTitle } from "../Ui/card";
import { Button } from "../Ui/button";
import { Select } from "../Ui/select";
import { Upload, Download, Cloud, Code } from "lucide-react";
import { Progress } from "../Ui/progress";

export const ConversionCanvas = () => {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Document Transformation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-2">
              <Button>Upload File</Button>
              <p className="mt-1 text-sm text-gray-500">
                or drag and drop your files here
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Input Format
              </label>
              <Select>
                <option>PDF</option>
                <option>DOCX</option>
                <option>Image</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Output Format
              </label>
              <Select>
                <option>PDF</option>
                <option>DOCX</option>
                <option>Text</option>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Processing...</span>
              <span>60%</span>
            </div>
            <Progress value={60} />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Cloud className="h-4 w-4" />
              Save to Cloud
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              API Callback
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
