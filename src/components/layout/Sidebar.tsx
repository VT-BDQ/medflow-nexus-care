
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  FileText,
  Home,
  PanelLeft,
  Receipt,
  Settings,
  User,
  Users,
  Pill,
  TestTube,
  ChartBarIcon,
  ShieldIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  role: UserRole[];
};

type UserRole = "admin" | "doctor" | "receptionist" | "billing" | "pharmacy" | "lab";

// Mock active user role - in a real app this would come from auth state
const activeRole: UserRole = "admin";

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
    role: ["admin", "doctor", "receptionist", "billing", "pharmacy", "lab"],
  },
  {
    title: "Patients",
    href: "/patients",
    icon: User,
    role: ["admin", "doctor", "receptionist"],
  },
  {
    title: "Appointments",
    href: "/appointments",
    icon: Calendar,
    role: ["admin", "doctor", "receptionist"],
  },
  {
    title: "Medical Records",
    href: "/records",
    icon: FileText,
    role: ["admin", "doctor"],
  },
  {
    title: "Billing",
    href: "/billing",
    icon: Receipt,
    role: ["admin", "billing"],
  },
  {
    title: "Staff",
    href: "/staff",
    icon: Users,
    role: ["admin"],
  },
  {
    title: "Pharmacy",
    href: "/pharmacy",
    icon: Pill,
    role: ["admin", "pharmacy"],
  },
  {
    title: "Laboratory",
    href: "/laboratory",
    icon: TestTube,
    role: ["admin", "lab"],
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: ChartBarIcon,
    role: ["admin"],
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    role: ["admin"],
  },
  {
    title: "Security",
    href: "/security",
    icon: ShieldIcon,
    role: ["admin"],
  },
];

export function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const isMobile = useIsMobile();

  // If mobile, don't show the sidebar at all
  if (isMobile) {
    return null;
  }

  // Filter nav items by role
  const filteredNavItems = navItems.filter(item => 
    item.role.includes(activeRole)
  );

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-30 flex h-screen flex-col border-r border-border bg-sidebar transition-width duration-300",
        expanded ? "w-64" : "w-16"
      )}
    >
      <div className="flex h-16 items-center border-b border-border p-2">
        {expanded ? (
          <div className="flex items-center gap-2 px-2">
            <span className="text-xl font-bold text-medical-primary">MedFlow</span>
            <span className="text-sm text-medical-secondary">Nexus</span>
          </div>
        ) : (
          <div className="flex w-full justify-center">
            <span className="text-xl font-bold text-medical-primary">M</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-2">
        <nav className="flex flex-col gap-1">
          {filteredNavItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;

            return (
              <Tooltip key={item.href} delayDuration={100}>
                <TooltipTrigger asChild>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex h-10 items-center gap-2 rounded-md px-3 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {expanded && <span>{item.title}</span>}
                  </Link>
                </TooltipTrigger>
                {!expanded && (
                  <TooltipContent side="right">
                    {item.title}
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-border p-2">
        <Button
          variant="ghost"
          size="icon"
          className="w-full"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
    </aside>
  );
}
