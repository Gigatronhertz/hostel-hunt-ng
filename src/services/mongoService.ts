// =============================================================================
// MONGODB SERVICE - Backend API Integration Layer
// =============================================================================
// This file handles all communication with your Render backend API
// IMPORTANT: Change the API_BASE_URL to your deployed Render app URL when ready
// =============================================================================

// TODO: Replace this URL with your actual Render deployment URL
// Example: 'https://your-app-name.onrender.com/api'
const API_BASE_URL = 'https://hostelng.onrender.com/api';

// =============================================================================
// AUTHENTICATION TOKEN MANAGEMENT
// =============================================================================
// The frontend uses localStorage to store authentication data
// This allows users to stay logged in across browser sessions

// Helper function to retrieve the JWT token from localStorage
// This token is sent with every authenticated API request
const getAuthToken = () => {
  return localStorage.getItem('agentToken');
};

// Helper function to create HTTP headers with authentication
// All authenticated endpoints require the Bearer token in the Authorization header
const createAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    // Only add Authorization header if token exists (user is logged in)
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// =============================================================================
// AGENT AUTHENTICATION SERVICE
// =============================================================================
// Handles all agent-related authentication operations
export const agentAuthService = {
  
  // =============================================================================
  // AGENT REGISTRATION ENDPOINT
  // =============================================================================
  // Registers a new agent account (pending verification)
  // Backend endpoint: POST /api/agents/register
  async register(agentData: {
    name: string;
    email: string;
    password: string;
    phone: string;
  }) {
    try {
      // Send registration data to your backend
      // Your backend should validate the data and create a pending agent account
      const response = await fetch(`${API_BASE_URL}/agents/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agentData),
      });

      // Check if the registration was successful
      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      // Return success status for the frontend to handle
      return { success: true, data };
    } catch (error) {
      console.error('Registration error:', error);
      // Return error for frontend error handling
      return { success: false, error: error.message };
    }
  },

  // =============================================================================
  // AGENT LOGIN ENDPOINT
  // =============================================================================
  // Authenticates an agent and stores their session data
  // Backend endpoint: POST /api/agents/login
  async login(credentials: { email: string; password: string }) {
    try {
      // Send login credentials to your backend for verification
      const response = await fetch(`${API_BASE_URL}/agents/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      // Check if login was successful
      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      // CRITICAL: Store authentication data in localStorage
      // This keeps the user logged in across browser sessions
      // Your backend should return: { token: "jwt_token", agent: {...agent_data} }
      localStorage.setItem('agentToken', data.token);           // JWT token for API calls
      localStorage.setItem('agentId', data.agent._id);          // Agent's unique ID
      localStorage.setItem('agentData', JSON.stringify(data.agent)); // Cache agent profile

      return { success: true, data };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  },

  // =============================================================================
  // GET AGENT PROFILE ENDPOINT
  // =============================================================================
  // Fetches the current agent's profile data using their JWT token
  // Backend endpoint: GET /api/agents/profile
  async getProfile() {
    try {
      // This endpoint requires authentication - token is sent in headers
      const response = await fetch(`${API_BASE_URL}/agents/profile`, {
        method: 'GET',
        headers: createAuthHeaders(), // Includes Authorization: Bearer <token>
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Profile fetch error:', error);
      return { success: false, error: error.message };
    }
  },

  // =============================================================================
  // GOOGLE OAUTH CALLBACK HANDLER
  // =============================================================================
  // Processes the data returned from Google OAuth authentication
  // This is called after the user returns from Google's OAuth flow
  handleGoogleCallback(token: string, agentData: any) {
    // Store the authentication data just like regular login
    // The backend handles Google OAuth and returns the same data structure
    localStorage.setItem('agentToken', token);
    localStorage.setItem('agentId', agentData._id);
    localStorage.setItem('agentData', JSON.stringify(agentData));
  },

  // =============================================================================
  // LOGOUT FUNCTION
  // =============================================================================
  // Clears all authentication data from localStorage
  // This effectively logs the user out on the frontend
  logout() {
    localStorage.removeItem('agentToken');
    localStorage.removeItem('agentId');
    localStorage.removeItem('agentData');
  },

  // =============================================================================
  // AUTHENTICATION CHECK
  // =============================================================================
  // Checks if the user is currently authenticated
  // Used by route guards to protect authenticated pages
  isAuthenticated() {
    return !!getAuthToken(); // Returns true if token exists, false otherwise
  }
};

// =============================================================================
// ROOM MANAGEMENT SERVICE
// =============================================================================
// Handles all room-related operations including file uploads
export const roomService = {
  
  // =============================================================================
  // CREATE ROOM WITH FILE UPLOADS
  // =============================================================================
  // Creates a new room listing with images and videos
  // Backend endpoint: POST /api/rooms (with multipart/form-data)
  async createRoom(roomData: any, images: File[], videos: File[]) {
    try {
      // Use FormData for file uploads - this is required for multipart/form-data
      const formData = new FormData();
      
      // Add all room data fields to FormData
      // Your backend should expect these exact field names
      Object.keys(roomData).forEach(key => {
        if (key === 'amenities') {
          // Amenities is an array, so stringify it for transmission
          formData.append(key, JSON.stringify(roomData[key]));
        } else {
          formData.append(key, roomData[key]);
        }
      });

      // Add the current agent's ID to associate the room with them
      const agentId = localStorage.getItem('agentId');
      formData.append('agentId', agentId);

      // Add image files - your backend should handle 'images' field
      // Each image file is appended with the same field name
      images.forEach((image, index) => {
        formData.append(`images`, image);
      });

      // Add video files - your backend should handle 'videos' field
      videos.forEach((video, index) => {
        formData.append(`videos`, video);
      });

      // Get authentication token for the request
      const token = getAuthToken();
      const response = await fetch(`${API_BASE_URL}/rooms`, {
        method: 'POST',
        headers: {
          // NOTE: Don't set Content-Type for FormData - browser sets it automatically
          // Only include Authorization header
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: formData, // Send FormData with files and text data
      });

      if (!response.ok) {
        throw new Error('Failed to create room');
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Room creation error:', error);
      return { success: false, error: error.message };
    }
  },

  // =============================================================================
  // GET AGENT'S ROOMS
  // =============================================================================
  // Fetches all rooms belonging to a specific agent
  // Backend endpoint: GET /api/rooms/agent/:agentId
  async getAgentRooms(agentId: string) {
    try {
      // This endpoint requires authentication to ensure agents can only see their own rooms
      const response = await fetch(`${API_BASE_URL}/rooms/agent/${agentId}`, {
        method: 'GET',
        headers: createAuthHeaders(), // Include authentication token
      });

      if (!response.ok) {
        throw new Error('Failed to fetch rooms');
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Rooms fetch error:', error);
      return { success: false, error: error.message };
    }
  },

  // =============================================================================
  // GET ALL ROOMS WITH FILTERS (PUBLIC ENDPOINT)
  // =============================================================================
  // Fetches rooms for public browsing with optional filters
  // Backend endpoint: GET /api/rooms with query parameters
  async getRooms(filters?: {
    campus?: string;
    roomType?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
  }) {
    try {
      // Build query parameters from filters
      const queryParams = new URLSearchParams();
      
      if (filters) {
        // Add each filter as a query parameter if it has a value
        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            queryParams.append(key, value.toString());
          }
        });
      }

      // Construct the full URL with query parameters
      const url = `${API_BASE_URL}/rooms${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      // This is a public endpoint - no authentication required
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch rooms');
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Rooms fetch error:', error);
      return { success: false, error: error.message };
    }
  },

  // =============================================================================
  // GET SINGLE ROOM DETAILS (PUBLIC ENDPOINT)
  // =============================================================================
  // Fetches detailed information for a specific room
  // Backend endpoint: GET /api/rooms/:roomId
  async getRoomById(roomId: string) {
    try {
      // Public endpoint for viewing room details
      const response = await fetch(`${API_BASE_URL}/rooms/${roomId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch room details');
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Room fetch error:', error);
      return { success: false, error: error.message };
    }
  },

  // =============================================================================
  // UPDATE ROOM WITH OPTIONAL NEW FILES
  // =============================================================================
  // Updates an existing room, optionally adding new images/videos
  // Backend endpoint: PUT /api/rooms/:roomId
  async updateRoom(roomId: string, roomData: any, images?: File[], videos?: File[]) {
    try {
      const formData = new FormData();
      
      // Add updated room data
      Object.keys(roomData).forEach(key => {
        if (key === 'amenities') {
          formData.append(key, JSON.stringify(roomData[key]));
        } else {
          formData.append(key, roomData[key]);
        }
      });

      // Add new images if provided (these will be added to existing images)
      if (images && images.length > 0) {
        images.forEach((image) => {
          formData.append(`images`, image);
        });
      }

      // Add new videos if provided (these will be added to existing videos)
      if (videos && videos.length > 0) {
        videos.forEach((video) => {
          formData.append(`videos`, video);
        });
      }

      const token = getAuthToken();
      const response = await fetch(`${API_BASE_URL}/rooms/${roomId}`, {
        method: 'PUT',
        headers: {
          // Only include Authorization header for FormData
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update room');
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Room update error:', error);
      return { success: false, error: error.message };
    }
  },

  // =============================================================================
  // DELETE ROOM
  // =============================================================================
  // Deletes a room listing (only the owner can delete)
  // Backend endpoint: DELETE /api/rooms/:roomId
  async deleteRoom(roomId: string) {
    try {
      // Requires authentication - only room owner can delete
      const response = await fetch(`${API_BASE_URL}/rooms/${roomId}`, {
        method: 'DELETE',
        headers: createAuthHeaders(), // Include authentication token
      });

      if (!response.ok) {
        throw new Error('Failed to delete room');
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Room deletion error:', error);
      return { success: false, error: error.message };
    }
  }
};

// =============================================================================
// ROOM CATEGORIES CONFIGURATION
// =============================================================================
// Predefined room categories for better organization and filtering
// These should match the categories your backend recognizes
export const ROOM_CATEGORIES = {
  BUDGET: {
    name: 'Budget',
    types: ['Single Room', 'Shared Apartment'],
    priceRange: { min: 200000, max: 500000 }
  },
  STANDARD: {
    name: 'Standard',
    types: ['One Bedroom', 'Two Bedroom'],
    priceRange: { min: 500000, max: 800000 }
  },
  PREMIUM: {
    name: 'Premium',
    types: ['Two Bedroom', 'Three Bedroom'],
    priceRange: { min: 800000, max: 1500000 }
  }
};
