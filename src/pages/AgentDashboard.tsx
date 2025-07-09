
// =============================================================================
// AGENT DASHBOARD - Main Dashboard Component for Authenticated Agents
// =============================================================================
// This component serves as the main hub for agents to manage their room listings
// It includes authentication checks, data fetching, and room management functionality
// =============================================================================

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus } from "lucide-react";

// Import refactored dashboard components
import DashboardStats from "@/components/dashboard/DashboardStats";
import RoomCard, { Room } from "@/components/dashboard/RoomCard";
import RoomForm, { RoomFormData } from "@/components/dashboard/RoomForm";
import { MediaFile } from "@/components/MediaUpload";

//import AgentRegistration from "@/components/auth/AgentRegistration";

const AgentDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // =============================================================================
  // COMPONENT STATE MANAGEMENT
  // =============================================================================
  const [activeTab, setActiveTab] = useState("overview");  // Current active tab
  const [loading, setLoading] = useState(true);            // Loading state for initial data fetch
  const [agentData, setAgentData] = useState(null);        // Current agent's profile data
  const [rooms, setRooms] = useState<Room[]>([]);          // Agent's room listings

  // =============================================================================
  // AUTHENTICATION CHECK - BACKEND HANDLES REGISTRATION REDIRECT
  // =============================================================================
  // 1. Make auth check request - backend will redirect if registration needed
  // 2. If auth successful: fetch profile and rooms data
  // 3. Show dashboard with data or empty state
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Backend auth check - backend handles registration redirect
        const authResponse = await fetch('/auth/login', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (authResponse.ok) {
          // Try to fetch profile and rooms
          const [profileResponse, roomsResponse] = await Promise.all([
            fetch('/api/agents/profile', {
              method: 'GET',
              credentials: 'include'
            }),
            fetch('/api/agents/rooms', {
              method: 'GET', 
              credentials: 'include'
            })
          ]);

          if (profileResponse.ok) {
            const profileData = await profileResponse.json();
            setAgentData(profileData);
          }

          if (roomsResponse.ok) {
            const roomsData = await roomsResponse.json();
            setRooms(roomsData);
          }
        }
        // If auth fails, just show empty dashboard - backend handles redirects
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // =============================================================================
  // ROOM CREATION HANDLER (COOKIE-BASED)
  // =============================================================================
  // Handles the creation of new room listings with file uploads using cookies
  const handleCreateRoom = async (formData: RoomFormData, images: MediaFile[], videos: MediaFile[]) => {
    console.log("Creating room:", { ...formData, images, videos });

    try {
      // STEP 1: Create FormData object for multipart upload
      const uploadData = new FormData();
      
      // Add form fields
      Object.entries(formData).forEach(([key, value]) => {
        uploadData.append(key, value.toString());
      });

      // Add image files
      images.forEach((img) => {
        uploadData.append('images', img.file);
      });

      // Add video files
      videos.forEach((vid) => {
        uploadData.append('videos', vid.file);
      });

      // STEP 2: Send room creation request to backend with cookie authentication
      const response = await fetch('/api/rooms', {
        method: 'POST',
        credentials: 'include', // ✅ Include session cookie
        body: uploadData
      });

      if (response.ok) {
        // STEP 3: Show success message to user
        toast({
          title: "Room Created!",
          description: "Your room has been successfully listed with media files.",
        });
        
        // STEP 4: Refresh the rooms list to show the new room
        const roomsResponse = await fetch('/api/agents/rooms', {
          method: 'GET',
          credentials: 'include'
        });
        
        if (roomsResponse.ok) {
          const roomsData = await roomsResponse.json();
          setRooms(roomsData);
        }
        
        // STEP 5: Switch to rooms tab to show the newly created room
        setActiveTab("rooms");
      } else {
        // Handle creation failure
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.message || "Failed to create room. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Room creation error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    }
  };

  // =============================================================================
  // ROOM DELETION HANDLER (COOKIE-BASED)
  // =============================================================================
  // Handles the deletion of existing room listings using cookie authentication
  const handleDeleteRoom = async (roomId: number) => {
    try {
      // STEP 1: Send deletion request to backend with cookie authentication
      const response = await fetch(`/api/rooms/${roomId}`, {
        method: 'DELETE',
        credentials: 'include' // ✅ Include session cookie
      });
      
      if (response.ok) {
        // STEP 2: Remove the room from local state immediately
        // This provides immediate feedback without waiting for a server refresh
        setRooms(rooms.filter(room => room.id !== roomId));
        toast({
          title: "Room Deleted",
          description: "Room has been removed from your listings.",
        });
      } else {
        // Handle deletion failure
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.message || "Failed to delete room. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Room deletion error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    }
  };

  // =============================================================================
  // LOGOUT HANDLER (COOKIE-BASED)
  // =============================================================================
  // Handles user logout by clearing session cookie and redirecting
  const handleLogout = async () => {
    try {
      // STEP 1: Send logout request to backend to clear session cookie
      await fetch('/auth/logout', {
        method: 'POST',
        credentials: 'include' // ✅ Include session cookie for logout
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
    
    // STEP 2: Show logout message and redirect regardless of API response
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  // =============================================================================
  // REGISTRATION SUCCESS HANDLER
  // =============================================================================
  // Called when agent completes registration form
  const handleRegistrationSuccess = () => {
    // STEP 1: Refetch agent profile after successful registration
    fetch('/api/agents/profile', {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(profileData => {
      setAgentData(profileData);
      setActiveTab("overview"); // Switch to overview tab
    })
    .catch(error => {
      console.error("Failed to fetch profile after registration:", error);
    });
  };

  // =============================================================================
  // LOADING STATE DISPLAY
  // =============================================================================
  // Show loading spinner while initializing dashboard data
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // =============================================================================
  // CALCULATE DASHBOARD STATISTICS
  // =============================================================================
  // Calculate total views and booking requests across all rooms
  const totalViews = rooms.reduce((sum, room) => sum + room.views, 0);
  const totalBookingRequests = rooms.reduce((sum, room) => sum + room.bookingRequests, 0);

  // =============================================================================
  // MAIN DASHBOARD RENDER
  // =============================================================================
  return (
    <div className="min-h-screen bg-background">
      {/* =============================================================================
          HEADER SECTION
          ============================================================================= */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            Hostel.ng
          </Link>
          <div className="flex items-center space-x-4">
            {/* Display agent name if available */}
            <span className="text-sm text-muted-foreground">
              Welcome, {agentData?.name || "Agent"}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Back to home navigation */}
        <Link to="/" className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Dashboard title and description */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Agent Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your room listings and track performance
          </p>
        </div>

        {/* =============================================================================
            DASHBOARD TABS - BACKEND HANDLES REGISTRATION REDIRECT
            ============================================================================= */}
        {/* Always show dashboard - backend redirects if registration needed */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="rooms">My Rooms</TabsTrigger>
              <TabsTrigger value="add-room">Add Room</TabsTrigger>
            </TabsList>
          
          {/* =============================================================================
              OVERVIEW TAB - Dashboard Statistics and Recent Activity
              ============================================================================= */}
          <TabsContent value="overview" className="space-y-6">
            {/* Display dashboard statistics */}
            <DashboardStats
              totalRooms={rooms.length}
              totalViews={totalViews}
              totalBookingRequests={totalBookingRequests}
            />

            {/* Recent activity section */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rooms.length > 0 ? (
                    // Show recent rooms activity
                    rooms.slice(0, 3).map((room) => (
                      <div key={room.id} className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium">{room.name} - {room.views} views</p>
                          <p className="text-xs text-muted-foreground">
                            {room.bookingRequests} booking requests
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    // Show empty state when no rooms exist
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No rooms listed yet. Start by adding your first room!</p>
                      <Button 
                        className="mt-4" 
                        onClick={() => setActiveTab("add-room")}
                      >
                        Add Your First Room
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* =============================================================================
              ROOMS TAB - Display All Agent's Room Listings
              ============================================================================= */}
          <TabsContent value="rooms" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Rooms</h2>
              <Button onClick={() => setActiveTab("add-room")}>
                <Plus className="w-4 h-4 mr-2" />
                Add New Room
              </Button>
            </div>
            
            <div className="grid gap-6">
              {rooms.length > 0 ? (
                // Display all rooms using the RoomCard component
                rooms.map((room) => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    onDelete={handleDeleteRoom}
                  />
                ))
              ) : (
                // Show empty state when no rooms exist
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No rooms listed yet</p>
                  <Button onClick={() => setActiveTab("add-room")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Room
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* =============================================================================
              ADD ROOM TAB - Room Creation Form
              ============================================================================= */}
          <TabsContent value="add-room" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Room</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Room creation form component handles all form logic */}
                <RoomForm onSubmit={handleCreateRoom} />
              </CardContent>
            </Card>
          </TabsContent>
          </Tabs>
      </div>
    </div>
  );
};

export default AgentDashboard;
