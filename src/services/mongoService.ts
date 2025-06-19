
// API service for Render backend integration
const API_BASE_URL = 'https://hostelng.onrender.com/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('agentToken');
};

// Helper function to create headers with auth
const createAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const agentAuthService = {
  // Register new agent
  async register(agentData: {
    name: string;
    email: string;
    password: string;
    phone: string;
  }) {
    try {
      const response = await fetch(`${API_BASE_URL}/agents/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agentData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    }
  },

  // Login agent
  async login(credentials: { email: string; password: string }) {
    try {
      const response = await fetch(`${API_BASE_URL}/agents/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      // Store token and agent info
      localStorage.setItem('agentToken', data.token);
      localStorage.setItem('agentId', data.agent._id);
      localStorage.setItem('agentData', JSON.stringify(data.agent));

      return { success: true, data };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  },

  // Get agent profile
  async getProfile() {
    try {
      const response = await fetch(`${API_BASE_URL}/agents/profile`, {
        method: 'GET',
        headers: createAuthHeaders(),
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

  // Handle Google OAuth callback
  handleGoogleCallback(token: string, agentData: any) {
    localStorage.setItem('agentToken', token);
    localStorage.setItem('agentId', agentData._id);
    localStorage.setItem('agentData', JSON.stringify(agentData));
  },

  // Logout
  logout() {
    localStorage.removeItem('agentToken');
    localStorage.removeItem('agentId');
    localStorage.removeItem('agentData');
  },

  // Check if agent is authenticated
  isAuthenticated() {
    return !!getAuthToken();
  }
};

export const roomService = {
  // Create new room with media files
  async createRoom(roomData: any, images: File[], videos: File[]) {
    try {
      const formData = new FormData();
      
      // Add room data
      Object.keys(roomData).forEach(key => {
        if (key === 'amenities') {
          formData.append(key, JSON.stringify(roomData[key]));
        } else {
          formData.append(key, roomData[key]);
        }
      });

      // Add agent ID
      const agentId = localStorage.getItem('agentId');
      formData.append('agentId', agentId);

      // Add images
      images.forEach((image, index) => {
        formData.append(`images`, image);
      });

      // Add videos
      videos.forEach((video, index) => {
        formData.append(`videos`, video);
      });

      const token = getAuthToken();
      const response = await fetch(`${API_BASE_URL}/rooms`, {
        method: 'POST',
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: formData,
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

  // Get agent's rooms
  async getAgentRooms(agentId: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/rooms/agent/${agentId}`, {
        method: 'GET',
        headers: createAuthHeaders(),
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

  // Get all rooms with filters (public endpoint)
  async getRooms(filters?: {
    campus?: string;
    roomType?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
  }) {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            queryParams.append(key, value.toString());
          }
        });
      }

      const url = `${API_BASE_URL}/rooms${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
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

  // Get single room details
  async getRoomById(roomId: string) {
    try {
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

  // Update room
  async updateRoom(roomId: string, roomData: any, images?: File[], videos?: File[]) {
    try {
      const formData = new FormData();
      
      // Add room data
      Object.keys(roomData).forEach(key => {
        if (key === 'amenities') {
          formData.append(key, JSON.stringify(roomData[key]));
        } else {
          formData.append(key, roomData[key]);
        }
      });

      // Add new images if provided
      if (images && images.length > 0) {
        images.forEach((image) => {
          formData.append(`images`, image);
        });
      }

      // Add new videos if provided
      if (videos && videos.length > 0) {
        videos.forEach((video) => {
          formData.append(`videos`, video);
        });
      }

      const token = getAuthToken();
      const response = await fetch(`${API_BASE_URL}/rooms/${roomId}`, {
        method: 'PUT',
        headers: {
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

  // Delete room
  async deleteRoom(roomId: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/rooms/${roomId}`, {
        method: 'DELETE',
        headers: createAuthHeaders(),
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

// Room categories for better organization
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

