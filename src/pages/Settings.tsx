import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const Settings = () => {
  const [autoApply, setAutoApply] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <DashboardLayout>
      <div className="p-6 max-w-[700px] space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Configure dashboard preferences.</p>
        </div>
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Auto-apply recommendations</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Automatically execute AI suggestions (beta)</p>
              </div>
              <Switch checked={autoApply} onCheckedChange={setAutoApply} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Email notifications</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Receive alerts when products change status</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
