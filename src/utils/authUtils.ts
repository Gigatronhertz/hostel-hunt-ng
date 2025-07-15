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
  // Check token validity before making request
  if (!isTokenValid()) {
    console.warn('[AuthFetch] Invalid token, redirecting to login');
    removeAuthToken();
    window.location.href = '/agent-login';
    throw new Error('Token invalid or expired');
  }

  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
    ...options.headers,
  };

  console.log(`[AuthFetch] Making authenticated request to: ${url}`);

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    console.log(`[AuthFetch] Response status: ${response.status}`);

    // Auto-logout on unauthorized responses
    if (response.status === 401 || response.status === 403) {
      console.warn('[AuthFetch] Unauthorized response, clearing token');
      removeAuthToken();
      window.location.href = '/agent-login';
    }

    return response;
  } catch (error) {
    console.error(`[AuthFetch] Network error for ${url}:`, error);
    throw error;
  }
};

// =============================================================================
// TOKEN DEBUGGING UTILITY
// =============================================================================

export const debugToken = (): void => {
  const token = getAuthToken();
  if (!token) {
    console.log('[Token Debug] No token found');
    return;
  }

  try {
    const parts = token.split('.');
    const header = JSON.parse(atob(parts[0]));
    const payload = JSON.parse(atob(parts[1]));
    
    console.log('[Token Debug] Header:', header);
    console.log('[Token Debug] Payload:', payload);
    console.log('[Token Debug] Expires:', new Date(payload.exp * 1000));
    console.log('[Token Debug] Valid:', isTokenValid());
  } catch (error) {
    console.error('[Token Debug] Error decoding token:', error);
  }
};