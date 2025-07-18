
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AgentPayment from "./pages/payment";
import Hostels from "./pages/Hostels";
import HostelDetail from "./pages/HostelDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AgentLogin from "./pages/AgentLogin";
import AgentDashboard from "./pages/AgentDashboard";
import Documentation from "./pages/Documentation";
import NotFound from "./pages/NotFound";
import Register from "./pages/register";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <div className="flex-1 flex flex-col">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/register" element={<Register />} />
              <Route path="/rooms" element={<Hostels />} />
              <Route path="/room/:id" element={<HostelDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/agent-payment" element={<AgentPayment />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/agent-login" element={<AgentLogin />} />
              <Route path="/agent-dashboard" element={<AgentDashboard />} />
              <Route path="/docs" element={<Documentation />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <footer className="border-t bg-white p-4 text-center text-sm text-muted-foreground">
            <span>
              &copy; {new Date().getFullYear()} Hostel.ng &mdash;
              <a 
                href="/docs"
                className="ml-2 underline text-primary hover:text-primary/80 transition-colors"
              >
                Docs
              </a>
            </span>
          </footer>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

