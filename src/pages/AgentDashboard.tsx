
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus } from "lucide-react";

// Refactored components
import DashboardStats from "@/components/dashboard/DashboardStats";
import RoomCard, { Room } from "@/components/dashboard/RoomCard";
import RoomForm, { RoomFormData } from "@/components/dashboard/RoomForm";
import { MediaFile } from "@/components/MediaUpload";
import { agentAuthService, roomService } from "@/services/mongoService";

const AgentDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [agentData, setAgentData] = useState(null);
  const [rooms, setRooms] = useState<Room[]>([]);

  // Check authentication and fetch data on component mount
  useEffect(() => {
    const initializeDashboard = async () => {
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
        // Try to get cached agent data first
        const cachedAgentData = localStorage.getItem('agentData');
        if (cachedAgentData) {
          setAgentData(JSON.parse(cachedAgentData));
        }

        // Fetch fresh agent profile
        const profileResult = await agentAuthService.getProfile();
        if (profileResult.success) {
          setAgentData(profileResult.data);
          localStorage.setItem('agentData', JSON.stringify(profileResult.data));
        }

        // Fetch agent's rooms
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
        setLoading(false);
      }
    };

    initializeDashboard();
  }, [navigate, toast]);

  const handleCreateRoom = async (formData: RoomFormData, images: MediaFile[], videos: MediaFile[]) => {
    console.log("Creating room:", { ...formData, images, videos });

    try {
      // Convert MediaFiles to actual Files
      const imageFiles = images.map(img => img.file);
      const videoFiles = videos.map(vid => vid.file);

      const result = await roomService.createRoom(formData, imageFiles, videoFiles);
      
      if (result.success) {
        toast({
          title: "Room Created!",
          description: "Your room has been successfully listed with media files.",
        });
        
        // Refresh rooms list
        const agentId = localStorage.getItem('agentId');
        if (agentId) {
          const roomsResult = await roomService.getAgentRooms(agentId);
          if (roomsResult.success) {
            setRooms(roomsResult.data);
          }
        }
        
        // Switch to rooms tab
        setActiveTab("rooms");
      } else {
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

  const handleDeleteRoom = async (roomId: number) => {
    try {
      const result = await roomService.deleteRoom(roomId.toString());
      
      if (result.success) {
        setRooms(rooms.filter(room => room.id !== roomId));
        toast({
          title: "Room Deleted",
          description: "Room has been removed from your listings.",
        });
      } else {
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

  const handleLogout = () => {
    agentAuthService.logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

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
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
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
                    key={room.id}
                    room={room}
                    onDelete={handleDeleteRoom}
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

