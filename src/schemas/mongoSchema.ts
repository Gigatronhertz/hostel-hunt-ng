
// MongoDB Schema Definitions for Hostel.ng Platform
// This file contains TypeScript interfaces that match the MongoDB collections

// =============================================================================
// USER AUTHENTICATION COLLECTIONS
// =============================================================================

/**
 * Agents Collection - Stores agent/landlord information
 * Collection: "agents"
 */
export interface Agent {
  _id: string; // MongoDB ObjectId
  email: string;
  name: string;
  phone: string;
  avatar?: string; // URL to profile image
  isVerified: boolean;
  verificationDocuments?: {
    idCard?: string; // URL to ID document
    proofOfOwnership?: string; // URL to property ownership document
  };
  googleId?: string; // For Google OAuth
  createdAt: Date;
  updatedAt: Date;
  // Business information
  businessName?: string;
  businessAddress?: string;
  // Statistics
  totalRooms: number;
  totalViews: number;
  totalBookings: number;
  rating: number; // Average rating from students
  reviewCount: number;
}

/**
 * Students Collection - Stores student user information
 * Collection: "students"
 */
export interface Student {
  _id: string;
  email: string;
  name: string;
  phone: string;
  avatar?: string;
  university: string;
  studentId?: string;
  yearOfStudy?: number;
  course?: string;
  isVerified: boolean;
  googleId?: string;
  createdAt: Date;
  updatedAt: Date;
  // Preferences
  preferences: {
    maxBudget?: number;
    preferredLocations: string[];
    preferredAmenities: string[];
    roomType?: string;
  };
}

// =============================================================================
// ROOM/PROPERTY COLLECTIONS
// =============================================================================

/**
 * Rooms Collection - Main room listings
 * Collection: "rooms"
 */
export interface Room {
  _id: string;
  agentId: string; // Reference to Agent._id
  
  // Basic Information
  name: string;
  description: string;
  campus: string;
  location: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  
  // Room Details
  roomType: 'Single Room' | 'One Bedroom' | 'Two Bedroom' | 'Three Bedroom' | 'Shared Apartment';
  bedCount: number;
  bathrooms: number;
  maxOccupancy: number;
  
  // Pricing
  yearlyPrice: number;
  monthlyPrice?: number;
  securityDeposit?: number;
  agentFee?: number;
  
  // Media
  images: MediaFile[];
  videos: MediaFile[];
  virtualTourUrl?: string;
  
  // Amenities
  amenities: string[]; // Array of amenity IDs
  
  // Availability
  isAvailable: boolean;
  availableFrom: Date;
  availableUntil?: Date;
  
  // Statistics
  views: number;
  bookingRequests: number;
  favorites: number;
  
  // Status
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  featuredUntil?: Date; // For premium listings
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  lastUpdated: Date;
  
  // SEO
  slug: string; // URL-friendly identifier
  tags: string[]; // For search optimization
}

/**
 * Media Files - For room images and videos
 * Embedded in Room documents or separate collection
 */
export interface MediaFile {
  id: string;
  type: 'image' | 'video';
  url: string; // URL to file in cloud storage (e.g., Cloudinary, AWS S3)
  thumbnailUrl?: string; // For videos
  name: string;
  size: number;
  format: string; // jpg, png, mp4, etc.
  uploadedAt: Date;
  alt?: string; // Alt text for accessibility
  caption?: string;
  order: number; // Display order
}

// =============================================================================
// BOOKING SYSTEM COLLECTIONS
// =============================================================================

/**
 * Booking Requests Collection
 * Collection: "bookingRequests"
 */
export interface BookingRequest {
  _id: string;
  roomId: string; // Reference to Room._id
  studentId: string; // Reference to Student._id
  agentId: string; // Reference to Agent._id
  
  // Request Details
  requestedMoveInDate: Date;
  requestedMoveOutDate?: Date;
  numberOfOccupants: number;
  
