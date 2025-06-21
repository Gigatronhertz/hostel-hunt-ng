
// =============================================================================
// GOOGLE OAUTH CALLBACK COMPONENT
// =============================================================================
// This component handles the OAuth callback after a user authenticates with Google
// It processes the authentication data and completes the login flow
// =============================================================================

import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { agentAuthService } from '@/services/mongoService';
import { useToast } from '@/hooks/use-toast';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  // =============================================================================
  // OAUTH CALLBACK PROCESSING
  // =============================================================================
  // This useEffect runs when the component mounts and processes the OAuth callback
  useEffect(() => {
    const handleCallback = async () => {
      // STEP 1: Extract authentication data from URL parameters
      // Your backend should redirect here with these parameters after successful Google OAuth
      // URL format: /auth/google/callback?token=jwt_token&agentData=encoded_agent_data
      const token = searchParams.get('token');        // JWT token from backend
      const agentData = searchParams.get('agentData'); // URL-encoded agent profile data
      
      // STEP 2: Verify that we received both required parameters
      if (token && agentData) {
        try {
          // STEP 3: Decode and parse the agent data
          // The agentData parameter is URL-encoded JSON that needs to be decoded and parsed
          const parsedAgentData = JSON.parse(decodeURIComponent(agentData));
          
          // STEP 4: Store authentication data in localStorage
          // This is the same process as regular login - stores token, agent ID, and profile data
          agentAuthService.handleGoogleCallback(token, parsedAgentData);
          
          // STEP 5: Show success message to user
          toast({
            title: "Login Successful!",
            description: "Welcome back to your agent dashboard.",
          });
          
          // STEP 6: Redirect to dashboard
          navigate('/agent-dashboard');
          
        } catch (error) {
          // STEP 7: Handle errors in processing the callback data
          console.error('Google callback error:', error);
          toast({
            title: "Login Failed",
            description: "There was an error processing your login.",
            variant: "destructive"
          });
          // Redirect back to login page on error
          navigate('/agent-login');
        }
      } else {
        // STEP 8: Handle missing or invalid callback parameters
        // This could happen if the user manually navigates to this URL or if there's an issue with the OAuth flow
        toast({
          title: "Login Failed",
          description: "Invalid callback parameters.",
          variant: "destructive"
        });
        navigate('/agent-login');
      }
    };

    // Execute the callback handling
    handleCallback();
  }, [searchParams, navigate, toast]);

  // =============================================================================
  // LOADING STATE DISPLAY
  // =============================================================================
  // Show a loading spinner while processing the OAuth callback
  // This provides user feedback during the authentication process
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        {/* Loading spinner animation */}
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-lg text-muted-foreground">Processing your login...</p>
      </div>
    </div>
  );
};

export default GoogleCallback;

// =============================================================================
// BACKEND INTEGRATION NOTES FOR DEPLOYMENT
// =============================================================================
/*
For this component to work with your backend, ensure your Render backend:

1. Has a Google OAuth route at: GET /auth/google
   - This should initiate the Google OAuth flow
   - Redirect URI should point to your frontend callback URL

2. After successful Google authentication, redirect to:
   - URL: /auth/google/callback?token=JWT_TOKEN&agentData=ENCODED_AGENT_DATA
   - token: The JWT token for the authenticated agent
   - agentData: URL-encoded JSON string of the agent's profile data

3. The agentData should include at minimum:
   - _id: Agent's unique identifier
   - name: Agent's full name
   - email: Agent's email address
   - Any other profile information

4. Example redirect URL:
   /auth/google/callback?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...&agentData=%7B%22_id%22%3A%22123%22%2C%22name%22%3A%22John%20Doe%22%7D

Remember to update the Google OAuth initiation URL in AgentLogin.tsx to match your deployed backend URL.
*/
