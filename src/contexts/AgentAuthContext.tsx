import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useGlobalLoading } from './GlobalLoadingContext';

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
  const { showServerBootup, hideServerBootup } = useGlobalLoading();

  const checkAuth = async () => {
    try {
      setLoading(true);
      showServerBootup();
      const response = await fetch('/user', {
        method: 'GET',
        credentials: 'include', // Include cookies
      });

      if (response.ok) {
        const userData = await response.json();
        setAgentData(userData);
        setIsAuthenticated(true);
      } else {
        setAgentData(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setAgentData(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
      hideServerBootup();
    }
  };

  const logout = async () => {
    try {
      await fetch('/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setAgentData(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
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