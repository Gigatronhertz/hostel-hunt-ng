import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, MapPin, Wifi, Zap, Droplets, Users, Filter, GraduationCap, Bed, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Hostels = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCampus, setSelectedCampus] = useState(searchParams.get('campus') || "");
  const [priceRange, setPriceRange] = useState("");
  const [roomType, setRoomType] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Expanded campuses list with new universities
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

  // Expanded rooms data with new campuses
  const allRooms = [
    {
      id: 1,
      name: "Unity Lodge - Single Room",
      campus: "University of Lagos",
      location: "Akoka, Lagos",
      exactLocation: "23 Unity Road, Akoka",
      yearlyPrice: 540000,
      inspectionFee: 5000,
      roomType: "Single Room",
      bedCount: 1,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=500&h=300&fit=crop",
      amenities: ["WiFi", "24/7 Power", "Water Supply", "Security", "Laundry"],
      rating: 4.8,
      description: "Modern single room with excellent facilities near UNILAG"
    },
    {
      id: 2,
      name: "Scholar's Haven - Two Bedroom",
      campus: "University of Ibadan",
      location: "Bodija, Ibadan",
      exactLocation: "15 Academic Road, Bodija",
      yearlyPrice: 456000,
      inspectionFee: 4000,
      roomType: "Two Bedroom",
      bedCount: 2,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=300&fit=crop",
      amenities: ["WiFi", "Security", "Study Room", "24/7 Power"],
      rating: 4.6,
      description: "Spacious two-bedroom apartment perfect for studying at UI"
    },
    {
      id: 3,
      name: "Campus View - One Bedroom",
      campus: "Ahmadu Bello University",
      location: "Samaru, Zaria",
      exactLocation: "12 Campus Road, Samaru",
      yearlyPrice: 504000,
      inspectionFee: 4500,
      roomType: "One Bedroom",
      bedCount: 1,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop",
      amenities: ["WiFi", "Laundry", "24/7 Power", "Parking"],
      rating: 4.7,
      description: "Beautiful one-bedroom with view of ABU campus"
    },
    {
      id: 4,
      name: "Green Valley - Shared Room",
      campus: "University of Nigeria, Nsukka",
      location: "Nsukka, Enugu",
      exactLocation: "45 University Road, Nsukka",
      yearlyPrice: 420000,
      inspectionFee: 3500,
      roomType: "Shared Room",
      bedCount: 3,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&h=300&fit=crop",
      amenities: ["WiFi", "Security", "Water Supply", "Study Room"],
      rating: 4.5,
      description: "Affordable shared room with 3 beds at UNN"
    },
    {
      id: 5,
      name: "Elite Residence - One Bedroom",
      campus: "University of Lagos",
      location: "Yaba, Lagos",
      exactLocation: "78 Herbert Macaulay Way, Yaba",
      yearlyPrice: 660000,
      inspectionFee: 6000,
      roomType: "One Bedroom",
      bedCount: 1,
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=500&h=300&fit=crop",
      amenities: ["WiFi", "24/7 Power", "Water Supply", "Gym", "Security", "Parking"],
      rating: 4.9,
      description: "Premium one-bedroom with luxury amenities near UNILAG"
    },
    {
      id: 6,
      name: "Budget Comfort - Shared Room",
      campus: "University of Ibadan",
      location: "Agbowo, Ibadan",
      exactLocation: "23 Agbowo Road, UI",
      yearlyPrice: 336000,
      inspectionFee: 3000,
      roomType: "Shared Room",
      bedCount: 2,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=300&fit=crop",
      amenities: ["WiFi", "Security", "Water Supply"],
      rating: 4.2,
      description: "Affordable shared room with 2 beds at UI"
    },
    {
      id: 7,
      name: "Agric Lodge - Single Room",
      campus: "University of Agriculture, Abeokuta",
      location: "Abeokuta, Ogun",
      exactLocation: "10 Campus Gate, UNAAB",
      yearlyPrice: 380000,
      inspectionFee: 3500,
      roomType: "Single Room",
      bedCount: 1,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=300&fit=crop",
      amenities: ["WiFi", "Security", "Water Supply", "Study Room"],
      rating: 4.3,
      description: "Comfortable single room close to UNAAB campus"
    },
    {
      id: 8,
      name: "Port City Residence",
      campus: "University of Port Harcourt",
      location: "Choba, Port Harcourt",
      exactLocation: "25 University Road, Choba",
      yearlyPrice: 520000,
      inspectionFee: 4500,
      roomType: "One Bedroom",
      bedCount: 1,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=300&fit=crop",
      amenities: ["WiFi", "24/7 Power", "Security", "Laundry", "Parking"],
      rating: 4.6,
      description: "Modern one-bedroom near UNIPORT with great amenities"
    }
  ];

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="w-3 h-3" />;
      case '24/7 power':
        return <Zap className="w-3 h-3" />;
      case 'water supply':
        return <Droplets className="w-3 h-3" />;
      default:
        return <Users className="w-3 h-3" />;
    }
  };

  const filteredRooms = allRooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCampus = !selectedCampus || room.campus === selectedCampus;
    
    const matchesPrice = !priceRange || 
      (priceRange === "under-400k" && room.yearlyPrice < 400000) ||
      (priceRange === "400k-550k" && room.yearlyPrice >= 400000 && room.yearlyPrice <= 550000) ||
      (priceRange === "above-550k" && room.yearlyPrice > 550000);

    const matchesRoomType = !roomType || room.roomType === roomType;

    return matchesSearch && matchesCampus && matchesPrice && matchesRoomType;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            Hostel.ng
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/rooms" className="text-primary font-medium">
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

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                <Link 
                  to="/rooms" 
                  className="text-lg font-medium text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Browse Rooms
                </Link>
                <Link 
                  to="/about" 
                  className="text-lg text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/contact" 
                  className="text-lg text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link 
                  to="/agent-login" 
                  className="text-lg text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Agent Login
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h1 className="text-2xl font-bold mb-6">Find Your Perfect Student Room</h1>
          
          <div className="grid md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search rooms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCampus} onValueChange={setSelectedCampus}>
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

            <Select value={roomType} onValueChange={setRoomType}>
              <SelectTrigger>
                <SelectValue placeholder="Room type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Single Room">Single Room</SelectItem>
                <SelectItem value="One Bedroom">One Bedroom</SelectItem>
                <SelectItem value="Two Bedroom">Two Bedroom</SelectItem>
                <SelectItem value="Shared Room">Shared Room</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Price range (yearly)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under-400k">Under ₦400,000</SelectItem>
                <SelectItem value="400k-550k">₦400,000 - ₦550,000</SelectItem>
                <SelectItem value="above-550k">Above ₦550,000</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedCampus("");
                setPriceRange("");
                setRoomType("");
              }}
            >
              <Filter className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">
            {filteredRooms.length} room{filteredRooms.length !== 1 ? 's' : ''} found
            {selectedCampus && ` around ${selectedCampus}`}
          </h2>
        </div>

        {/* Rooms Grid - 2 columns on mobile, 3 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {filteredRooms.map((room) => (
            <Link key={room.id} to={`/room/${room.id}`}>
              <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-32 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-white/90 backdrop-blur-sm rounded-full px-1.5 py-0.5 md:px-2 md:py-1 text-xs md:text-sm font-medium">
                    ⭐ {room.rating}
                  </div>
                  <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-white/90 backdrop-blur-sm rounded-full px-1.5 py-0.5 md:px-2 md:py-1 text-xs md:text-sm font-medium flex items-center gap-1">
                    <Bed className="w-2 h-2 md:w-3 md:h-3" />
                    {room.bedCount} bed{room.bedCount !== 1 ? 's' : ''}
                  </div>
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
                  <Badge variant="outline" className="text-xs mb-2">
                    {room.roomType}
                  </Badge>
                  <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3 line-clamp-2">{room.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-2 md:mb-3">
                    {room.amenities.slice(0, 3).map((amenity, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        <span className="mr-1">{getAmenityIcon(amenity)}</span>
                        <span className="hidden md:inline">{amenity}</span>
                      </Badge>
                    ))}
                    {room.amenities.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{room.amenities.length - 3}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm md:text-lg font-bold text-primary">
                        ₦{(room.yearlyPrice / 1000).toFixed(0)}k
                      </span>
                      <span className="text-xs font-normal text-muted-foreground block">per year</span>
                      <span className="text-xs text-muted-foreground hidden md:block">
                        Inspection: ₦{room.inspectionFee.toLocaleString()}
                      </span>
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

        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No rooms found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or selecting a different campus.
            </p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCampus("");
                setPriceRange("");
                setRoomType("");
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hostels;
