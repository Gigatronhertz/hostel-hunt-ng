import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Shield,
  Home,
  Upload,
  Search,
  Database,
  FileCode,
  BookOpen
} from "lucide-react";

const Documentation = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-primary">Hostel.ng API Documentation</h1>
              <p className="text-muted-foreground">Complete API reference for the Render backend</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
            <TabsTrigger value="rooms">Room APIs</TabsTrigger>
            <TabsTrigger value="models">Data Models</TabsTrigger>
            <TabsTrigger value="files">File Upload</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  API Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg">
                  The Hostel.ng API provides endpoints for agent authentication, room management, and file uploads.
                  All endpoints are hosted on Render at: <code className="bg-muted px-2 py-1 rounded">https://hostelng.onrender.com</code>
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Base URL:</h3>
                    <code className="bg-muted px-3 py-2 rounded block">https://hostelng.onrender.com/api</code>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Authentication:</h3>
                    <p className="text-sm">JWT tokens via Authorization header</p>
                    <code className="bg-muted px-3 py-1 rounded text-xs">Authorization: Bearer &lt;token&gt;</code>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">API Categories</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-500 mt-1" />
                      <div>
                        <h4 className="font-medium">Authentication</h4>
                        <p className="text-sm text-muted-foreground">Agent registration, login, and Google OAuth</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Home className="w-5 h-5 text-green-500 mt-1" />
                      <div>
                        <h4 className="font-medium">Room Management</h4>
                        <p className="text-sm text-muted-foreground">CRUD operations for room listings</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Upload className="w-5 h-5 text-purple-500 mt-1" />
                      <div>
                        <h4 className="font-medium">File Upload</h4>
                        <p className="text-sm text-muted-foreground">Images and videos with validation</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Room Categories</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="border p-3 rounded">
                      <h4 className="font-medium text-blue-600">Budget</h4>
                      <p className="text-sm text-muted-foreground">₦200,000 - ₦500,000/year</p>
                      <div className="text-xs mt-2">
                        <Badge variant="outline" className="mr-1">Single Room</Badge>
                        <Badge variant="outline">Shared Apartment</Badge>
                      </div>
                    </div>
                    
                    <div className="border p-3 rounded">
                      <h4 className="font-medium text-green-600">Standard</h4>
                      <p className="text-sm text-muted-foreground">₦500,000 - ₦800,000/year</p>
                      <div className="text-xs mt-2">
                        <Badge variant="outline" className="mr-1">One Bedroom</Badge>
                        <Badge variant="outline">Two Bedroom</Badge>
                      </div>
                    </div>
                    
                    <div className="border p-3 rounded">
                      <h4 className="font-medium text-purple-600">Premium</h4>
                      <p className="text-sm text-muted-foreground">₦800,000 - ₦1,500,000/year</p>
                      <div className="text-xs mt-2">
                        <Badge variant="outline" className="mr-1">Two Bedroom</Badge>
                        <Badge variant="outline">Three Bedroom</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AUTHENTICATION TAB */}
          <TabsContent value="authentication" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Authentication APIs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">POST /api/agents/register</h3>
                  <p className="text-sm text-muted-foreground mb-3">Register a new agent account</p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Request Body:</h4>
                      <div className="bg-muted p-3 rounded text-sm">
                        <pre>{`{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone": "+2348012345678"
}`}</pre>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Success Response (201):</h4>
                      <div className="bg-muted p-3 rounded text-sm">
                        <pre>{`{
  "success": true,
  "message": "Agent registered successfully",
  "agent": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+2348012345678",
    "isVerified": false
  }
}`}</pre>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">POST /api/agents/login</h3>
                  <p className="text-sm text-muted-foreground mb-3">Login agent and receive JWT token</p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Request Body:</h4>
                      <div className="bg-muted p-3 rounded text-sm">
                        <pre>{`{
  "email": "john@example.com",
  "password": "securePassword123"
}`}</pre>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Success Response (200):</h4>
                      <div className="bg-muted p-3 rounded text-sm">
                        <pre>{`{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "agent": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+2348012345678",
    "isVerified": false
  }
}`}</pre>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">GET /api/agents/profile</h3>
                  <p className="text-sm text-muted-foreground mb-3">Get authenticated agent's profile</p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Headers Required:</h4>
                      <div className="bg-muted p-3 rounded text-sm">
                        <pre>{`Authorization: Bearer <token>
Content-Type: application/json`}</pre>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Success Response (200):</h4>
                      <div className="bg-muted p-3 rounded text-sm">
                        <pre>{`{
  "success": true,
  "agent": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+2348012345678",
    "isVerified": false,
    "totalRooms": 5,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}`}</pre>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Google OAuth Flow</h3>
                  <p className="text-sm text-muted-foreground mb-3">Redirect-based Google authentication</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">1. Initiate OAuth:</h4>
                      <div className="bg-muted p-3 rounded text-sm">
                        <pre>GET https://hostelng.onrender.com/auth/google</pre>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Redirects user to Google consent screen</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">2. Callback URL:</h4>
                      <div className="bg-muted p-3 rounded text-sm">
                        <pre>GET /auth/google/callback?token=jwt_token&agentData=encoded_data</pre>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Frontend should handle this callback route</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ROOMS TAB */}
          <TabsContent value="rooms" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Room Management APIs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">POST /api/rooms</h3>
                  <p className="text-sm text-muted-foreground mb-3">Create a new room listing with media files</p>
                  
                  <div>
                    <h4 className="font-medium mb-2">FormData Structure:</h4>
                    <div className="bg-muted p-3 rounded text-sm">
                      <pre>{`// Room Data
name: "Comfortable 2-Bedroom Apartment"
description: "Modern apartment near university..."
campus: "University of Lagos"
location: "Akoka, Lagos"
yearlyPrice: 800000
roomType: "Two Bedroom"
category: "Standard"
isAvailable: true
amenities: JSON.stringify(["WiFi", "Kitchen", "Security"])
agentId: "507f1f77bcf86cd799439011"

// Files
images: [File1, File2, File3] // Multiple image files
videos: [File1] // Video files (optional)`}</pre>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Success Response (201):</h4>
                    <div className="bg-muted p-3 rounded text-sm">
                      <pre>{`{
  "success": true,
  "room": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Comfortable 2-Bedroom Apartment",
    "campus": "University of Lagos",
    "yearlyPrice": 800000,
    "images": [
      "https://cloudinary.com/image1.jpg",
      "https://cloudinary.com/image2.jpg"
    ],
    "videos": ["https://cloudinary.com/video1.mp4"],
    "agentId": "507f1f77bcf86cd799439011"
  }
}`}</pre>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">GET /api/rooms/agent/:agentId</h3>
                  <p className="text-sm text-muted-foreground mb-3">Get all rooms for a specific agent</p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Headers Required:</h4>
                      <div className="bg-muted p-3 rounded text-sm">
                        <pre>Authorization: Bearer &lt;token&gt;</pre>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Success Response (200):</h4>
                      <div className="bg-muted p-3 rounded text-sm">
                        <pre>{`{
  "success": true,
  "rooms": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "2-Bedroom Apartment",
      "campus": "University of Lagos",
      "yearlyPrice": 800000,
      "isAvailable": true,
      "images": ["url1", "url2"],
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 1
}`}</pre>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">GET /api/rooms</h3>
                  <p className="text-sm text-muted-foreground mb-3">Get all rooms with optional filtering (public endpoint)</p>
                  
                  <div>
                    <h4 className="font-medium mb-2">Query Parameters:</h4>
                    <div className="bg-muted p-3 rounded text-sm">
                      <pre>{`?campus=University%20of%20Lagos
&roomType=Two%20Bedroom
&category=Standard
&minPrice=500000
&maxPrice=1000000
&search=modern%20apartment
&page=1
&limit=10`}</pre>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Success Response (200):</h4>
                    <div className="bg-muted p-3 rounded text-sm">
                      <pre>{`{
  "success": true,
  "rooms": [...],
  "total": 25,
  "page": 1,
  "totalPages": 3
}`}</pre>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">PUT /api/rooms/:roomId</h3>
                  <p className="text-sm text-muted-foreground mb-3">Update an existing room</p>
                  
                  <div>
                    <h4 className="font-medium mb-2">FormData Structure (same as POST):</h4>
                    <div className="bg-muted p-3 rounded text-sm">
                      <pre>{`// Updated room data + optional new files
name: "Updated Room Name"
yearlyPrice: 850000
// ... other fields
images: [NewFile1, NewFile2] // Optional new images
videos: [NewVideo] // Optional new videos`}</pre>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">DELETE /api/rooms/:roomId</h3>
                  <p className="text-sm text-muted-foreground mb-3">Delete a room listing</p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Headers Required:</h4>
                      <div className="bg-muted p-3 rounded text-sm">
                        <pre>Authorization: Bearer &lt;token&gt;</pre>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Success Response (200):</h4>
                      <div className="bg-muted p-3 rounded text-sm">
                        <pre>{`{
  "success": true,
  "message": "Room deleted successfully"
}`}</pre>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* MODELS TAB */}
          <TabsContent value="models" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Data Models
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Agent Model</h3>
                  <div className="bg-muted p-4 rounded text-sm">
                    <pre>{`{
  "_id": "ObjectId",
  "name": "string",
  "email": "string (unique)",
  "password": "string (hashed)",
  "phone": "string",
  "isVerified": "boolean",
  "googleId": "string (optional)",
  "businessInfo": {
    "businessName": "string",
    "address": "string",
    "registrationNumber": "string"
  },
  "createdAt": "Date",
  "updatedAt": "Date"
}`}</pre>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Room Model</h3>
                  <div className="bg-muted p-4 rounded text-sm">
                    <pre>{`{
  "_id": "ObjectId",
  "agentId": "ObjectId (ref: agents)",
  "name": "string",
  "description": "string",
  "campus": "string",
  "location": "string",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "coordinates": {
      "lat": "number",
      "lng": "number"
    }
  },
  "yearlyPrice": "number",
  "monthlyPrice": "number", // calculated
  "roomType": "enum [Single Room, One Bedroom, Two Bedroom, Three Bedroom, Shared Apartment]",
  "category": "enum [Budget, Standard, Premium]",
  "amenities": ["string"],
  "images": ["string"], // URLs
  "videos": ["string"], // URLs
  "isAvailable": "boolean",
  "views": "number",
  "createdAt": "Date",
  "updatedAt": "Date"
}`}</pre>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Available Amenities</h3>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium mb-2">Basic Amenities:</h4>
                      <ul className="space-y-1">
                        <li>• WiFi</li>
                        <li>• Kitchen</li>
                        <li>• Bathroom</li>
                        <li>• Furniture</li>
                        <li>• Air Conditioning</li>
                        <li>• Water Supply</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Security & Safety:</h4>
                      <ul className="space-y-1">
                        <li>• Security</li>
                        <li>• CCTV</li>
                        <li>• Gated Compound</li>
                        <li>• Fire Safety</li>
                        <li>• Emergency Exit</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Additional Services:</h4>
                      <ul className="space-y-1">
                        <li>• Laundry</li>
                        <li>• Cleaning Service</li>
                        <li>• Parking</li>
                        <li>• Generator</li>
                        <li>• Study Area</li>
                        <li>• Recreation Area</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Error Response Format</h3>
                  <div className="bg-muted p-4 rounded text-sm">
                    <pre>{`{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE", // Optional
  "details": {} // Optional additional details
}`}</pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FILES TAB */}
          <TabsContent value="files" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  File Upload Specifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Image Upload Requirements</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Supported Formats:</h4>
                      <div className="text-sm space-y-1">
                        <p>• JPEG (.jpg, .jpeg)</p>
                        <p>• PNG (.png)</p>
                        <p>• WebP (.webp)</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Size Limits:</h4>
                      <div className="text-sm space-y-1">
                        <p>• Maximum: 5MB per image</p>
                        <p>• Minimum: 100KB</p>
                        <p>• Maximum per room: 10 images</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Video Upload Requirements</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Supported Formats:</h4>
                      <div className="text-sm space-y-1">
                        <p>• MP4 (.mp4)</p>
                        <p>• WebM (.webm)</p>
                        <p>• MOV (.mov)</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Size Limits:</h4>
                      <div className="text-sm space-y-1">
                        <p>• Maximum: 50MB per video</p>
                        <p>• Maximum duration: 2 minutes</p>
                        <p>• Maximum per room: 3 videos</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">FormData Structure for File Upload</h3>
                  <div className="bg-muted p-4 rounded text-sm">
                    <pre>{`const formData = new FormData();

// Room data
formData.append('name', 'Room Name');
formData.append('campus', 'University of Lagos');
formData.append('yearlyPrice', '800000');
formData.append('amenities', JSON.stringify(['WiFi', 'Kitchen']));
formData.append('agentId', agentId);

// Image files
imageFiles.forEach((file, index) => {
  formData.append('images', file);
});

// Video files
videoFiles.forEach((file, index) => {
  formData.append('videos', file);
});

// Send to API
fetch('/api/rooms', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token
  },
  body: formData
});`}</pre>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">File Validation Response</h3>
                  <div className="bg-muted p-4 rounded text-sm">
                    <pre>{`// Success
{
  "success": true,
  "uploadedFiles": {
    "images": [
      "https://cloudinary.com/image1.jpg",
      "https://cloudinary.com/image2.jpg"
    ],
    "videos": [
      "https://cloudinary.com/video1.mp4"
    ]
  }
}

// Validation Error
{
  "success": false,
  "error": "File validation failed",
  "details": {
    "invalidFiles": [
      {
        "filename": "large-image.jpg",
        "error": "File size exceeds 5MB limit"
      }
    ]
  }
}`}</pre>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Media Storage Integration</h3>
                  <div className="text-sm space-y-2">
                    <p><strong>Recommended:</strong> Use Cloudinary for media storage and processing</p>
                    <p><strong>Alternative:</strong> AWS S3 with CloudFront CDN</p>
                    <p><strong>Processing:</strong> Automatic image optimization and video thumbnail generation</p>
                    <p><strong>URLs:</strong> Return CDN URLs for fast loading</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Documentation;
