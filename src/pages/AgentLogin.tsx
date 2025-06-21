
// =============================================================================
// AGENT LOGIN PAGE - Authentication Interface for Agents
// =============================================================================
// This component handles both login and registration for agents
// It includes Google OAuth integration and traditional email/password authentication
// =============================================================================

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, UserPlus, LogIn } from "lucide-react";
import { agentAuthService } from "@/services/mongoService";

const AgentLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // =============================================================================
  // COMPONENT STATE MANAGEMENT
  // =============================================================================
  const [isLoading, setIsLoading] = useState(false);     // Loading state for form submissions
  
  // Login form data state
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  
  // Registration form data state
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  // =============================================================================
  // LOGIN FORM SUBMISSION HANDLER
  // =============================================================================
  // Handles traditional email/password login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // STEP 1: Send login credentials to backend for verification
      // Backend endpoint: POST /api/agents/login
      const result = await agentAuthService.login({
        email: loginData.email,
        password: loginData.password
      });

      if (result.success) {
        // STEP 2: Login successful - authentication data is automatically stored
        // The agentAuthService.login() method handles token storage in localStorage
        toast({
          title: "Login Successful!",
          description: "Welcome back to your agent dashboard.",
        });
        // STEP 3: Redirect to dashboard
        navigate("/agent-dashboard");
      } else {
        // STEP 4: Handle login failure
        toast({
          title: "Login Failed",
          description: result.error || "Invalid email or password.",
          variant: "destructive"
        });
      }
    } catch (error) {
      // Handle unexpected errors (network issues, etc.)
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // =============================================================================
  // GOOGLE OAUTH LOGIN HANDLER
  // =============================================================================
  // Initiates Google OAuth flow by redirecting to backend OAuth endpoint
  const handleGoogleLogin = () => {
    console.log("Redirecting to Google authentication...");
    toast({
      title: "Google Login",
      description: "Redirecting to Google authentication...",
    });
    
    // IMPORTANT: This URL should match your backend's Google OAuth initiation endpoint
    // Your backend should handle the OAuth flow and redirect back to /auth/google/callback
    // TODO: Update this URL to match your deployed Render app
    window.location.href = "https://hostelng.onrender.com/auth/google";
  };

  // =============================================================================
  // REGISTRATION FORM SUBMISSION HANDLER
  // =============================================================================
  // Handles new agent registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // STEP 1: Validate that passwords match
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // STEP 2: Send registration data to backend
      // Backend endpoint: POST /api/agents/register
      const result = await agentAuthService.register({
        name: registerData.name,
        email: registerData.email,
        phone: registerData.phone,
        password: registerData.password
      });

      if (result.success) {
        // STEP 3: Registration successful (account pending verification)
        toast({
          title: "Registration Submitted!",
          description: "Your agent account is pending verification. We'll contact you soon.",
        });
        
        // STEP 4: Reset form to clear sensitive data
        setRegisterData({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: ""
        });
      } else {
        // Handle registration failure
        toast({
          title: "Registration Failed",
          description: result.error || "Failed to register. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
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
              AUTHENTICATION TABS SECTION
              ============================================================================= */}
          <Card>
            <CardHeader>
              <CardTitle>Welcome Agent</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                
                {/* =============================================================================
                    LOGIN TAB - Handle User Login
                    ============================================================================= */}
                <TabsContent value="login">
                  <div className="space-y-4">
                    {/* =============================================================================
                        GOOGLE OAUTH LOGIN BUTTON
                        ============================================================================= */}
                    <Button 
                      onClick={handleGoogleLogin} 
                      variant="outline" 
                      className="w-full"
                      disabled={isLoading}
                    >
                      {/* Google logo SVG */}
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Continue with Google
                    </Button>
                    
                    {/* Divider between Google and email login */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-muted"></div>
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">or</span>
                      </div>
                    </div>

                    {/* =============================================================================
                        EMAIL/PASSWORD LOGIN FORM
                        ============================================================================= */}
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <Label htmlFor="login-email">Email</Label>
                        <Input
                          id="login-email"
                          type="email"
                          value={loginData.email}
                          onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                          required
                          disabled={isLoading}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="login-password">Password</Label>
                        <Input
                          id="login-password"
                          type="password"
                          value={loginData.password}
                          onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                          required
                          disabled={isLoading}
                        />
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        <LogIn className="w-4 h-4 mr-2" />
                        {isLoading ? "Logging in..." : "Login"}
                      </Button>
                    </form>
                  </div>
                </TabsContent>
                
                {/* =============================================================================
                    REGISTRATION TAB - Handle New Agent Registration
                    ============================================================================= */}
                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    {/* Full name input */}
                    <div>
                      <Label htmlFor="register-name">Full Name</Label>
                      <Input
                        id="register-name"
                        value={registerData.name}
                        onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                        required
                        disabled={isLoading}
                      />
                    </div>
                    
                    {/* Email input */}
                    <div>
                      <Label htmlFor="register-email">Email</Label>
                      <Input
                        id="register-email"
                        type="email"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                        required
                        disabled={isLoading}
                      />
                    </div>
                    
                    {/* Phone number input */}
                    <div>
                      <Label htmlFor="register-phone">Phone Number</Label>
                      <Input
                        id="register-phone"
                        type="tel"
                        value={registerData.phone}
                        onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                        required
                        disabled={isLoading}
                      />
                    </div>
                    
                    {/* Password input */}
                    <div>
                      <Label htmlFor="register-password">Password</Label>
                      <Input
                        id="register-password"
                        type="password"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                        required
                        disabled={isLoading}
                      />
                    </div>
                    
                    {/* Confirm password input */}
                    <div>
                      <Label htmlFor="register-confirm">Confirm Password</Label>
                      <Input
                        id="register-confirm"
                        type="password"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                        required
                        disabled={isLoading}
                      />
                    </div>
                    
                    {/* =============================================================================
                        BUSINESS MODEL INFORMATION SECTION
                        ============================================================================= */}
                    <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
                      <p className="font-medium mb-1">Hostel.ng Business Model:</p>
                      <ul className="text-xs space-y-1">
                        <li>• ₦5,000 monthly platform fee</li>
                        <li>• 2.5% service charge per booking</li>
                        <li>• We facilitate student-agent connections</li>
                        <li>• Payments handled off-platform</li>
                      </ul>
                    </div>
                    
                    {/* Registration submit button */}
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      <UserPlus className="w-4 h-4 mr-2" />
                      {isLoading ? "Registering..." : "Register as Agent"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
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
