     // =============================================================================
// AGENT DASHBOARD - Main Dashboard Component for Authenticated Agents
// =============================================================================
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus } from "lucide-react";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RoomCard, { Room } from "@/components/dashboard/RoomCard";
import RoomForm from "@/components/dashboard/RoomForm";

// Cloudinary Configuration
const CLOUDINARY_CONFIG = {
  cloudName: "dw45dvti5",
  uploadPreset: "hostel.ng",
  apiUrl: "https://api.cloudinary.com/v1_1"
};

const AgentDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [agentData, setAgentData] = useState(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

  // Authentication check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userResponse = await fetch('https://hostelng.onrender.com/user', {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setAgentData(userData.user);
        } else {
          navigate("/agent-login");
        }
      } catch (error) {
        navigate("/agent-login");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  // Fetch rooms
  useEffect(() => {
    const fetchRooms = async () => {
      if (!agentData) return;
      try {
        const response = await fetch("https://hostelng.onrender.com/agent-rooms", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" }
        });
        if (response.ok) {
          const data = await response.json();
          setRooms(data.rooms || []);
        }
      } catch (error) {
        console.error("Room fetch error:", error);
      }
    };
    fetchRooms();
  }, [agentData]);

  // Cloudinary upload helper
  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
    
    const resourceType = file.type.startsWith('image/') ? 'image' : 'video';
    const uploadUrl = `${CLOUDINARY_CONFIG.apiUrl}/${CLOUDINARY_CONFIG.cloudName}/${resourceType}/upload`;

    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Cloudinary upload failed');
    }

    return await response.json();
  };

  // Handle room submission with Cloudinary
  const handleRoomSubmit = async (roomData: any) => {
    if (!editingRoom && (!roomData.files || roomData.files.length === 0)) {
      toast({
        title: "Error",
        description: "Please upload at least one image or video for your room.",
        variant: "destructive"
      });
      return;
    }

    setFormLoading(true);
    
    try {
      // Upload files to Cloudinary
      const mediaUrls = roomData.files?.length > 0
        ? await Promise.all(
            roomData.files.map(async (file: File) => {
              const data = await uploadToCloudinary(file);
              return {
                url: data.secure_url,
                public_id: data.public_id,
                type: data.resource_type
              };
            })
          )
        : [];

      // Prepare payload
      const payload = {
        ...roomData,
        amenities: JSON.stringify(roomData.amenities),
        media: mediaUrls,
        ...(editingRoom && { public_ids: roomData.public_ids })
      };

      // Send to backend
      const url = editingRoom 
        ? `https://hostelng.onrender.com/update-room/${roomData._id}`
        : "https://hostelng.onrender.com/create-rooms";
      
      const response = await fetch(url, {
        method: editingRoom ? "PUT" : "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const result = await response.json();
        toast({
          title: editingRoom ? "Room Updated!" : "Room Created!",
          description: editingRoom 
            ? "Your room listing has been updated successfully."
            : "Your room listing has been created successfully.",
        });

        setEditingRoom(null);
        const roomsResponse = await fetch("https://hostelng.onrender.com/agent-rooms", {
          method: "GET",
          credentials: "include"
        });
        if (roomsResponse.ok) {
          setRooms((await roomsResponse.json()).rooms || []);
        }
        setActiveTab("overview");
      } else {
        const errorData = await response.json();
        toast({
          title: editingRoom ? "Update Failed" : "Creation Failed",
          description: errorData.message || "Failed to save room.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error 
          ? error.message 
          : "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setFormLoading(false);
    }
  };

  // Room deletion handler
  const handleDeleteRoom = async (roomId: string) => {
    try {
      const response = await fetch(`https://hostelng.onrender.com/rooms/${roomId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      
      if (response.ok) {
        setRooms(rooms.filter(room => room._id !== roomId));
        toast({ title: "Room Deleted", description: "Room has been removed." });
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.message || "Failed to delete room.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    }
  };

  // Loading state
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

  // Calculate stats
  const totalViews = rooms.reduce((sum, room) => sum + room.views, 0);
  const totalBookingRequests = rooms.reduce((sum, room) => sum + room.bookingRequests, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            Hostel.ng
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {agentData?.name || "Agent"}
            </span>
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
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

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="rooms">My Rooms</TabsTrigger>
            <TabsTrigger value="add-room">
              {editingRoom ? 'Edit Room' : 'Add Room'}
            </TabsTrigger>
          </TabsList>
        
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <DashboardStats
              totalRooms={rooms.length}
              totalViews={totalViews}
              totalBookingRequests={totalBookingRequests}
            />
            {/* Recent Activity */}
            <Card>
              <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
              <CardContent>
                {rooms.length > 0 ? (
                  rooms.slice(0, 3).map((room) => (
                    <div key={room._id} className="flex items-center space-x-4 py-2">
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
                    <Button className="mt-4" onClick={() => setActiveTab("add-room")}>
                      Add Your First Room
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Rooms Tab */}
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
                  <RoomCard 
                    key={room._id}
                    room={room} 
                    onDelete={handleDeleteRoom} 
                    onEdit={() => {
                      setEditingRoom(room);
                      setActiveTab("add-room");
                    }}
                  />
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
          
          {/* Add/Edit Room Tab */}
          <TabsContent value="add-room" className="space-y-6">
            <RoomForm 
              onSubmit={handleRoomSubmit}
              loading={formLoading}
              editMode={!!editingRoom}
              initialData={editingRoom}
              onCancel={editingRoom ? () => {
                setEditingRoom(null);
                setActiveTab("rooms");
              } : undefined}
            />
          </TabsContent>
        </Tabs>
      </div> 
    </div>
  );
};

export default AgentDashboard;
