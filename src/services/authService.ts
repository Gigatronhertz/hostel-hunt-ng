// =============================================================================
// JWT-BASED AUTHENTICATION SERVICE
// =============================================================================
// This service handles authentication using JWT tokens stored in localStorage
// All API calls use Authorization headers with Bearer tokens
// =============================================================================

import { getAuthHeaders, removeAuthToken } from '@/utils/authUtils';

// =============================================================================
// AUTHENTICATION CHECK FUNCTION
// =============================================================================
// Checks if user is authenticated by validating JWT token
export const checkAuthentication = async (): Promise<boolean> => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) return false;

    const response = await fetch('https://hostelng.onrender.com/auth/verify', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      removeAuthToken();
      return false;
    }

    return true;
  } catch (error) {
    console.error('Authentication check failed:', error);
    removeAuthToken();
    return false;
  }
};

// =============================================================================
// AGENT PROFILE FETCH FUNCTION
// =============================================================================
// Fetches the authenticated agent's profile data using JWT token
export const fetchAgentProfile = async () => {
  try {
    const response = await fetch('https://hostelng.onrender.com/api/agents/profile', {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (response.ok) {
      return await response.json();
    }
    
    if (response.status === 401 || response.status === 403) {
      removeAuthToken();
    }
    
    return null;
  } catch (error) {
    console.error('Failed to fetch agent profile:', error);
    return null;
  }
};

// =============================================================================
// AGENT ROOMS FETCH FUNCTION
// =============================================================================
// Fetches all rooms belonging to the authenticated agent using JWT token
export const fetchAgentRooms = async () => {
  try {
    const response = await fetch('https://hostelng.onrender.com/api/agents/rooms', {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (response.ok) {
      return await response.json();
    }
    
    if (response.status === 401 || response.status === 403) {
      removeAuthToken();
    }
    
    return [];
  } catch (error) {
    console.error('Failed to fetch agent rooms:', error);
    return [];
  }
};

// =============================================================================
// LOGOUT FUNCTION
// =============================================================================
// Logs out the user by clearing JWT token and notifying backend
export const logout = async (): Promise<boolean> => {
  try {
    const response = await fetch('https://hostelng.onrender.com/auth/logout', {
      method: 'POST',
      headers: getAuthHeaders()
    });

    // Clear token regardless of response
    removeAuthToken();
    
    return response.ok;
  } catch (error) {
    console.error('Logout failed:', error);
    // Still clear token even if request fails
    removeAuthToken();
    return false;
  }
};