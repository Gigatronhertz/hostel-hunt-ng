
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { agentAuthService } from '@/services/mongoService';
import { useToast } from '@/hooks/use-toast';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get('token');
      const agentData = searchParams.get('agentData');
      
      if (token && agentData) {
        try {
          const parsedAgentData = JSON.parse(decodeURIComponent(agentData));
          agentAuthService.handleGoogleCallback(token, parsedAgentData);
          
          toast({
            title: "Login Successful!",
            description: "Welcome back to your agent dashboard.",
          });
          
          navigate('/agent-dashboard');
        } catch (error) {
          console.error('Google callback error:', error);
          toast({
            title: "Login Failed",
            description: "There was an error processing your login.",
            variant: "destructive"
          });
          navigate('/agent-login');
        }
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid callback parameters.",
          variant: "destructive"
        });
        navigate('/agent-login');
      }
    };

    handleCallback();
  }, [searchParams, navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-lg text-muted-foreground">Processing your login...</p>
      </div>
    </div>
  );
};

export default GoogleCallback;

