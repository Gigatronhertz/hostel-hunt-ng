import { useState } from "react";
import { Link } from "react-router-dom";
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

// MongoDB API service (replace with actual implementation)
 import { roomService, agentAuthService } from "@/services/mongoService";

const AgentDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  
  // MONGODB INTEGRATION: Replace with actual agent data from MongoDB
   const [agentData, setAgentData] = useState(null);
  useEffect(() => {
    const fetchAgentData = async () => {
      const token = localStorage.getItem('agentToken');
      const agent = await agentAuthService.getProfile(token);
      setAgentData(agent);
    };
    fetchAgentData();
  }, []);
  
  // const agentData = {
  //   name: "John Doe",
  //   email: "john@example.com",
  //   phone: "08012345678"
  // };

  // MONGODB INTEGRATION: Replace with MongoDB query for agent's rooms
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchRooms = async () => {
      const token = localStorage.getItem('agentToken');
      const agentId = localStorage.getItem('agentId');
      const roomsData = await roomService.getAgentRooms(agentId, token);
      setRooms(roomsData);
      setLoading(false);
    };
    fetchRooms();
  }, []);
  
  // const [rooms, setRooms] = useState<Room[]>([
  //   {
  //     id: 1,
  //     name: "Unity Lodge - Single Room",
  //     campus: "University of Lagos",
  //     location: "Akoka, Lagos",
  //     yearlyPrice: 540000,
  //     roomType: "Single Room",
  //     bedCount: 1,
  //     bathrooms: 1,
  //     views: 45,
  //     bookingRequests: 3,
  //     amenities: ["wifi", "power", "security", "water"],
  //     imageCount: 5,
  //     videoCount: 2
  //   },
  //   {
  //     id: 2,
  //     name: "Elite Residence",
  //     campus: "University of Lagos", 
  //     location: "Yaba, Lagos",
  //     yearlyPrice: 660000,
  //     roomType: "One Bedroom",
  //     bedCount: 1,
  //     bathrooms: 1,
  //     views: 67,
  //     bookingRequests: 8,
  //     amenities: ["wifi", "power", "security", "ac", "kitchen", "parking"],
  //     imageCount: 7,
  //     videoCount: 1
  //   }
  // ]);

  // MONGODB INTEGRATION: Create room in MongoDB
  const handleCreateRoom = async (formData: RoomFormData, images: MediaFile[], videos: MediaFile[]) => {
    console.log("Creating room:", { ...formData, images, videos });

    // const token = localStorage.getItem('agentToken');
    // try {
    //   const result = await roomService.createRoom({
    //     ...formData,
    //     images,
    //     videos
    //   }, token);
    //   
    //   if (result.success) {
    //     toast({
    //       title: "Room Created!",
    //       description: "Your room has been successfully listed with media files.",
    //     });
    //     
    //     // Refresh rooms list
    //     const updatedRooms = await roomService.getAgentRooms(localStorage.getItem('agentId'), token);
    //     setRooms(updatedRooms);
    //   }
    // } catch (error) {
    //   toast({
    //     title: "Error",
    //     description: "Failed to create room. Please try again.",
    //     variant: "destructive"
    //   });
    // }

    toast({
      title: "Room Created!",
      description: "Your room has been successfully listed with media files.",
    });
  };

  // MONGODB INTEGRATION: Delete room from MongoDB
  const handleDeleteRoom = async (roomId: number) => {
    // const token = localStorage.getItem('agentToken');
    // try {
    //   await roomService.deleteRoom(roomId.toString(), token);
    //   setRooms(rooms.filter(room => room.id !== roomId));
    //   toast({
    //     title: "Room Deleted",
    //     description: "Room has been removed from your listings.",
    //   });
    // } catch (error) {
    //   toast({
    //     title: "Error",
    //     description: "Failed to delete room. Please try again.",
    //     variant: "destructive"
    //   });
    // }

    setRooms(rooms.filter(room => room.id !== roomId));
    toast({
      title: "Room Deleted",
      description: "Room has been removed from your listings.",
    });
  };

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
            <span className="text-sm text-muted-foreground">Welcome, {agentData.name}</span>
            <Button variant="outline" size="sm">
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
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">New booking request for Unity Lodge</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Room viewed 5 times today</p>
                      <p className="text-xs text-muted-foreground">4 hours ago</p>
                    </div>
                  </div>
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
              {rooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onDelete={handleDeleteRoom}
                />
              ))}
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
