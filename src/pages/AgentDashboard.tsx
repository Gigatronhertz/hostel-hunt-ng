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
  // AUTHENTICATION CHECK - USING FETCH WITH CREDENTIALS
  // =============================================================================
 useEffect(() => {
  const checkAuth = async () => {
    try {
      // STEP 1: Fetch authenticated user profile
      const userResponse = await fetch('https://hostelng.onrender.com/user', {
        method: 'GET',
        credentials: 'include', // ✅ include session cookie
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        console.log("Authenticated user:", userData);

        // STEP 2: Save user profile to state
        setAgentData({
          name: userData.user.name,
          email: userData.user.email,
          phoneNumber: userData.user.phoneNumber,
          isVerified: userData.user.isVerified,
          businessName: userData.user.businessName,
          googleId: userData.user.googleId,
          address: userData.user.address
        });
      } else {
        console.warn("User not authenticated or session expired");
        // navigate("/login"); // Optional redirect
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      navigate("/agent-login"); // Redirect to login on error
    } finally {
      setLoading(false);
    }
  };

  checkAuth();
}, [navigate]);


  //------------------------------------------------

  ///////////////////////////////////

  useEffect(() => {
  // Only fetch rooms if agentData is available
  const fetchRooms = async () => {
    if (!agentData) return;

    try {
      const response = await fetch("https://hostelng.onrender.com/agent-rooms", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        const data = await response.json();
    console.log(data);
        setRooms(data.rooms || []); // Adjust if structure differs
      } else {
        console.warn("Failed to fetch rooms: Non-OK response");
      }
    } catch (error) {
      console.error("Room fetch error:", error);
    }
  };

  fetchRooms();
}, [agentData]);


  // =============================================================================
  // ROOM CREATION HANDLER (COOKIE-BASED)
  // =============================================================================
const handleCreateRoom = async (
  formData: RoomFormData,
  images: MediaFile[],
  videos: MediaFile[]
) => {
  const cloudName = "dw45dvti5";
  const unsignedUploadPreset = "hostel.ng"; // ← Create in Cloudinary dashboard

  try {
    // Function to upload a file to Cloudinary
    const uploadToCloudinary = async (file: File, resourceType: "image" | "video") => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", unsignedUploadPreset);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, {
        method: "POST",
        body: data,
      });

      const json = await res.json();
  if (json.secure_url && json.public_id) {
    return {
      url: json.secure_url,
      public_id: json.public_id
    };
  }
      throw new Error("Upload failed: " + json.error?.message);
    };

    // Upload images
    const imageUrls = await Promise.all(
      images.map((img) => uploadToCloudinary(img.file, "image"))
    );

    // Upload videos
    const videoUrls = await Promise.all(
      videos.map((vid) => uploadToCloudinary(vid.file, "video"))
    );

    // Construct payload
    const payload = {
      ...formData,
      amenities: JSON.stringify(formData.amenities),
      images: imageUrls,
      videos: videoUrls,
    };

    const response = await fetch("https://hostelng.onrender.com/create-rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
   
    });

    if (response.ok) {
      toast({
        title: "Room Created!",
        description: "Your room has been listed with Cloudinary media.",
      });
         console.log(payload);
      setActiveTab("rooms");
    } else {
      const errorData = await response.json();
      toast({
        title: "Error",
        description: errorData.message || "Failed to create room.",
        variant: "destructive",
      });
    }
  } catch (error: any) {
    console.error("Error creating room:", error);
    toast({
      title: "Upload Error",
      description: error.message || "Something went wrong.",
      variant: "destructive",
    });
  }
};

  ////////////////////////////////////////////
  /////////////////////
//room update 
  //////////////////////
const handleUpdateRoom = async (
  roomId: number,
  formData: RoomFormData,
  images: MediaFile[] = [],
  videos: MediaFile[] = []
) => {
  const cloudName = "dw45dvti5";
  const unsignedUploadPreset = "hostel.ng";

  try {
    // Helper: Upload to Cloudinary
    const uploadToCloudinary = async (
      file: File,
      resourceType: "image" | "video"
    ) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", unsignedUploadPreset);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const json = await res.json();
      if (json.secure_url && json.public_id) {
        return {
          url: json.secure_url,
          public_id: json.public_id,
        };
      }
      throw new Error("Upload failed: " + json.error?.message);
    };

    // Upload new media (if any)
    const newImageData = await Promise.all(
      images.map((img) => uploadToCloudinary(img.file, "image"))
    );
    const newVideoData = await Promise.all(
      videos.map((vid) => uploadToCloudinary(vid.file, "video"))
    );

    // Construct payload
    const payload = {
      ...formData,
      amenities: JSON.stringify(formData.amenities),
      images: newImageData,   // Can be merged with existing on the backend
      videos: newVideoData,
    };

    const response = await fetch(
      `https://hostelng.onrender.com/update-room/${roomId}`,
      {
        method: "PATCH", // or "PUT" depending on your backend
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      }
    );

    if (response.ok) {
      toast({
        title: "Room Updated",
        description: "Your room information has been updated successfully.",
      });
      setActiveTab("rooms");
    } else {
      const errorData = await response.json();
      toast({
        title: "Update Failed",
        description: errorData.message || "Could not update the room.",
        variant: "destructive",
      });
    }
  } catch (error: any) {
    console.error("Room update error:", error);
    toast({
      title: "Upload Error",
      description: error.message || "Something went wrong.",
      variant: "destructive",
    });
  }
};


  // =============================================================================
  // // ROOM DELETION HANDLER (COOKIE-BASED)
  // // =============================================================================
  const handleDeleteRoom = async (roomId: string) => {
  console.log("Dashboard → Deleting room ID:", roomId);
    try {
 fetch(`https://hostelng.onrender.com/rooms/${roomId}`, {
  method: 'DELETE',
  credentials: 'include',
})
      if (response.ok) {
        setRooms(rooms.filter(room => room._id !== roomId));
        toast({
          title: "Room Deleted",
          description: "Room has been removed from your listings.",
        });
      } else {
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
  const handleLogout = async () => {
    try {
      await fetch('/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  // =============================================================================
  // LOADING STATE DISPLAY
  // =============================================================================
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
  const totalViews = rooms.reduce((sum, room) => sum + room.views, 0);
  const totalBookingRequests = rooms.reduce((sum, room) => sum + room.bookingRequests, 0);

  // =============================================================================
  // MAIN DASHBOARD RENDER
  // =============================================================================
  return (
    <div className="min-h-screen bg-background">
      {/* HEADER SECTION */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            Hostel.ng
          </Link>
          <div className="flex items-center space-x-4">
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
        <Link to="/" className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Agent Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your room listings and track performance
          </p>
        </div> 

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="rooms">My Rooms</TabsTrigger>
            <TabsTrigger value="add-room">Add Room</TabsTrigger>
          </TabsList>
        
          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-6">
            <DashboardStats
              totalRooms={rooms.length}
              totalViews={totalViews}
              totalBookingRequests={totalBookingRequests}
            />

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rooms.length > 0 ? (
                    rooms.slice(0, 3).map((room) => (
                      <div key={room._id} className="flex items-center space-x-4">
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
          
          {/* ROOMS TAB */}
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
                rooms.map((room) => (
                <RoomCard room={room} onDelete={(id) => handleDeleteRoom(Number(id))} />
                ))
              ) : (
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
          
          {/* ADD ROOM TAB */}
          <TabsContent value="add-room" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Room</CardTitle>
              </CardHeader>
              <CardContent>
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
