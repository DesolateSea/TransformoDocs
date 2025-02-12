import { useState } from "react";
import { SettingsNavigation } from "../components/settings/SettingsNavigation";
import { SecuritySection } from "../components/settings/SecuritySection";
import { WorkspaceSection } from "../components/settings/WorkspaceSection";
import { BillingSection } from "../components/settings/BillingSection";
import { NotificationsSection } from "../components/settings/NotificationsSection";
import { ProfileSection } from "../components/settings/ProfileSection";

const Settings = () => {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="flex flex-col lg:flex-row gap-8 relative">
        <aside className="lg:w-64 shrink-0">
          <div className="sticky top-4">
            <SettingsNavigation
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>
        </aside>

        <main className="flex-1 min-w-0 overflow-hidden">
          {activeSection === "profile" && <ProfileSection />}
          {activeSection === "security" && <SecuritySection />}
          {activeSection === "workspace" && <WorkspaceSection />}
          {activeSection === "billing" && <BillingSection />}
          {activeSection === "notifications" && <NotificationsSection />}
        </main>
      </div>
    </div>
  );
};

export default Settings;
