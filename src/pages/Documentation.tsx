
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Database, 
  FileCode, 
  Layers, 
  Settings, 
  Users, 
  Home,
  Upload,
  Search,
  MessageSquare,
  Star,
  Shield,
  Smartphone,
  Globe,
  Code,
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
              <h1 className="text-3xl font-bold text-primary">Hostel.ng Documentation</h1>
              <p className="text-muted-foreground">Complete guide to the hostel booking platform</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-8 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
            <TabsTrigger value="database">Database</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="api">API Integration</TabsTrigger>
            <TabsTrigger value="deployment">Deployment</TabsTrigger>
            <TabsTrigger value="development">Development</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Project Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg">
                  <strong>Hostel.ng</strong> is a comprehensive student accommodation booking platform 
                  built with modern web technologies. It connects students with verified agents/landlords 
                  offering quality accommodation near Nigerian universities.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">For Students:</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Browse and search accommodation listings</li>
                      <li>• Filter by location, price, amenities</li>
                      <li>• View detailed room information with media</li>
                      <li>• Submit booking requests</li>
                      <li>• Save favorites and track applications</li>
                      <li>• Leave reviews and ratings</li>
                      <li>• Real-time messaging with agents</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">For Agents/Landlords:</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Create and manage room listings</li>
                      <li>• Upload images and videos</li>
                      <li>• Set pricing and availability</li>
                      <li>• Manage booking requests</li>
                      <li>• Track performance analytics</li>
                      <li>• Communicate with potential tenants</li>
                      <li>• Manage reviews and responses</li>
                    </ul>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Technology Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">React 18</Badge>
                    <Badge variant="outline">TypeScript</Badge>
                    <Badge variant="outline">Vite</Badge>
                    <Badge variant="outline">Tailwind CSS</Badge>
                    <Badge variant="outline">Shadcn/ui</Badge>
                    <Badge variant="outline">React Router</Badge>
                    <Badge variant="outline">React Query</Badge>
                    <Badge variant="outline">MongoDB</Badge>
                    <Badge variant="outline">Node.js</Badge>
                    <Badge variant="outline">Express</Badge>
                    <Badge variant="outline">Cloudinary</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3">
                    <Search className="w-5 h-5 text-blue-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Smart Search</h4>
                      <p className="text-sm text-muted-foreground">Advanced filtering by location, price, amenities, and room type</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Upload className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Media Upload</h4>
                      <p className="text-sm text-muted-foreground">High-quality image and video uploads with validation</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-purple-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Real-time Chat</h4>
                      <p className="text-sm text-muted-foreground">Direct communication between students and agents</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-yellow-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Review System</h4>
                      <p className="text-sm text-muted-foreground">Verified reviews and ratings from actual tenants</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-red-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Verification</h4>
                      <p className="text-sm text-muted-foreground">Agent verification and secure authentication</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Smartphone className="w-5 h-5 text-indigo-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Mobile Responsive</h4>
                      <p className="text-sm text-muted-foreground">Fully responsive design for all devices</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ARCHITECTURE TAB */}
          <TabsContent value="architecture" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  System Architecture
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Frontend Architecture</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm">{`
src/
├── components/           # Reusable UI components
│   ├── ui/              # Shadcn/ui components
│   ├── dashboard/       # Agent dashboard components
│   ├── media/           # Media upload components
│   └── AmenitiesSelector.tsx
├── pages/               # Route components
│   ├── Index.tsx        # Home page
│   ├── Hostels.tsx      # Search/browse page
│   ├── HostelDetail.tsx # Room details
│   ├── AgentLogin.tsx   # Agent authentication
│   ├── AgentDashboard.tsx # Agent management
│   └── Documentation.tsx # This page
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
├── hooks/               # Custom React hooks
├── services/            # API services
├── schemas/             # MongoDB schemas
└── lib/                 # Configuration and utilities
                    `}</pre>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Component Hierarchy</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>App.tsx</strong> - Main application with routing</p>
                    <p><strong>Pages</strong> - Route-level components</p>
                    <p><strong>Components</strong> - Reusable UI components</p>
                    <p><strong>Hooks</strong> - Custom React hooks for state management</p>
                    <p><strong>Services</strong> - API integration and external services</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">State Management</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">React Query</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Server state management</li>
                        <li>• Caching and synchronization</li>
                        <li>• Optimistic updates</li>
                        <li>• Background refetching</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">React State</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Component-level state</li>
                        <li>• Form state management</li>
                        <li>• UI state (modals, dropdowns)</li>
                        <li>• Local storage integration</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* DATABASE TAB */}
          <TabsContent value="database" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  MongoDB Database Schema
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Core Collections</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="border p-3 rounded">
                        <h4 className="font-medium text-blue-600">agents</h4>
                        <p className="text-sm text-muted-foreground">Agent/landlord profiles and verification</p>
                        <div className="text-xs mt-2">
                          <code>_id, email, name, phone, isVerified, businessInfo</code>
                        </div>
                      </div>
                      
                      <div className="border p-3 rounded">
                        <h4 className="font-medium text-green-600">students</h4>
                        <p className="text-sm text-muted-foreground">Student user accounts and preferences</p>
                        <div className="text-xs mt-2">
                          <code>_id, email, name, university, preferences</code>
                        </div>
                      </div>
                      
                      <div className="border p-3 rounded">
                        <h4 className="font-medium text-purple-600">rooms</h4>
                        <p className="text-sm text-muted-foreground">Room listings and details</p>
                        <div className="text-xs mt-2">
                          <code>_id, agentId, name, campus, location, pricing, amenities</code>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="border p-3 rounded">
                        <h4 className="font-medium text-orange-600">bookingRequests</h4>
                        <p className="text-sm text-muted-foreground">Student booking requests</p>
                        <div className="text-xs mt-2">
                          <code>_id, roomId, studentId, status, dates</code>
                        </div>
                      </div>
                      
                      <div className="border p-3 rounded">
                        <h4 className="font-medium text-red-600">reviews</h4>
                        <p className="text-sm text-muted-foreground">Room reviews and ratings</p>
                        <div className="text-xs mt-2">
                          <code>_id, roomId, studentId, rating, content</code>
                        </div>
                      </div>
                      
                      <div className="border p-3 rounded">
                        <h4 className="font-medium text-indigo-600">favorites</h4>
                        <p className="text-sm text-muted-foreground">Student saved rooms</p>
                        <div className="text-xs mt-2">
                          <code>_id, studentId, roomId, createdAt</code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Key Relationships</h3>
                  <div className="bg-muted p-4 rounded-lg text-sm">
                    <pre>{`
