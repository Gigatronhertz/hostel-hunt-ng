// =============================================================================
// AUTH UTILITY FUNCTIONS - JWT Token Management
// =============================================================================
// Centralized utilities for handling JWT authentication tokens
// =============================================================================

// =============================================================================
// TOKEN STORAGE AND RETRIEVAL
// =============================================================================

export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem('authToken');
};

// =============================================================================
// AUTH HEADERS GENERATION
// =============================================================================

export const getAuthHeaders = (): Record<string, string> => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// =============================================================================
// TOKEN VALIDATION
// =============================================================================

export const isTokenValid = (): boolean => {
  const token = getAuthToken();
  if (!token) return false;
  
  try {
    // Basic JWT structure validation (header.payload.signature)
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    // Decode payload to check expiration
    const payload = JSON.parse(atob(parts[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    
    return payload.exp ? payload.exp > currentTime : true;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
};

// =============================================================================
// AUTHENTICATED FETCH WRAPPER
// =============================================================================

export const authenticatedFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Auto-logout on unauthorized responses
  if (response.status === 401 || response.status === 403) {
    removeAuthToken();
    window.location.href = '/agent-login';
  }

  return response;
};