import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Wifi, Zap, Droplets, Users, GraduationCap, Bed } from "lucide-react";
import AdCarousel from "@/components/AdCarousel";

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const Index = () => {
  const [selectedCampus, setSelectedCampus] = useState("");
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const navigate = useNavigate();

  // Expanded campuses list to match Hostels page
  const campuses = [
    "University of Lagos",
    "University of Ibadan", 
    "Ahmadu Bello University",
    "University of Nigeria Nsukka",
    "Obafemi Awolowo University",
    "University of Benin",
    "Federal University of Technology, Akure",
    "Lagos State University",
    "Federal University of Agriculture Abeokuta",
    "Federal University of Agriculture Makurdi",
    "University of Port Harcourt",
    "Federal University of Technology, Minna",
    "Bayero University Kano"
  ];

  // BACKEND INTEGRATION: Replace with Supabase query
  // Example: const { data: featuredRooms } = useQuery({
  //   queryKey: ['featured-rooms'],
  //   queryFn: () => supabase.from('rooms').select('*').eq('featured', true).limit(6)
  // });


useEffect(() => {
  const fetchRooms = async () => {
    try {
      const res = await fetch("https://hostelng.onrender.com/all-rooms", {
        credentials: "include", // only if you're using cookies/session
      });

      if (!res.ok) {
        throw new Error("Failed to fetch rooms");
      }

      const data = await res.json();
      //console.log("Fetched rooms:", data); // ✅ Just for debugging
     setFeaturedRooms(data.rooms); // ✅ correct
 // Update state
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  fetchRooms();
}, []);
  

  const handleSearchRooms = () => {
    // BACKEND INTEGRATION: Filter rooms by campus using Supabase
    if (selectedCampus) {
      navigate(`/rooms?campus=${encodeURIComponent(selectedCampus)}`);
    } else {
      navigate('/rooms');
    }
  };




  

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            LodgeHub
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/rooms" className="text-muted-foreground hover:text-primary transition-colors">
              Browse Rooms
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
            <Link to="/agent-login" className="text-muted-foreground hover:text-primary transition-colors">
              Agent Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Perfect
            <span className="text-primary block">Student Room</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover comfortable, affordable student rooms near your campus. From single rooms to shared apartments, find the perfect space for your university journey.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto mb-8">
            <Select value={selectedCampus} onValueChange={setSelectedCampus}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select your campus" />
              </SelectTrigger>
              <SelectContent>
                {campuses.map((campus) => (
                  <SelectItem key={campus} value={campus}>
                    {campus}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleSearchRooms} size="lg" className="md:px-8">
              <Search className="w-4 h-4 mr-2" />
              Find Rooms
            </Button>
          </div>
        </div>
      </section>

     

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>1. Search by Campus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Select your university and browse available rooms in your area. Filter by room type, price, and amenities.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>2. Book Inspection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Pay a small inspection fee and schedule a visit to see the room in person before committing.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>3. Move In</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Complete your yearly payment and move into your new room. Enjoy a safe, comfortable living space near campus.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>   <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <AdCarousel />
        </div>
      </section>



      {/* Featured Rooms - 2 per row on all screen sizes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Rooms</h2>
            <Link to="/rooms">
              <Button variant="outline">View All Rooms</Button>
            </Link>
          </div>
          
          {/* Grid with 2 columns on all screen sizes */}
          <div className="grid grid-cols-2 gap-3 md:gap-6 max-w-4xl mx-auto">
            {featuredRooms.map((room) => (
              <Link key={room._id} to={`/room/${room._id}`}>
                <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="relative overflow-hidden rounded-t-lg">
                   <img
  src={room.images[0]}  // Changed from room.image to room.images[0]
  alt={room.name}
  className="w-full h-32 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
/>
                   
               
                  </div>
                  <CardContent className="p-2 md:p-4">
                    <h3 className="font-semibold text-sm md:text-lg mb-1 line-clamp-1">{room.name}</h3>
                    <p className="text-muted-foreground text-xs md:text-sm mb-1 flex items-center gap-1">
                      <GraduationCap className="w-2 h-2 md:w-3 md:h-3 flex-shrink-0" />
                      <span className="line-clamp-1">{room.campus}</span>
                    </p>
                    <p className="text-muted-foreground text-xs md:text-sm mb-2 flex items-center gap-1">
                      <MapPin className="w-2 h-2 md:w-3 md:h-3 flex-shrink-0" />
                      <span className="line-clamp-1">{room.location}</span>
                    </p>
                    <Badge variant="outline" className="text-xs mb-2 md:mb-3">
                      {room.roomType}
                    </Badge>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm md:text-lg font-bold text-primary">
                          ₦{(room.yearlyPrice / 1000).toFixed(0)}k
                        </span>
                        <span className="text-xs font-normal text-muted-foreground block">per year</span>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs md:text-sm">
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">LodgeHub</h3>
              <p className="text-muted-foreground">
                Your trusted platform for finding quality student accommodation across Nigerian universities.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">For Students</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/rooms">Browse Rooms</Link></li>
                <li><Link to="/about">How It Works</Link></li>
                <li><Link to="/contact">Safety Guide</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">For Agents</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/agent-login">Agent Login</Link></li>
                <li><Link to="/agent-dashboard">List Your Room</Link></li>
                <li><Link to="/about">Agent Guide</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/about">FAQ</Link></li>
                <li><Link to="/about">Terms & Conditions</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 LodgeHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
