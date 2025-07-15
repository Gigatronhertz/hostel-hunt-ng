// =============================================================================
// SIMPLIFIED AUTHENTICATION SERVICE - Cookie-Based Session Management
// =============================================================================
// This service handles authentication using session cookies instead of JWT tokens
// All API calls use 'credentials: include' to send cookies automatically
// =============================================================================

// =============================================================================
// AUTHENTICATION CHECK FUNCTION
// =============================================================================
// Checks if user is authenticated by hitting the auth endpoint
export const checkAuthentication = async (): Promise<boolean> => {
  try {
    // Backend endpoint: POST /auth/login
    // This endpoint checks if the session cookie is valid
    const response = await fetch('/auth/login', {
      method: 'POST',
      credentials: 'include', // ✅ Include session cookie
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.ok;
  } catch (error) {
    console.error('Authentication check failed:', error);
    return false;
  }
};

// =============================================================================
// AGENT PROFILE FETCH FUNCTION
// =============================================================================
// Fetches the authenticated agent's profile data
export const fetchAgentProfile = async () => {
  try {
    // Backend endpoint: GET /api/agents/profile
    const response = await fetch('/api/agents/profile', {
      method: 'GET',
      credentials: 'include' // ✅ Include session cookie
    });

    if (response.ok) {
      return await response.json();
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
// Fetches all rooms belonging to the authenticated agent
export const fetchAgentRooms = async () => {
  try {
    // Backend endpoint: GET /api/agents/rooms
    const response = await fetch('/api/agents/rooms', {
      method: 'GET',
      credentials: 'include' // ✅ Include session cookie
    });

    if (response.ok) {
      return await response.json();
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
// Logs out the user by clearing the session cookie
export const logout = async (): Promise<boolean> => {
  try {
    // Backend endpoint: POST /auth/logout
    const response = await fetch('/auth/logout', {
      method: 'POST',
      credentials: 'include' // ✅ Include session cookie for logout
    });

    return response.ok;
  } catch (error) {
    console.error('Logout failed:', error);
    return false;
  }
};