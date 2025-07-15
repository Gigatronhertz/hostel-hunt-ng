import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticatedFetch, getAuthToken, removeAuthToken } from '@/utils/authUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkDashboardAccess = async () => {
      try {
        const token = getAuthToken();
        if (!token) {
          navigate('/agent-login');
          return;
        }

        console.log('Making authenticated request to /dashboard');
        const response = await authenticatedFetch('https://hostelng.onrender.com/dashboard');
        
        if (response.ok) {
          // Backend will handle the redirect via response
          const text = await response.text();
          console.log('Dashboard response:', text);
          
          // If we get here, check if it's a redirect instruction
          if (text.includes('register')) {
            navigate('/register');
          } else if (text.includes('agent-dashboard')) {
            navigate('/agent-dashboard');
          }
        } else {
          throw new Error(`Dashboard check failed: ${response.status}`);
        }
      } catch (error) {
        console.error('Dashboard access error:', error);
        setError(error instanceof Error ? error.message : 'Failed to access dashboard');
        removeAuthToken();
        setTimeout(() => navigate('/agent-login'), 2000);
      } finally {
        setLoading(false);
      }
    };

    checkDashboardAccess();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Checking Access</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="text-muted-foreground text-center">
              Verifying your authentication...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-destructive">Access Error</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
            <p className="text-muted-foreground text-center mt-4">
              Redirecting to login...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center">Processing your request...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;