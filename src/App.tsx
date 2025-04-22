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
import { RouteGuard } from "@/components/auth/RouteGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <RouteGuard>
              <Layout />
            </RouteGuard>
          }>
            <Route index element={<Dashboard />} />
            <Route path="/patients" element={
              <RouteGuard allowedRoles={['admin', 'doctor', 'receptionist']}>
                <Patients />
              </RouteGuard>
            } />
            <Route path="/appointments" element={
              <RouteGuard allowedRoles={['admin', 'doctor', 'receptionist']}>
                <Appointments />
              </RouteGuard>
            } />
            <Route path="/records" element={
              <RouteGuard allowedRoles={['admin', 'doctor']}>
                <Records />
              </RouteGuard>
            } />
            <Route path="/billing" element={
              <RouteGuard allowedRoles={['admin', 'billing']}>
                <ComingSoon title="Billing & Payment" />
              </RouteGuard>
            } />
            <Route path="/staff" element={
              <RouteGuard allowedRoles={['admin']}>
                <ComingSoon title="Doctor & Staff Management" />
              </RouteGuard>
            } />
            <Route path="/pharmacy" element={
              <RouteGuard allowedRoles={['admin', 'pharmacy']}>
                <ComingSoon title="Pharmacy & Medicine" />
              </RouteGuard>
            } />
            <Route path="/laboratory" element={
              <RouteGuard allowedRoles={['admin', 'lab']}>
                <ComingSoon title="Lab & Diagnostic Integration" />
              </RouteGuard>
            } />
            <Route path="/analytics" element={
              <RouteGuard allowedRoles={['admin']}>
                <ComingSoon title="Reports & Analytics" />
              </RouteGuard>
            } />
            <Route path="/settings" element={
              <RouteGuard allowedRoles={['admin']}>
                <ComingSoon title="Settings" />
              </RouteGuard>
            } />
            <Route path="/security" element={
              <RouteGuard allowedRoles={['admin']}>
                <ComingSoon title="Security & Privacy" />
              </RouteGuard>
            } />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

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