Agent (1) -> Rooms (Many)
- agentId references agents._id

Room (1) -> BookingRequests (Many)
- roomId references rooms._id

Student (1) -> BookingRequests (Many)
- studentId references students._id

Room (1) -> Reviews (Many)
- roomId references rooms._id

Student (1) -> Favorites (Many)
- studentId references students._id
                    `}</pre>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Indexing Strategy</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium mb-2">Search Optimization</h4>
                      <ul className="space-y-1">
                        <li>• campus + isAvailable</li>
                        <li>• location + isAvailable</li>
                        <li>• yearlyPrice + isAvailable</li>
                        <li>• amenities + isAvailable</li>
                        <li>• address.coordinates (2dsphere)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Performance Indexes</h4>
                      <ul className="space-y-1">
                        <li>• agentId for dashboard queries</li>
                        <li>• studentId for user data</li>
                        <li>• createdAt for chronological sorting</li>
                        <li>• status for filtering</li>
                        <li>• email (unique) for authentication</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* COMPONENTS TAB */}
          <TabsContent value="components" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCode className="w-5 h-5" />
                  Component Structure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Core Components</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-medium">MediaUpload System</h4>
                      <p className="text-sm text-muted-foreground mb-2">Complete media handling with validation and preview</p>
                      <div className="text-xs bg-muted p-2 rounded">
                        <p><strong>MediaUpload.tsx</strong> - Main orchestrator component</p>
                        <p><strong>FileUploadZone.tsx</strong> - Drag & drop upload area</p>
                        <p><strong>MediaPreview.tsx</strong> - Individual media preview</p>
                        <p><strong>MediaGrid.tsx</strong> - Grid layout for media files</p>
                        <p><strong>fileValidation.ts</strong> - File type and size validation</p>
                      </div>
                    </div>

                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-medium">Dashboard Components</h4>
                      <p className="text-sm text-muted-foreground mb-2">Agent dashboard for room management</p>
                      <div className="text-xs bg-muted p-2 rounded">
                        <p><strong>DashboardStats.tsx</strong> - Key metrics display</p>
                        <p><strong>RoomCard.tsx</strong> - Individual room listing card</p>
                        <p><strong>RoomForm.tsx</strong> - Room creation and editing form</p>
                      </div>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-medium">UI Components</h4>
                      <p className="text-sm text-muted-foreground mb-2">Shadcn/ui based components</p>
                      <div className="text-xs bg-muted p-2 rounded">
                        <p><strong>Button, Card, Input, Select</strong> - Basic UI elements</p>
                        <p><strong>Tabs, Dialog, Toast</strong> - Interactive components</p>
                        <p><strong>Badge, Avatar, Separator</strong> - Display components</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Component Patterns</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Composition Pattern</h4>
                      <div className="text-sm bg-muted p-3 rounded">
                        <pre>{`
