import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ✅ Import your new components and context
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import LandingPage from "./pages/Index";
import Auth from "./pages/Auth";
import VendorDashboardPage from "./pages/VendorDashboardPage";
import SupplierDashboardPage from "./pages/SupplierDashboardPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* ✅ Wrap everything in the AuthProvider */}
        <AuthProvider>
          <Routes>
            {/* --- Public Routes --- */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth/:mode" element={<Auth />} />

            {/* --- Protected Vendor Routes --- */}
            <Route element={<ProtectedRoute allowedRoles={['vendor']} />}>
              <Route path="/vendor/dashboard" element={<VendorDashboardPage />} />
              {/* Add other vendor-only routes here */}
            </Route>

            {/* --- Protected Supplier Routes --- */}
            <Route element={<ProtectedRoute allowedRoles={['supplier']} />}>
              <Route path="/supplier/dashboard" element={<SupplierDashboardPage />} />
              {/* Add other supplier-only routes here */}
            </Route>

            {/* --- Catch-all 404 Route --- */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;