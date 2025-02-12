import { Button } from "../Ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../Ui/card";
import { CreditCard, Receipt, AlertTriangle } from "lucide-react";

export function BillingSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Methods
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Credit Card</h4>
              <p className="text-sm text-muted-foreground">
                Manage your payment methods
              </p>
            </div>
            <Button>Add Card</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Billing History
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Invoices</h4>
              <p className="text-sm text-muted-foreground">
                Download past invoices
              </p>
            </div>
            <Button variant="outline">View All</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Usage Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Budget Alerts</h4>
              <p className="text-sm text-muted-foreground">
                Set spending limits
              </p>
            </div>
            <Button variant="outline">Configure</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