// MediaUpload orchestrates smaller components
<MediaUpload>
  <FileUploadZone />
  <MediaGrid>
    <MediaPreview />
  </MediaGrid>
</MediaUpload>
                        `}</pre>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Props Interface</h4>
                      <div className="text-sm bg-muted p-3 rounded">
                        <pre>{`
interface MediaUploadProps {
  images: MediaFile[];
  videos: MediaFile[];
  onImagesChange: (files: MediaFile[]) => void;
  onVideosChange: (files: MediaFile[]) => void;
}
                        `}</pre>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FEATURES TAB */}
          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Feature Implementation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6">
                  <div className="border p-4 rounded-lg">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Authentication System
                    </h3>
                    <div className="text-sm space-y-2">
                      <p><strong>Google OAuth:</strong> Integrated via Google Cloud Console</p>
                      <p><strong>JWT Tokens:</strong> Secure session management</p>
                      <p><strong>Role-based Access:</strong> Student vs Agent permissions</p>
                      <p><strong>Verification:</strong> Email and document verification for agents</p>
                    </div>
                  </div>

                  <div className="border p-4 rounded-lg">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Media Management
                    </h3>
                    <div className="text-sm space-y-2">
                      <p><strong>File Validation:</strong> Type, size, and format validation</p>
                      <p><strong>Cloud Storage:</strong> Cloudinary integration for media hosting</p>
                      <p><strong>Image Optimization:</strong> Automatic compression and resizing</p>
                      <p><strong>Video Processing:</strong> Thumbnail generation and encoding</p>
                    </div>
                  </div>

                  <div className="border p-4 rounded-lg">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Search className="w-4 h-4" />
                      Search & Filtering
                    </h3>
                    <div className="text-sm space-y-2">
                      <p><strong>Full-text Search:</strong> MongoDB text indexes</p>
                      <p><strong>Geospatial Search:</strong> Location-based filtering</p>
                      <p><strong>Advanced Filters:</strong> Price range, amenities, room type</p>
                      <p><strong>Search Analytics:</strong> Track popular searches</p>
                    </div>
                  </div>

                  <div className="border p-4 rounded-lg">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Communication System
                    </h3>
                    <div className="text-sm space-y-2">
                      <p><strong>Real-time Messaging:</strong> WebSocket implementation</p>
                      <p><strong>Conversation Threading:</strong> Organized by room context</p>
                      <p><strong>File Sharing:</strong> Document and image attachments</p>
                      <p><strong>Notification System:</strong> In-app and email notifications</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API TAB */}
          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  API Integration Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Backend API Structure</h3>
                  <div className="bg-muted p-4 rounded-lg text-sm">
                    <pre>{`
/api/v1/
├── auth/
│   ├── POST /login
│   ├── POST /register
│   ├── POST /logout
│   └── GET /profile
├── rooms/
│   ├── GET /rooms (search & filter)
│   ├── POST /rooms (create)
│   ├── GET /rooms/:id
│   ├── PUT /rooms/:id
│   └── DELETE /rooms/:id
├── bookings/
│   ├── GET /bookings
│   ├── POST /bookings
│   ├── PUT /bookings/:id
│   └── DELETE /bookings/:id
├── reviews/
│   ├── GET /reviews
│   ├── POST /reviews
│   └── PUT /reviews/:id
└── media/
    ├── POST /upload
    └── DELETE /media/:id
                    `}</pre>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Service Integration</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="border p-3 rounded">
                        <h4 className="font-medium">mongoService.ts</h4>
                        <p className="text-sm text-muted-foreground">MongoDB API client</p>
                        <div className="text-xs mt-2 bg-muted p-2 rounded">
                          <code>roomService, agentService, studentService</code>
                        </div>
                      </div>
                      
                      <div className="border p-3 rounded">
                        <h4 className="font-medium">Cloudinary</h4>
                        <p className="text-sm text-muted-foreground">Media storage and processing</p>
                        <div className="text-xs mt-2 bg-muted p-2 rounded">
                          <code>Image upload, video processing, CDN delivery</code>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="border p-3 rounded">
                        <h4 className="font-medium">Google APIs</h4>
                        <p className="text-sm text-muted-foreground">Authentication and maps</p>
                        <div className="text-xs mt-2 bg-muted p-2 rounded">
                          <code>OAuth 2.0, Maps API, Places API</code>
                        </div>
                      </div>
                      
                      <div className="border p-3 rounded">
                        <h4 className="font-medium">Notification Services</h4>
                        <p className="text-sm text-muted-foreground">Email and push notifications</p>
                        <div className="text-xs mt-2 bg-muted p-2 rounded">
                          <code>SendGrid, Firebase Cloud Messaging</code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Environment Configuration</h3>
                  <div className="bg-muted p-4 rounded-lg text-sm">
                    <pre>{`
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hostel_db
MONGODB_DB_NAME=hostel_db

