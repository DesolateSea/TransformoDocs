import { Button } from "../Ui/button";
import { cn } from "../../Lib/utils";
import { Shield, Building2, CreditCard, Bell, User } from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, label, active, onClick }: NavItemProps) => (
  <Button
    variant={active ? "default" : "ghost"}
    className={cn("w-full justify-start gap-2", active && "bg-primary")}
    onClick={onClick}
  >
    {icon}
    <span className="hidden md:inline">{label}</span>
  </Button>
);

interface SettingsNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function SettingsNavigation({
  activeSection,
  onSectionChange,
}: SettingsNavigationProps) {
  const sections = [
    {
      id: "profile",
      label: "Profile Settings",
      icon: <User className="h-4 w-4" />,
    },
    { id: "security", label: "Security", icon: <Shield className="h-4 w-4" /> },
    {
      id: "workspace",
      label: "Workspace Settings",
      icon: <Building2 className="h-4 w-4" />,
    },
    {
      id: "billing",
      label: "Billing & Plans",
      icon: <CreditCard className="h-4 w-4" />,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell className="h-4 w-4" />,
    },
  ];

  return (
    <nav className="space-y-2 lg:w-60 sticky top-4">
      {sections.map((section) => (
        <NavItem
          key={section.id}
          icon={section.icon}
          label={section.label}
          active={activeSection === section.id}
          onClick={() => onSectionChange(section.id)}
        />
      ))}
    </nav>
  );
}
