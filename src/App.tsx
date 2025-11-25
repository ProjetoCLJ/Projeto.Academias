import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RegisterTrainer from "./pages/RegisterTrainer";
import RegisterStudent from "./pages/RegisterStudent";
import Search from "./pages/Search";
import Trainers from "./pages/Trainers";
import TrainerProfile from "./pages/TrainerProfile";
import TrainerDashboard from "./pages/dashboard/TrainerDashboard";
import StudentDashboard from "./pages/dashboard/StudentDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/register/trainer" element={<RegisterTrainer />} />
            <Route path="/register/student" element={<RegisterStudent />} />
            <Route path="/search" element={<Search />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/trainer/:id" element={<TrainerProfile />} />
            <Route path="/dashboard/trainer" element={<TrainerDashboard />} />
            <Route path="/dashboard/student" element={<StudentDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App ;