  // Status
  status: 'pending' | 'approved' | 'rejected' | 'cancelled' | 'expired';
  
  // Communication
  studentMessage?: string;
  agentResponse?: string;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  respondedAt?: Date;
  expiresAt: Date; // Auto-expire after certain time
}

/**
 * Bookings Collection - Confirmed bookings
 * Collection: "bookings"
 */
export interface Booking {
  _id: string;
  roomId: string;
  studentId: string;
  agentId: string;
  bookingRequestId: string; // Reference to original request
  
  // Booking Details
  moveInDate: Date;
  moveOutDate: Date;
  numberOfOccupants: number;
  
  // Financial
  totalAmount: number;
  securityDeposit: number;
  agentFee: number;
  paymentStatus: 'pending' | 'partial' | 'paid' | 'overdue';
  
  // Contract
  contractUrl?: string; // URL to signed contract
  contractSignedAt?: Date;
  
  // Status
  status: 'active' | 'completed' | 'cancelled' | 'terminated';
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

// =============================================================================
// REVIEW SYSTEM COLLECTIONS
// =============================================================================

/**
 * Reviews Collection
 * Collection: "reviews"
 */
export interface Review {
  _id: string;
  roomId: string;
  studentId: string;
  agentId: string;
  bookingId: string; // Only verified bookings can leave reviews
  
  // Review Content
  rating: number; // 1-5 stars
  title: string;
  content: string;
  
  // Detailed Ratings
  ratings: {
    cleanliness: number;
    location: number;
    amenities: number;
    value: number;
    communication: number;
  };
  
  // Media
  images?: string[]; // URLs to review images
  
  // Verification
  isVerified: boolean; // Based on actual booking
  
  // Agent Response
  agentResponse?: {
    content: string;
    respondedAt: Date;
  };
  
  // Moderation
  isApproved: boolean;
  moderatedAt?: Date;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

// =============================================================================
// FAVORITES SYSTEM
// =============================================================================

/**
 * Favorites Collection
 * Collection: "favorites"
 */
export interface Favorite {
  _id: string;
  studentId: string;
  roomId: string;
  createdAt: Date;
}

// =============================================================================
// ANALYTICS COLLECTIONS
// =============================================================================

/**
 * Room Views Collection - For analytics
 * Collection: "roomViews"
 */
export interface RoomView {
  _id: string;
  roomId: string;
  studentId?: string; // Optional for anonymous views
  ipAddress: string;
  userAgent: string;
  referrer?: string;
  sessionId: string;
  viewedAt: Date;
  timeSpent?: number; // Seconds
}

/**
 * Search Analytics Collection
 * Collection: "searchAnalytics"
 */
export interface SearchAnalytics {
  _id: string;
  query: string;
  filters: {
    campus?: string;
    location?: string;
    priceRange?: { min: number; max: number; };
    roomType?: string;
    amenities?: string[];
  };
  resultsCount: number;
  studentId?: string;
  ipAddress: string;
  searchedAt: Date;
}

// =============================================================================
// NOTIFICATION SYSTEM
// =============================================================================

/**
 * Notifications Collection
 * Collection: "notifications"
 */
export interface Notification {
  _id: string;
  userId: string; // Can be student or agent
  userType: 'student' | 'agent';
  
  // Notification Content
  type: 'booking_request' | 'booking_approved' | 'booking_rejected' | 'payment_due' | 'review_received' | 'message_received';
  title: string;
  content: string;
  
  // Related Data
  relatedId?: string; // ID of related booking, review, etc.
  
  // Status
  isRead: boolean;
  isArchived: boolean;
  
  // Metadata
  createdAt: Date;
  readAt?: Date;
}

// =============================================================================
// MESSAGING SYSTEM
// =============================================================================

/**
 * Conversations Collection
 * Collection: "conversations"
 */
export interface Conversation {
  _id: string;
  participants: {
    studentId: string;
    agentId: string;
  };
  roomId?: string; // Optional room context
  
  // Status
  isActive: boolean;
  
