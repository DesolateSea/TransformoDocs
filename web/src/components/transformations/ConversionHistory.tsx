import { Card, CardContent, CardHeader, CardTitle } from "../Ui/card";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

const conversionHistory = [
  { id: 1, name: "Contract.pdf", status: "completed", time: "2 minutes ago" },
  { id: 2, name: "Invoice.docx", status: "processing", time: "5 minutes ago" },
  { id: 3, name: "Report.pdf", status: "failed", time: "10 minutes ago" },
];

export const ConversionHistory = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversion History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {conversionHistory.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between space-x-4 rounded-lg border p-4"
            >
              <div className="flex items-center gap-3">
                {item.status === "completed" && (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                )}
                {item.status === "processing" && (
                  <Clock className="h-5 w-5 text-yellow-500" />
                )}
                {item.status === "failed" && (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.time}</p>
                </div>
              </div>
              <span className="text-sm capitalize text-muted-foreground">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
