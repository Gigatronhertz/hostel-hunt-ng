
// =============================================================================
// SIMPLIFIED AGENT LOGIN - Google OAuth Only
// =============================================================================
// Simplified authentication flow: Google OAuth → Backend handles everything → Dashboard
// No more complex JWT management or manual forms
// =============================================================================

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Building2, Users, TrendingUp } from "lucide-react";

const AgentLogin = () => {
  // =============================================================================
  // GOOGLE OAUTH AUTHENTICATION HANDLER
  // =============================================================================
  // Single authentication method - Google OAuth only
  // Backend handles the complete OAuth flow and redirects to dashboard
  const handleGoogleAuth = () => {
    // Backend will handle OAuth and redirect to dashboard
    // Dashboard will then check auth status with backend
    window.location.href = "https://hostelng.onrender.com/auth/google";
  };

  // =============================================================================
  // MAIN COMPONENT RENDER
  // =============================================================================
  return (
    <div className="min-h-screen bg-background">
      {/* =============================================================================
          HEADER SECTION
          ============================================================================= */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            Hostel.ng
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/rooms" className="text-muted-foreground hover:text-primary transition-colors">
              Browse Rooms
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Back to home navigation */}
        <Link to="/" className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="max-w-md mx-auto">
          {/* Page title and description */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2">Agent Portal</h1>
            <p className="text-muted-foreground">
              Login or register to manage your room listings
            </p>
          </div>

          {/* =============================================================================
              SIMPLIFIED GOOGLE OAUTH SECTION
              ============================================================================= */}
          <Card>
            <CardHeader>
              <CardTitle>Welcome Agent</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* =============================================================================
                  BUSINESS MODEL INFORMATION SECTION
                  ============================================================================= */}
              <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-700">
                <p className="font-medium mb-2">Hostel.ng Business Model:</p>
                <ul className="text-xs space-y-1">
                  <li>• ₦5,000 monthly platform fee</li>
                  <li>• 2.5% service charge per booking</li>
                  <li>• We facilitate student-agent connections</li>
                  <li>• Payments handled off-platform</li>
                </ul>
              </div>

              {/* =============================================================================
                  PLATFORM BENEFITS SECTION
                  ============================================================================= */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center space-y-2">
                  <Building2 className="h-8 w-8 text-primary" />
                  <h3 className="font-semibold text-sm">Property Management</h3>
                  <p className="text-xs text-muted-foreground">Effortlessly manage multiple room listings</p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <Users className="h-8 w-8 text-primary" />
                  <h3 className="font-semibold text-sm">Student Network</h3>
                  <p className="text-xs text-muted-foreground">Connect with verified student tenants</p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <TrendingUp className="h-8 w-8 text-primary" />
                  <h3 className="font-semibold text-sm">Performance Analytics</h3>
                  <p className="text-xs text-muted-foreground">Track views and booking requests</p>
                </div>
              </div>

              {/* =============================================================================
                  GOOGLE OAUTH BUTTON - SINGLE AUTHENTICATION METHOD
                  ============================================================================= */}
              <Button 
                onClick={handleGoogleAuth} 
                className="w-full py-6"
                size="lg"
              >
                {/* Google logo SVG */}
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By continuing, you agree to our terms of service and privacy policy
              </p>
            </CardContent>
          </Card>

          {/* Support link */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Need help? <Link to="/contact" className="text-primary hover:underline">Contact Support</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentLogin;
