import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import AmenitiesSelector, { availableAmenities } from "@/components/AmenitiesSelector";
import MediaUpload, { MediaFile } from "@/components/MediaUpload";
import { 
  ArrowLeft, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Users, 
  MapPin,
  Bed,
  MessageCircle,
  Image,
  Video
} from "lucide-react";

const AgentDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  
  // BACKEND INTEGRATION: Replace with actual agent data from Supabase
  const agentData = {
    name: "John Doe",
    email: "john@example.com",
    phone: "08012345678"
  };

  // BACKEND INTEGRATION: Replace with Supabase query for agent's rooms
  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: "Unity Lodge - Single Room",
      campus: "University of Lagos",
      location: "Akoka, Lagos",
      yearlyPrice: 540000,
      roomType: "Single Room",
      bedCount: 1,
      bathrooms: 1,
      views: 45,
      bookingRequests: 3,
      amenities: ["wifi", "power", "security", "water"],
      imageCount: 5,
      videoCount: 2
    },
    {
      id: 2,
      name: "Elite Residence",
      campus: "University of Lagos", 
      location: "Yaba, Lagos",
      yearlyPrice: 660000,
      roomType: "One Bedroom",
      bedCount: 1,
      bathrooms: 1,
      views: 67,
      bookingRequests: 8,
      amenities: ["wifi", "power", "security", "ac", "kitchen", "parking"],
      imageCount: 7,
      videoCount: 1
    }
  ]);

  const [newRoom, setNewRoom] = useState({
    name: "",
    campus: "",
    location: "",
    yearlyPrice: "",
    roomType: "",
    bedCount: 1,
    bathrooms: 1,
    description: "",
    amenities: [] as string[]
  });

  const [roomImages, setRoomImages] = useState<MediaFile[]>([]);
  const [roomVideos, setRoomVideos] = useState<MediaFile[]>([]);

  const campuses = [
    "University of Lagos",
    "University of Ibadan", 
    "Ahmadu Bello University",
    "University of Nigeria, Nsukka",
    "Obafemi Awolowo University",
    "University of Benin",
    "Federal University of Technology, Akure",
    "Lagos State University",
    "University of Agriculture, Abeokuta",
    "Federal University of Agriculture, Makurdi",
    "University of Port Harcourt",
    "Federal University of Technology, Minna",
    "Bayero University, Kano"
  ];

  const roomTypes = [
    "Single Room",
    "One Bedroom", 
    "Two Bedroom",
    "Three Bedroom",
    "Shared Apartment"
  ];

  // BACKEND INTEGRATION: Create room in Supabase
  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Creating room:", {
      ...newRoom,
      images: roomImages,
      videos: roomVideos
    });

    toast({
      title: "Room Created!",
      description: "Your room has been successfully listed with media files.",
    });
    
    // Reset form
    setNewRoom({
      name: "",
      campus: "",
      location: "",
      yearlyPrice: "",
      roomType: "",
      bedCount: 1,
      bathrooms: 1,
      description: "",
      amenities: []
    });
    setRoomImages([]);
    setRoomVideos([]);
  };

  // BACKEND INTEGRATION: Delete room from Supabase
  const handleDeleteRoom = (roomId: number) => {
    setRooms(rooms.filter(room => room.id !== roomId));
    toast({
      title: "Room Deleted",
      description: "Room has been removed from your listings.",
    });
  };

  const getAmenityIcon = (amenityId: string) => {
    const amenity = availableAmenities.find(a => a.id === amenityId);
    return amenity?.icon;
  };

  const getAmenityName = (amenityId: string) => {
    const amenity = availableAmenities.find(a => a.id === amenityId);
    return amenity?.name || amenityId;
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
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
                  <Bed className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{rooms.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalViews}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Booking Requests</CardTitle>
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalBookingRequests}</div>
                </CardContent>
              </Card>
            </div>

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
                <Card key={room.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{room.name}</h3>
                        </div>
                        <p className="text-muted-foreground text-sm mb-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {room.location} • {room.campus}
                        </p>
                        <p className="text-muted-foreground text-sm mb-2">
                          {room.roomType} • {room.bedCount} bed{room.bedCount !== 1 ? 's' : ''} • {room.bathrooms} bathroom{room.bathrooms !== 1 ? 's' : ''}
                        </p>
                        <p className="text-lg font-bold text-primary mb-3">
                          ₦{room.yearlyPrice.toLocaleString()}/year
                        </p>
                        
                        {/* Amenities display with icons */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {room.amenities.slice(0, 6).map((amenityId) => (
                            <Badge key={amenityId} variant="outline" className="flex items-center gap-1">
                              {getAmenityIcon(amenityId)}
                              <span className="text-xs">{getAmenityName(amenityId)}</span>
                            </Badge>
                          ))}
                          {room.amenities.length > 6 && (
                            <Badge variant="outline" className="text-xs">
                              +{room.amenities.length - 6} more
                            </Badge>
                          )}
                        </div>
                        
                        {/* Media count */}
                        <div className="flex gap-4 mb-2">
                          <div className="flex items-center gap-1">
                            <Image className="w-4 h-4 text-blue-500" />
                            <span className="text-sm font-medium">{room.imageCount}</span>
                            <span className="text-sm text-muted-foreground">images</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Video className="w-4 h-4 text-purple-500" />
                            <span className="text-sm font-medium">{room.videoCount}</span>
                            <span className="text-sm text-muted-foreground">videos</span>
                          </div>
                        </div>
                        
                        {/* Key metrics */}
                        <div className="flex gap-6 mb-2">
                          <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4 text-blue-500" />
                            <span className="font-semibold">{room.views}</span>
                            <span className="text-sm text-muted-foreground">views</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MessageCircle className="w-4 h-4 text-green-500" />
                            <span className="font-semibold">{room.bookingRequests}</span>
                            <span className="text-sm text-muted-foreground">booking requests</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteRoom(room.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="add-room" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Room</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateRoom} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Room Name</Label>
                      <Input
                        id="name"
                        value={newRoom.name}
                        onChange={(e) => setNewRoom({...newRoom, name: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="campus">Campus</Label>
                      <Select value={newRoom.campus} onValueChange={(value) => setNewRoom({...newRoom, campus: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select campus" />
                        </SelectTrigger>
                        <SelectContent>
                          {campuses.map((campus) => (
                            <SelectItem key={campus} value={campus}>
                              {campus}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={newRoom.location}
                        onChange={(e) => setNewRoom({...newRoom, location: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="yearlyPrice">Yearly Price (₦)</Label>
                      <Input
                        id="yearlyPrice"
                        type="number"
                        value={newRoom.yearlyPrice}
                        onChange={(e) => setNewRoom({...newRoom, yearlyPrice: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="roomType">Room Type</Label>
                      <Select value={newRoom.roomType} onValueChange={(value) => setNewRoom({...newRoom, roomType: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select room type" />
                        </SelectTrigger>
                        <SelectContent>
                          {roomTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="bedCount">Number of Beds</Label>
                      <Select value={newRoom.bedCount.toString()} onValueChange={(value) => setNewRoom({...newRoom, bedCount: parseInt(value)})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Bed</SelectItem>
                          <SelectItem value="2">2 Beds</SelectItem>
                          <SelectItem value="3">3 Beds</SelectItem>
                          <SelectItem value="4">4 Beds</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newRoom.description}
                      onChange={(e) => setNewRoom({...newRoom, description: e.target.value})}
                      rows={4}
                    />
                  </div>
                  
                  <AmenitiesSelector
                    selectedAmenities={newRoom.amenities}
                    onAmenitiesChange={(amenities) => setNewRoom({...newRoom, amenities})}
                  />
                  
                  <MediaUpload
                    images={roomImages}
                    videos={roomVideos}
                    onImagesChange={setRoomImages}
                    onVideosChange={setRoomVideos}
                  />
                  
                  <Button type="submit" className="w-full">
                    Create Room Listing
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AgentDashboard;
