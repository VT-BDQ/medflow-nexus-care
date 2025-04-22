import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import Records from "./pages/Records";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/records" element={<Records />} />
            <Route path="/billing" element={<ComingSoon title="Billing & Payment" />} />
            <Route path="/staff" element={<ComingSoon title="Doctor & Staff Management" />} />
            <Route path="/pharmacy" element={<ComingSoon title="Pharmacy & Medicine" />} />
            <Route path="/laboratory" element={<ComingSoon title="Lab & Diagnostic Integration" />} />
            <Route path="/analytics" element={<ComingSoon title="Reports & Analytics" />} />
            <Route path="/settings" element={<ComingSoon title="Settings" />} />
            <Route path="/security" element={<ComingSoon title="Security & Privacy" />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Placeholder component for routes that are not yet implemented
const ComingSoon = ({ title }: { title: string }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">
          This module is coming soon
        </p>
      </div>
      <div className="flex h-[500px] items-center justify-center rounded-lg border-2 border-dashed">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Under Development</h2>
          <p className="mt-2 text-muted-foreground">
            The {title} module is currently under development. <br />
            Please check back soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
