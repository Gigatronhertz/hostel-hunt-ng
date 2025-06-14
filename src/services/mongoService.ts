
/*
 * MongoDB Backend API Integration Service
 * 
 * This file contains API calls to your MongoDB backend.
 * Replace the placeholder URLs with your actual MongoDB API endpoints.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a Node.js/Express backend with MongoDB
 * 2. Install required packages: npm install mongodb express cors dotenv
 * 3. Set up MongoDB connection string in environment variables
 * 4. Create the following API endpoints in your backend:
 * 
 * Backend Structure Example:
 * 
 * // server.js
 * const express = require('express');
 * const { MongoClient } = require('mongodb');
 * const cors = require('cors');
 * require('dotenv').config();
 * 
 * const app = express();
 * app.use(cors());
 * app.use(express.json());
 * 
 * const uri = process.env.MONGODB_URI;
 * const client = new MongoClient(uri);
 * 
 * // Connect to MongoDB
 * async function connectDB() {
 *   await client.connect();
 *   console.log('Connected to MongoDB');
 * }
 * 
 * connectDB();
 * 
 * // Collections
 * const db = client.db('hostel_app');
 * const roomsCollection = db.collection('rooms');
 * const agentsCollection = db.collection('agents');
 * const bookingsCollection = db.collection('bookings');
 * 
 * // API Routes (see individual functions below for implementation)
 * 
 * app.listen(5000, () => {
 *   console.log('Server running on port 5000');
 * });
 */

