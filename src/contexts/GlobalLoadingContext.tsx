import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GlobalLoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  showServerBootup: () => void;
  hideServerBootup: () => void;
}

const GlobalLoadingContext = createContext<GlobalLoadingContextType | undefined>(undefined);

export const useGlobalLoading = () => {
  const context = useContext(GlobalLoadingContext);
  if (context === undefined) {
    throw new Error('useGlobalLoading must be used within a GlobalLoadingProvider');
  }
  return context;
};

interface GlobalLoadingProviderProps {
  children: ReactNode;
}

export const GlobalLoadingProvider: React.FC<GlobalLoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const showServerBootup = () => {
    setIsLoading(true);
  };

  const hideServerBootup = () => {
    setIsLoading(false);
  };

  const value = {
    isLoading,
    setLoading,
    showServerBootup,
    hideServerBootup,
  };

  return (
    <GlobalLoadingContext.Provider value={value}>
      {children}
      {isLoading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">Starting server...</h3>
              <p className="text-sm text-muted-foreground">This may take a moment</p>
            </div>
          </div>
        </div>
      )}
    </GlobalLoadingContext.Provider>
  );
};