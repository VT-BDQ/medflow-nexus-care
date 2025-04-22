
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar for desktop */}
      {!isMobile && <Sidebar />}

      {/* Mobile sidebar */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="absolute left-0 top-0 z-50 h-full w-64 animate-slide-in-right border-r border-border bg-sidebar">
            <Sidebar />
          </div>
          <div 
            className="absolute inset-0"
            onClick={toggleSidebar}
          />
        </div>
      )}

      {/* Main content */}
      <div 
        className={cn(
          "flex flex-1 flex-col",
          !isMobile && "ml-16",
          !isMobile && "md:ml-64"
        )}
      >
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
