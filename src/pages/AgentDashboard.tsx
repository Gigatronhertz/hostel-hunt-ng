
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
import { agentAuthService, roomService } from "@/services/mongoService";

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
  // AUTHENTICATION CHECK AND DATA INITIALIZATION
  // =============================================================================
  // This useEffect runs when the component mounts and handles:
  // 1. Authentication verification
  // 2. Loading cached agent data
  // 3. Fetching fresh profile data
  // 4. Loading agent's room listings
  useEffect(() => {
    const initializeDashboard = async () => {
      // STEP 1: Check if user is authenticated
      // If not authenticated, redirect to login page
      if (!agentAuthService.isAuthenticated()) {
        toast({
          title: "Authentication Required",
          description: "Please login to access your dashboard.",
          variant: "destructive"
        });
        navigate("/agent-login");
        return;
      }

      try {
        // STEP 2: Try to get cached agent data first for immediate display
        // This provides a better user experience while we fetch fresh data
        const cachedAgentData = localStorage.getItem('agentData');
        if (cachedAgentData) {
          setAgentData(JSON.parse(cachedAgentData));
        }

        // STEP 3: Fetch fresh agent profile from backend
        // This ensures we have the most up-to-date agent information
        const profileResult = await agentAuthService.getProfile();
        if (profileResult.success) {
          setAgentData(profileResult.data);
          // Update cached data with fresh information
          localStorage.setItem('agentData', JSON.stringify(profileResult.data));
        }

        // STEP 4: Fetch agent's room listings
        // Get the agent ID from localStorage and fetch their rooms
        const agentId = localStorage.getItem('agentId');
        if (agentId) {
          const roomsResult = await roomService.getAgentRooms(agentId);
          if (roomsResult.success) {
            setRooms(roomsResult.data);
          } else {
            console.error("Failed to fetch rooms:", roomsResult.error);
          }
        }
      } catch (error) {
        console.error("Dashboard initialization error:", error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data.",
          variant: "destructive"
        });
      } finally {
        // Always set loading to false, whether success or error
        setLoading(false);
      }
    };

    initializeDashboard();
  }, [navigate, toast]);

  // =============================================================================
  // ROOM CREATION HANDLER
  // =============================================================================
  // Handles the creation of new room listings with file uploads
  const handleCreateRoom = async (formData: RoomFormData, images: MediaFile[], videos: MediaFile[]) => {
    console.log("Creating room:", { ...formData, images, videos });

    try {
      // STEP 1: Convert MediaFile objects to actual File objects
      // The MediaFile type includes additional metadata, but the API expects raw File objects
      const imageFiles = images.map(img => img.file);
      const videoFiles = videos.map(vid => vid.file);

      // STEP 2: Send room creation request to backend
      // This includes form data, image files, and video files
      const result = await roomService.createRoom(formData, imageFiles, videoFiles);
      
      if (result.success) {
        // STEP 3: Show success message to user
        toast({
          title: "Room Created!",
          description: "Your room has been successfully listed with media files.",
        });
        
        // STEP 4: Refresh the rooms list to show the new room
        const agentId = localStorage.getItem('agentId');
        if (agentId) {
          const roomsResult = await roomService.getAgentRooms(agentId);
          if (roomsResult.success) {
            setRooms(roomsResult.data);
          }
        }
        
        // STEP 5: Switch to rooms tab to show the newly created room
        setActiveTab("rooms");
      } else {
        // Handle creation failure
        toast({
          title: "Error",
          description: result.error || "Failed to create room. Please try again.",
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
  // ROOM DELETION HANDLER
  // =============================================================================
  // Handles the deletion of existing room listings
  const handleDeleteRoom = async (roomId: number) => {
    try {
      // STEP 1: Send deletion request to backend
      const result = await roomService.deleteRoom(roomId.toString());
      
      if (result.success) {
        // STEP 2: Remove the room from local state immediately
        // This provides immediate feedback without waiting for a server refresh
        setRooms(rooms.filter(room => room.id !== roomId));
        toast({
          title: "Room Deleted",
          description: "Room has been removed from your listings.",
        });
      } else {
        // Handle deletion failure
        toast({
          title: "Error",
          description: result.error || "Failed to delete room. Please try again.",
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
  // LOGOUT HANDLER
  // =============================================================================
  // Handles user logout by clearing authentication data and redirecting
  const handleLogout = () => {
    // Clear all authentication data from localStorage
    agentAuthService.logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    // Redirect to home page
    navigate("/");
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
            DASHBOARD TABS SECTION
            ============================================================================= */}
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
