import { Card, CardContent, CardHeader, CardTitle } from "../Ui/card";
import { Progress } from "../Ui/progress";

export const StorageStatus = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Storage Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress value={75} />
          <p className="text-sm text-muted-foreground">75GB of 100GB used</p>
        </div>
      </CardContent>
    </Card>
  );
};