const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Agent Authentication APIs
export const agentAuthService = {
  // POST /api/agents/login
  login: async (email: string, password: string) => {
    /*
     * Backend Implementation:
     * app.post('/api/agents/login', async (req, res) => {
     *   const { email, password } = req.body;
     *   const agent = await agentsCollection.findOne({ email });
     *   if (!agent || !bcrypt.compareSync(password, agent.password)) {
     *     return res.status(401).json({ error: 'Invalid credentials' });
     *   }
     *   const token = jwt.sign({ agentId: agent._id }, process.env.JWT_SECRET);
     *   res.json({ token, agent: { id: agent._id, name: agent.name, email: agent.email } });
     * });
     */
    const response = await fetch(`${API_BASE_URL}/agents/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return response.json();
  },

  // POST /api/agents/google-auth
  googleAuth: async (googleToken: string) => {
    /*
     * Backend Implementation:
     * app.post('/api/agents/google-auth', async (req, res) => {
     *   const { googleToken } = req.body;
     *   // Verify Google token with Google APIs
     *   const googleUser = await verifyGoogleToken(googleToken);
     *   let agent = await agentsCollection.findOne({ email: googleUser.email });
     *   if (!agent) {
     *     agent = await agentsCollection.insertOne({
     *       name: googleUser.name,
     *       email: googleUser.email,
     *       googleId: googleUser.sub,
     *       createdAt: new Date()
     *     });
     *   }
     *   const token = jwt.sign({ agentId: agent._id }, process.env.JWT_SECRET);
     *   res.json({ token, agent });
     * });
     */
    const response = await fetch(`${API_BASE_URL}/agents/google-auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ googleToken })
    });
    return response.json();
  },

  // POST /api/agents/register
  register: async (name: string, email: string, password: string, phone: string) => {
    /*
     * Backend Implementation:
     * app.post('/api/agents/register', async (req, res) => {
     *   const { name, email, password, phone } = req.body;
     *   const hashedPassword = bcrypt.hashSync(password, 10);
     *   const agent = await agentsCollection.insertOne({
     *     name, email, phone,
     *     password: hashedPassword,
     *     createdAt: new Date()
     *   });
     *   res.json({ message: 'Agent registered successfully', agentId: agent.insertedId });
     * });
     */
    const response = await fetch(`${API_BASE_URL}/agents/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, phone })
    });
    return response.json();
  }
};

// Room Management APIs
export const roomService = {
  // GET /api/rooms/agent/:agentId
  getAgentRooms: async (agentId: string, token: string) => {
    /*
     * Backend Implementation:
     * app.get('/api/rooms/agent/:agentId', authenticateToken, async (req, res) => {
     *   const { agentId } = req.params;
     *   const rooms = await roomsCollection.find({ agentId }).toArray();
     *   res.json(rooms);
     * });
     */
    const response = await fetch(`${API_BASE_URL}/rooms/agent/${agentId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  // POST /api/rooms
  createRoom: async (roomData: any, token: string) => {
    /*
     * Backend Implementation:
     * app.post('/api/rooms', authenticateToken, upload.fields([
     *   { name: 'images', maxCount: 10 },
     *   { name: 'videos', maxCount: 5 }
     * ]), async (req, res) => {
     *   const roomData = req.body;
     *   const images = req.files.images?.map(file => file.path) || [];
     *   const videos = req.files.videos?.map(file => file.path) || [];
     *   
     *   const room = await roomsCollection.insertOne({
     *     ...roomData,
     *     images,
     *     videos,
     *     agentId: req.user.agentId,
     *     createdAt: new Date(),
     *     views: 0,
     *     bookingRequests: 0
     *   });
     *   res.json({ message: 'Room created successfully', roomId: room.insertedId });
     * });
     */
    const formData = new FormData();
    
    // Add room data
    Object.keys(roomData).forEach(key => {
      if (key !== 'images' && key !== 'videos') {
        formData.append(key, roomData[key]);
      }
    });

    // Add image files
    roomData.images?.forEach((image: any, index: number) => {
      formData.append('images', image.file);
    });

    // Add video files
    roomData.videos?.forEach((video: any, index: number) => {
      formData.append('videos', video.file);
    });

    const response = await fetch(`${API_BASE_URL}/rooms`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });
    return response.json();
  },

  // PUT /api/rooms/:id
  updateRoom: async (roomId: string, roomData: any, token: string) => {
    /*
     * Backend Implementation:
     * app.put('/api/rooms/:id', authenticateToken, async (req, res) => {
     *   const { id } = req.params;
     *   const updateData = req.body;
     *   await roomsCollection.updateOne(
     *     { _id: new ObjectId(id), agentId: req.user.agentId },
     *     { $set: { ...updateData, updatedAt: new Date() } }
     *   );
     *   res.json({ message: 'Room updated successfully' });
     * });
     */
    const response = await fetch(`${API_BASE_URL}/rooms/${roomId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(roomData)
    });
    return response.json();
  },

  // DELETE /api/rooms/:id
  deleteRoom: async (roomId: string, token: string) => {
    /*
     * Backend Implementation:
     * app.delete('/api/rooms/:id', authenticateToken, async (req, res) => {
     *   const { id } = req.params;
     *   await roomsCollection.deleteOne({ 
     *     _id: new ObjectId(id), 
     *     agentId: req.user.agentId 
     *   });
     *   res.json({ message: 'Room deleted successfully' });
     * });
     */
    const response = await fetch(`${API_BASE_URL}/rooms/${roomId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  // GET /api/rooms (for public listing)
  getAllRooms: async (filters?: any) => {
    /*
     * Backend Implementation:
     * app.get('/api/rooms', async (req, res) => {
     *   const { campus, location, minPrice, maxPrice, roomType } = req.query;
     *   const filter = {};
     *   if (campus) filter.campus = campus;
     *   if (location) filter.location = { $regex: location, $options: 'i' };
     *   if (minPrice || maxPrice) {
     *     filter.yearlyPrice = {};
     *     if (minPrice) filter.yearlyPrice.$gte = parseInt(minPrice);
     *     if (maxPrice) filter.yearlyPrice.$lte = parseInt(maxPrice);
     *   }
     *   if (roomType) filter.roomType = roomType;
     *   
     *   const rooms = await roomsCollection.find(filter).toArray();
     *   res.json(rooms);
     * });
     */
    const queryParams = new URLSearchParams(filters);
    const response = await fetch(`${API_BASE_URL}/rooms?${queryParams}`);
    return response.json();
  },

  // GET /api/rooms/:id
  getRoomById: async (roomId: string) => {
    /*
     * Backend Implementation:
     * app.get('/api/rooms/:id', async (req, res) => {
     *   const { id } = req.params;
     *   const room = await roomsCollection.findOne({ _id: new ObjectId(id) });
     *   if (!room) {
     *     return res.status(404).json({ error: 'Room not found' });
     *   }
     *   // Increment view count
     *   await roomsCollection.updateOne(
     *     { _id: new ObjectId(id) },
     *     { $inc: { views: 1 } }
     *   );
     *   res.json(room);
     * });
     */
    const response = await fetch(`${API_BASE_URL}/rooms/${roomId}`);
    return response.json();
  }
};

// Booking Management APIs
export const bookingService = {
  // POST /api/bookings
  createBookingRequest: async (bookingData: any) => {
    /*
     * Backend Implementation:
     * app.post('/api/bookings', async (req, res) => {
     *   const bookingData = req.body;
     *   const booking = await bookingsCollection.insertOne({
     *     ...bookingData,
     *     status: 'pending',
     *     createdAt: new Date()
     *   });
     *   
     *   // Increment booking requests count for the room
     *   await roomsCollection.updateOne(
     *     { _id: new ObjectId(bookingData.roomId) },
     *     { $inc: { bookingRequests: 1 } }
     *   );
     *   
     *   res.json({ message: 'Booking request created', bookingId: booking.insertedId });
     * });
     */
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    return response.json();
  },

  // GET /api/bookings/agent/:agentId
  getAgentBookings: async (agentId: string, token: string) => {
    /*
     * Backend Implementation:
     * app.get('/api/bookings/agent/:agentId', authenticateToken, async (req, res) => {
     *   const { agentId } = req.params;
     *   const bookings = await bookingsCollection.aggregate([
     *     {
     *       $lookup: {
     *         from: 'rooms',
     *         localField: 'roomId',
     *         foreignField: '_id',
     *         as: 'room'
     *       }
     *     },
     *     {
     *       $match: { 'room.agentId': agentId }
     *     }
     *   ]).toArray();
     *   res.json(bookings);
     * });
     */
    const response = await fetch(`${API_BASE_URL}/bookings/agent/${agentId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  }
};

/*
 * MONGODB SCHEMA DEFINITIONS:
 * 
 * Agents Collection:
 * {
 *   _id: ObjectId,
 *   name: String,
 *   email: String (unique),
 *   password: String (hashed),
 *   phone: String,
 *   googleId: String (optional),
 *   createdAt: Date,
 *   updatedAt: Date
 * }
 * 
 * Rooms Collection:
 * {
 *   _id: ObjectId,
 *   name: String,
 *   campus: String,
 *   location: String,
 *   yearlyPrice: Number,
 *   roomType: String,
 *   bedCount: Number,
 *   bathrooms: Number,
 *   description: String,
 *   amenities: [String],
 *   images: [String], // URLs to uploaded images
 *   videos: [String], // URLs to uploaded videos
 *   agentId: String,
 *   views: Number,
 *   bookingRequests: Number,
 *   createdAt: Date,
 *   updatedAt: Date
 * }
 * 
 * Bookings Collection:
 * {
 *   _id: ObjectId,
 *   roomId: ObjectId,
 *   studentName: String,
 *   studentEmail: String,
 *   studentPhone: String,
 *   message: String,
 *   status: String, // 'pending', 'approved', 'rejected'
 *   createdAt: Date,
 *   updatedAt: Date
 * }
 * 
 * INDEXES TO CREATE:
 * db.agents.createIndex({ email: 1 }, { unique: true })
 * db.rooms.createIndex({ agentId: 1 })
 * db.rooms.createIndex({ campus: 1 })
 * db.rooms.createIndex({ yearlyPrice: 1 })
 * db.bookings.createIndex({ roomId: 1 })
 */