# Authentication
JWT_SECRET=your-jwt-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Media Storage
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# External Services
SENDGRID_API_KEY=your-sendgrid-api-key
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
                    `}</pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* DEPLOYMENT TAB */}
          <TabsContent value="deployment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Deployment Guide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Production Deployment</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Frontend (Vercel/Netlify)</h4>
                      <div className="text-sm space-y-1">
                        <p>1. Connect GitHub repository</p>
                        <p>2. Set build command: <code>npm run build</code></p>
                        <p>3. Set publish directory: <code>dist</code></p>
                        <p>4. Configure environment variables</p>
                        <p>5. Enable automatic deployments</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Backend (Railway/Heroku)</h4>
                      <div className="text-sm space-y-1">
                        <p>1. Connect GitHub repository</p>
                        <p>2. Set start command: <code>npm start</code></p>
                        <p>3. Configure environment variables</p>
                        <p>4. Set up domain and SSL</p>
                        <p>5. Configure health checks</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Database Setup</h3>
                  <div className="bg-muted p-4 rounded-lg text-sm">
                    <pre>{`
# MongoDB Atlas Setup
1. Create MongoDB Atlas account
2. Create new cluster
3. Configure network access (IP whitelist)
4. Create database user
5. Get connection string
6. Set up indexes for optimization
7. Configure backup and monitoring
                    `}</pre>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Performance Optimization</h3>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium mb-2">Frontend</h4>
                      <ul className="space-y-1">
                        <li>• Code splitting</li>
                        <li>• Image optimization</li>
                        <li>• Bundle analysis</li>
                        <li>• CDN integration</li>
                        <li>• Service worker</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Backend</h4>
                      <ul className="space-y-1">
                        <li>• Database indexing</li>
                        <li>• Query optimization</li>
                        <li>• Caching layer</li>
                        <li>• Connection pooling</li>
                        <li>• Rate limiting</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Monitoring</h4>
                      <ul className="space-y-1">
                        <li>• Error tracking</li>
                        <li>• Performance metrics</li>
                        <li>• User analytics</li>
                        <li>• Uptime monitoring</li>
                        <li>• Log aggregation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* DEVELOPMENT TAB */}
          <TabsContent value="development" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Development Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Getting Started</h3>
                  <div className="bg-muted p-4 rounded-lg text-sm">
                    <pre>{`
# Clone the repository
git clone https://github.com/your-repo/hostel-ng.git
cd hostel-ng

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev

# Open http://localhost:5173
                    `}</pre>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Development Workflow</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Code Standards</h4>
                      <ul className="text-sm space-y-1">
                        <li>• TypeScript for type safety</li>
                        <li>• ESLint for code quality</li>
                        <li>• Prettier for formatting</li>
                        <li>• Conventional commits</li>
                        <li>• Component documentation</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Testing Strategy</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Unit tests with Vitest</li>
                        <li>• Component tests with Testing Library</li>
                        <li>• E2E tests with Playwright</li>
                        <li>• API tests with Supertest</li>
                        <li>• Visual regression tests</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Available Scripts</h3>
                  <div className="bg-muted p-4 rounded-lg text-sm">
                    <pre>{`
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run type-check   # TypeScript type checking
npm run test         # Run unit tests
npm run test:e2e     # Run E2E tests
                    `}</pre>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Contributing Guidelines</h3>
                  <div className="text-sm space-y-2">
                    <p>1. <strong>Fork the repository</strong> and create a feature branch</p>
                    <p>2. <strong>Write tests</strong> for new functionality</p>
                    <p>3. <strong>Follow coding standards</strong> and run linting</p>
                    <p>4. <strong>Update documentation</strong> if needed</p>
                    <p>5. <strong>Submit a pull request</strong> with clear description</p>
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
