
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../Ui/card";
import { Button } from "../Ui/button";
import { History, AlertTriangle } from "lucide-react";
import { ScrollArea } from "../Ui/scroll-area";
import { Badge } from "../Ui/badge";

export function WebhookSection() {
  const [webhookStatus, setWebhookStatus] = useState<'success' | 'error' | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Webhook Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Endpoint URL</h3>
              <p className="text-sm text-muted-foreground">https://api.example.com/webhook</p>
            </div>
            <Button variant="outline" onClick={() => setWebhookStatus('success')}>
              <History className="mr-2 h-4 w-4" />
              Test Webhook
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Recent Deliveries</h3>
            <ScrollArea className="h-[200px] rounded-md border">
              {Array.from({length: 5}).map((_, i) => (
                <div key={i} className="p-4 border-b last:border-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Webhook Delivery {1000 + i}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date().toLocaleString()}
                      </p>
                    </div>
                    <Badge variant={i === 0 && webhookStatus ? 
                      (webhookStatus === 'success' ? 'default' : 'destructive') : 
                      'secondary'}>
                      {i === 0 && webhookStatus ? 
                        (webhookStatus === 'success' ? 'Delivered' : 'Failed') : 
                        'Delivered'}
                    </Badge>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>

          {webhookStatus === 'error' && (
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-4 w-4" />
              <p className="text-sm">Failed to deliver webhook. Please check your endpoint configuration.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
