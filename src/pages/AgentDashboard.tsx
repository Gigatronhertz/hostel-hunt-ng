
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
import { 
  ArrowLeft, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  DollarSign, 
  Users, 
  MapPin,
  Bed,
  Upload
} from "lucide-react";

const AgentDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  
  // BACKEND INTEGRATION: Replace with actual agent data from Supabase
  // Example: const { data: agent } = useQuery({
  //   queryKey: ['agent'],
  //   queryFn: () => supabase.auth.getUser().then(user => 
  //     supabase.from('agents').select('*').eq('user_id', user.id).single()
  //   )
  // });
  const agentData = {
    name: "John Doe",
    email: "john@example.com",
    phone: "08012345678",
    subscriptionStatus: "active",
    monthlyFee: 5000,
    serviceFeeRate: 2.5 // percentage
  };

  // BACKEND INTEGRATION: Replace with Supabase query for agent's rooms
  // Example: const { data: rooms } = useQuery({
  //   queryKey: ['agent-rooms'],
  //   queryFn: () => supabase.from('rooms').select('*').eq('agent_id', agent.id)
  // });
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
      status: "available",
      views: 45,
      bookings: 3
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
      status: "occupied",
      views: 67,
      bookings: 8
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
    amenities: ""
  });

  const campuses = [
    "University of Lagos",
    "University of Ibadan", 
    "Ahmadu Bello University",
    "University of Nigeria, Nsukka",
    "Obafemi Awolowo University"
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
    
    // Example Supabase implementation:
    // const roomData = {
    //   ...newRoom,
    //   agent_id: agent.id,
    //   yearly_price: parseInt(newRoom.yearlyPrice),
    //   created_at: new Date().toISOString()
    // };
    // 
    // supabase.from('rooms').insert([roomData]).then(({ data, error }) => {
    //   if (error) {
    //     toast({ title: "Error", description: error.message, variant: "destructive" });
    //   } else {
    //     toast({ title: "Success", description: "Room created successfully!" });
    //     setNewRoom({ name: "", campus: "", location: "", yearlyPrice: "", roomType: "", bedCount: 1, bathrooms: 1, description: "", amenities: "" });
    //   }
    // });

    console.log("Creating room:", newRoom);
    toast({
      title: "Room Created!",
      description: "Your room has been successfully listed.",
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
      amenities: ""
    });
  };

  // BACKEND INTEGRATION: Delete room from Supabase
  const handleDeleteRoom = (roomId: number) => {
    // Example: supabase.from('rooms').delete().eq('id', roomId)
    setRooms(rooms.filter(room => room.id !== roomId));
    toast({
      title: "Room Deleted",
      description: "Room has been removed from your listings.",
    });
  };

  const totalRevenue = rooms.reduce((sum, room) => 
    room.status === "occupied" ? sum + room.yearlyPrice : sum, 0
  );

  const serviceFee = totalRevenue * (agentData.serviceFeeRate / 100);

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
            Manage your room listings and track your earnings
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="rooms">My Rooms</TabsTrigger>
            <TabsTrigger value="add-room">Add Room</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-4 gap-6">
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
                  <CardTitle className="text-sm font-medium">Occupied Rooms</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {rooms.filter(room => room.status === "occupied").length}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {rooms.reduce((sum, room) => sum + room.views, 0)}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {rooms.reduce((sum, room) => sum + room.bookings, 0)}
                  </div>
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
                      <p className="text-sm font-medium">New booking for Unity Lodge</p>
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
                          <Badge variant={room.status === "occupied" ? "default" : "secondary"}>
                            {room.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {room.location} • {room.campus}
                        </p>
                        <p className="text-muted-foreground text-sm mb-2">
                          {room.roomType} • {room.bedCount} bed{room.bedCount !== 1 ? 's' : ''} • {room.bathrooms} bathroom{room.bathrooms !== 1 ? 's' : ''}
                        </p>
                        <p className="text-lg font-bold text-primary">
                          ₦{room.yearlyPrice.toLocaleString()}/year
                        </p>
                        <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                          <span>{room.views} views</span>
                          <span>{room.bookings} bookings</span>
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
                <form onSubmit={handleCreateRoom} className="space-y-4">
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
                  
                  <div>
                    <Label htmlFor="amenities">Amenities (comma separated)</Label>
                    <Input
                      id="amenities"
                      value={newRoom.amenities}
                      onChange={(e) => setNewRoom({...newRoom, amenities: e.target.value})}
                      placeholder="WiFi, 24/7 Power, Security, etc."
                    />
                  </div>
                  
                  <div>
                    <Label>Room Images</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload images or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        PNG, JPG up to 10MB each
                      </p>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Create Room Listing
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="earnings" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Monthly Subscription</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₦{agentData.monthlyFee.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    Due on 15th of each month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Service Fee ({agentData.serviceFeeRate}%)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₦{serviceFee.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    Per successful booking
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₦{totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    From occupied rooms
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rooms.filter(room => room.status === "occupied").map((room) => (
                    <div key={room.id} className="flex justify-between items-center py-2 border-b">
                      <div>
                        <p className="font-medium">{room.name}</p>
                        <p className="text-sm text-muted-foreground">{room.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₦{room.yearlyPrice.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">
                          Fee: ₦{(room.yearlyPrice * agentData.serviceFeeRate / 100).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AgentDashboard;
