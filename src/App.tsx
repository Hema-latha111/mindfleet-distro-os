import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import CommandCenter from "./pages/CommandCenter";
import Dashboard from "./pages/Dashboard";
import Dispatch from "./pages/Dispatch";
import Deliveries from "./pages/Deliveries";
import Shops from "./pages/Shops";
import Inventory from "./pages/Inventory";
import Invoices from "./pages/Invoices";
import Staff from "./pages/Staff";
import Insights from "./pages/Insights";
import IntelligenceLayer from "./pages/IntelligenceLayer";
import SettingsPage from "./pages/SettingsPage";
import StaffRoute from "./pages/StaffRoute";
import StaffStops from "./pages/StaffStops";
import StaffSummary from "./pages/StaffSummary";
import StaffProfile from "./pages/StaffProfile";
import Login from "./pages/Login";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import { useUserStore } from "@/store";

const queryClient = new QueryClient();

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useUserStore();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const Home = () => {
  const { currentUser } = useUserStore();
  if (currentUser?.role === 'STAFF') {
    return <StaffRoute />;
  }
  return <CommandCenter />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" richColors />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Pricing />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <AuthGuard>
                <AppLayout>
                  <Home />
                </AppLayout>
              </AuthGuard>
            }
          />
          <Route element={<AuthGuard><AppLayout><Dashboard /></AppLayout></AuthGuard>} path="/dashboard" />
          <Route element={<AuthGuard><AppLayout><Dispatch /></AppLayout></AuthGuard>} path="/dispatch" />
          <Route element={<AuthGuard><AppLayout><Deliveries /></AppLayout></AuthGuard>} path="/deliveries" />
          <Route element={<AuthGuard><AppLayout><Shops /></AppLayout></AuthGuard>} path="/shops" />
          <Route element={<AuthGuard><AppLayout><Inventory /></AppLayout></AuthGuard>} path="/inventory" />
          <Route element={<AuthGuard><AppLayout><Invoices /></AppLayout></AuthGuard>} path="/invoices" />
          <Route element={<AuthGuard><AppLayout><Staff /></AppLayout></AuthGuard>} path="/staff" />
          <Route element={<AuthGuard><AppLayout><Insights /></AppLayout></AuthGuard>} path="/insights" />
          <Route element={<AuthGuard><AppLayout><IntelligenceLayer /></AppLayout></AuthGuard>} path="/intelligence" />
          <Route element={<AuthGuard><AppLayout><SettingsPage /></AppLayout></AuthGuard>} path="/settings" />
          <Route element={<AuthGuard><AppLayout><SettingsPage /></AppLayout></AuthGuard>} path="/settings/users" />
          <Route element={<AuthGuard><AppLayout><Pricing isInternal={true} /></AppLayout></AuthGuard>} path="/app-pricing" />

          {/* Staff Routes */}
          <Route element={<AuthGuard><AppLayout><StaffRoute /></AppLayout></AuthGuard>} path="/route" />
          <Route element={<AuthGuard><AppLayout><StaffStops /></AppLayout></AuthGuard>} path="/stops" />
          <Route element={<AuthGuard><AppLayout><StaffSummary /></AppLayout></AuthGuard>} path="/summary" />
          <Route element={<AuthGuard><AppLayout><StaffProfile /></AppLayout></AuthGuard>} path="/profile" />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

