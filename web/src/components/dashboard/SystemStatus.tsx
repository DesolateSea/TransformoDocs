import { Card, CardContent, CardHeader, CardTitle } from "../Ui/card";

export const SystemStatus = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>API Health Monitor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>OCR Service</span>
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
          </div>
          <div className="flex items-center justify-between">
            <span>AI Models</span>
            <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
