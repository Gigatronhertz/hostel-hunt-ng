import { useEffect } from 'react';
import { debugToken, getAuthToken } from '@/utils/authUtils';

const AuthDebugger = () => {
  useEffect(() => {
    console.log('=== AUTH DEBUGGER ===');
    console.log('Current URL:', window.location.href);
    console.log('Token exists:', !!getAuthToken());
    
    if (getAuthToken()) {
      debugToken();
    }
    
    // Test backend connectivity
    fetch('https://hostelng.onrender.com/all-rooms')
      .then(response => {
        console.log('Backend connectivity test (public endpoint):', response.status);
      })
      .catch(error => {
        console.error('Backend connectivity failed:', error);
      });
  }, []);

  return null; // This component is for debugging only
};

export default AuthDebugger;