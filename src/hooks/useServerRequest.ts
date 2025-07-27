import { useGlobalLoading } from '@/contexts/GlobalLoadingContext';

export const useServerRequest = () => {
  const { showServerBootup, hideServerBootup } = useGlobalLoading();

  const makeRequest = async (url: string, options?: RequestInit) => {
    showServerBootup();
    
    try {
      const response = await fetch(url, options);
      return response;
    } catch (error) {
      throw error;
    } finally {
      hideServerBootup();
    }
  };

  return { makeRequest };
};