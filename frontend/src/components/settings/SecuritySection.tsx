import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Shield, Key, History } from "lucide-react";

export function SecuritySection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Multi-Factor Authentication
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">TOTP Authentication</h4>
              <p className="text-sm text-muted-foreground">Use Google Authenticator or Authy</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Hardware Security Keys</h4>
              <p className="text-sm text-muted-foreground">Configure FIDO2 security keys</p>
            </div>
            <Button variant="outline">Configure</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            API Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">API Keys</h4>
              <p className="text-sm text-muted-foreground">Manage your API keys</p>
            </div>
            <Button>Manage Keys</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">IP Whitelist</h4>
              <p className="text-sm text-muted-foreground">Control API access by IP</p>
            </div>
            <Button variant="outline">Configure</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Audit Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Security Events</h4>
                <p className="text-sm text-muted-foreground">View recent security activity</p>
              </div>
              <Button variant="outline">View Logs</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}