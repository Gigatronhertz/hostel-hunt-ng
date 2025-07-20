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
  uploadPreset: "RentNaija",
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

const paid = async () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/agent-login");
      return;
    }

    const res = await fetch("https://hostelng.onrender.com/dashboard", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      navigate("/agent-login");
      return;
    }

    const data = await res.json();
    const { isPaid, onboarded, user } = data;

    // 👇 Redirect based on status
    if (!onboarded) {
      navigate("/register");
      return;
    }
    if (onboarded && !isPaid) {
      navigate("/agent-payment");
      return;
    }

    // ✅ Set user data after checks
    setAgentData(user);

  } catch (err) {
    navigate("/agent-login");
  } finally {
    setLoading(false);
  }
};






    const checkAuth = async () => {
      try {
        console.log('Token at user get:', localStorage.getItem("authToken"));
        const userResponse = await fetch('https://hostelng.onrender.com/user', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
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
    paid();
  }, [navigate]);

  // Fetch rooms
  useEffect(() => {
    console.log('Token at fetch rooms:', localStorage.getItem("authToken"));
    const fetchRooms = async () => {

      if (!agentData) return;
      try {
        const response = await fetch("https://hostelng.onrender.com/agent-rooms", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
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
    // For new rooms, require at least one file or existing media
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
      const uploadedImages: any[] = [];
      const uploadedVideos: any[] = [];
      const public_ids: string[] = [];
  
      // Upload new files to Cloudinary
      if (roomData.files && roomData.files.length > 0) {
        for (const file of roomData.files) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", CLOUDINARY_CONFIG.uploadPreset);
  
          const resourceType = file.type.startsWith("image/") ? "image" : "video";
          const uploadUrl = `${CLOUDINARY_CONFIG.apiUrl}/${CLOUDINARY_CONFIG.cloudName}/${resourceType}/upload`;
  
          const response = await fetch(uploadUrl, {
            method: "POST",
            body: formData,
          });
  
          const data = await response.json();
  
          if (response.ok && data.secure_url && data.public_id) {
            public_ids.push(data.public_id);
  
            if (resourceType === "image") {
              uploadedImages.push(data.secure_url);
            } else {
              uploadedVideos.push(data.secure_url);
            }
          } else {
            throw new Error(data.error?.message || "Upload failed");
          }
        }
      }

      // Combine existing and new media
      const finalImages = [
        ...(roomData.existingImages || []),
        ...uploadedImages
      ];
      
      const finalVideos = [
        ...(roomData.existingVideos || []),
        ...uploadedVideos
      ];
  
      const payload = {
        name: roomData.name,
        location: roomData.location,
        campus: roomData.campus,
        yearlyPrice: Number(roomData.yearlyPrice),
        roomType: roomData.roomType,
        description: roomData.description,
       amenities: roomData.amenities || [],
        images: finalImages,
        videos: finalVideos,
        public_ids,
      };
  
      const url = editingRoom
        ? `https://hostelng.onrender.com/update-room/${roomData._id}`
        : "https://hostelng.onrender.com/create-rooms";
  
      const response = await fetch(url, {
        method: editingRoom ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingRoom ? { payload } : payload),
      });
  
      if (response.ok) {
        console.log("Updating room with data:", roomData);
        toast({
          title: editingRoom ? "Room Updated!" : "Room Created!",
          description: editingRoom
            ? "Your room has been updated."
            : "Your room has been listed successfully.",
        });
  
        setEditingRoom(null);
        setActiveTab("rooms");
  
        const roomsResponse = await fetch("https://hostelng.onrender.com/agent-rooms", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
        });
  
        if (roomsResponse.ok) {
          const roomsData = await roomsResponse.json();
          setRooms(roomsData.rooms || []);
        }
      } else {
        const errorData = await response.json();
        toast({
          title: "Failed to save room",
          description: errorData.message || "Unexpected error",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
        variant: "destructive",
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
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
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
            RentNaija
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
              totalViews={agentData?.totalViews}
              totalBookingRequests={agentData.bookingRequests}
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
                          {agentData.bookingRequests||0} booking requests
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
