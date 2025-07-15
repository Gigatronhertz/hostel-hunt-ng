import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AgentData {
  name: string;
  email: string;
  _id: string;
}

interface AgentAuthContextType {
  isAuthenticated: boolean;
  agentData: AgentData | null;
  loading: boolean;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

const AgentAuthContext = createContext<AgentAuthContextType | undefined>(undefined);

export const useAgentAuth = () => {
  const context = useContext(AgentAuthContext);
  if (context === undefined) {
    throw new Error('useAgentAuth must be used within an AgentAuthProvider');
  }
  return context;
};

interface AgentAuthProviderProps {
  children: ReactNode;
}

export const AgentAuthProvider: React.FC<AgentAuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [agentData, setAgentData] = useState<AgentData | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        console.log('[Auth] No token found');
        setAgentData(null);
        setIsAuthenticated(false);
        return;
      }

      // Basic token validation before making request
      try {
        const parts = token.split('.');
        if (parts.length !== 3) {
          console.log('[Auth] Invalid token format');
          localStorage.removeItem('authToken');
          setAgentData(null);
          setIsAuthenticated(false);
          return;
        }
        
        const payload = JSON.parse(atob(parts[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        
        if (payload.exp && payload.exp <= currentTime) {
          console.log('[Auth] Token expired');
          localStorage.removeItem('authToken');
          setAgentData(null);
          setIsAuthenticated(false);
          return;
        }
      } catch (tokenError) {
        console.error('[Auth] Token validation error:', tokenError);
        localStorage.removeItem('authToken');
        setAgentData(null);
        setIsAuthenticated(false);
        return;
      }

      console.log('[Auth] Checking auth with backend...');
      const response = await fetch('https://hostelng.onrender.com/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const userData = await response.json();
        console.log('[Auth] User authenticated:', userData);
        setAgentData(userData);
        setIsAuthenticated(true);
      } else {
        console.log('[Auth] Auth check failed:', response.status);
        // Token is invalid, clear it
        localStorage.removeItem('authToken');
        setAgentData(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('[Auth] Network error during auth check:', error);
      // Don't remove token on network errors, just set as unauthenticated
      setAgentData(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('authToken');
      
      if (token) {
        await fetch('https://hostelng.onrender.com/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }
      
      // Clear token and state
      localStorage.removeItem('authToken');
      setAgentData(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
      // Still clear local state even if logout request fails
      localStorage.removeItem('authToken');
      setAgentData(null);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    isAuthenticated,
    agentData,
    loading,
    checkAuth,
    logout,
  };

  return (
    <AgentAuthContext.Provider value={value}>
      {children}
    </AgentAuthContext.Provider>
  );
};