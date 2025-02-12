import { Card, CardContent, CardHeader, CardTitle } from "../Ui/card";

export const ActivityFeed = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center space-x-4 rounded-lg border p-4"
            >
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Document {i} processed
                </p>
                <p className="text-sm text-muted-foreground">2 minutes ago</p>
              </div>
              <div className="text-sm text-muted-foreground">PDF → DOCX</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