  // Last Message Info
  lastMessage: {
    content: string;
    senderId: string;
    senderType: 'student' | 'agent';
    sentAt: Date;
  };
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Messages Collection
 * Collection: "messages"
 */
export interface Message {
  _id: string;
  conversationId: string;
  senderId: string;
  senderType: 'student' | 'agent';
  
  // Message Content
  content: string;
  type: 'text' | 'image' | 'file';
  attachments?: {
    url: string;
    name: string;
    type: string;
    size: number;
  }[];
  
  // Status
  isRead: boolean;
  readAt?: Date;
  
  // Metadata
  sentAt: Date;
  editedAt?: Date;
  deletedAt?: Date;
}

// =============================================================================
// SYSTEM COLLECTIONS
// =============================================================================

/**
 * Universities Collection - Reference data
 * Collection: "universities"
 */
export interface University {
  _id: string;
  name: string;
  shortName: string;
  location: {
    city: string;
    state: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  isActive: boolean;
  createdAt: Date;
}

/**
 * Amenities Collection - Reference data
 * Collection: "amenities"
 */
export interface Amenity {
  _id: string;
  id: string; // Unique identifier used in code
  name: string;
  description?: string;
  icon: string; // Icon name or URL
  category: 'basic' | 'utilities' | 'security' | 'entertainment' | 'convenience';
  isActive: boolean;
  order: number; // Display order
}

// =============================================================================
// MONGODB INDEXES FOR OPTIMIZATION
// =============================================================================

/**
 * Recommended MongoDB Indexes:
 * 
 * Agents Collection:
 * - { email: 1 } (unique)
 * - { googleId: 1 } (sparse)
 * - { isVerified: 1 }
 * 
 * Students Collection:
 * - { email: 1 } (unique)
 * - { googleId: 1 } (sparse)
 * - { university: 1 }
 * 
 * Rooms Collection:
 * - { agentId: 1 }
 * - { campus: 1, isAvailable: 1 }
 * - { location: 1, isAvailable: 1 }
 * - { yearlyPrice: 1, isAvailable: 1 }
 * - { roomType: 1, isAvailable: 1 }
 * - { amenities: 1, isAvailable: 1 }
 * - { status: 1, isAvailable: 1 }
 * - { createdAt: -1 }
 * - { slug: 1 } (unique)
 * - { "address.coordinates": "2dsphere" } (for geospatial queries)
 * 
 * BookingRequests Collection:
 * - { studentId: 1, createdAt: -1 }
 * - { agentId: 1, createdAt: -1 }
 * - { roomId: 1, createdAt: -1 }
 * - { status: 1, createdAt: -1 }
 * - { expiresAt: 1 } (TTL index)
 * 
 * Bookings Collection:
 * - { studentId: 1 }
 * - { agentId: 1 }
 * - { roomId: 1 }
 * - { status: 1 }
 * 
 * Reviews Collection:
 * - { roomId: 1, isApproved: 1 }
 * - { agentId: 1, isApproved: 1 }
 * - { studentId: 1 }
 * - { isVerified: 1, isApproved: 1 }
 * 
 * Favorites Collection:
 * - { studentId: 1, createdAt: -1 }
 * - { roomId: 1 }
 * - { studentId: 1, roomId: 1 } (unique compound)
 * 
 * RoomViews Collection:
 * - { roomId: 1, viewedAt: -1 }
 * - { studentId: 1, viewedAt: -1 }
 * - { viewedAt: -1 } (for cleanup)
 * 
 * Notifications Collection:
 * - { userId: 1, userType: 1, createdAt: -1 }
 * - { userId: 1, isRead: 1, createdAt: -1 }
 * 
 * Conversations Collection:
 * - { "participants.studentId": 1, "participants.agentId": 1 } (unique compound)
 * - { updatedAt: -1 }
 * 
 * Messages Collection:
 * - { conversationId: 1, sentAt: -1 }
 * - { senderId: 1, sentAt: -1 }
 */
