
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Wifi, Zap, Droplets, Users, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const Hostels = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  // Sample hostels data
  const allHostels = [
    {
      id: 1,
      name: "Unity Lodge",
      location: "Near University of Lagos",
      price: 45000,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=500&h=300&fit=crop",
      amenities: ["WiFi", "24/7 Power", "Water Supply", "Security", "Laundry"],
      rating: 4.8,
      description: "Modern hostel with excellent facilities"
    },
    {
      id: 2,
      name: "Scholar's Haven",
      location: "Near University of Ibadan",
      price: 38000,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=300&fit=crop",
      amenities: ["WiFi", "Security", "Study Room", "24/7 Power"],
      rating: 4.6,
      description: "Quiet environment perfect for studying"
    },
    {
      id: 3,
      name: "Campus View Hostel",
      location: "Near Ahmadu Bello University",
      price: 42000,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop",
      amenities: ["WiFi", "Laundry", "24/7 Power", "Parking"],
      rating: 4.7,
      description: "Beautiful view of the campus"
    },
    {
      id: 4,
      name: "Green Valley Lodge",
      location: "Near University of Nigeria, Nsukka",
      price: 35000,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&h=300&fit=crop",
      amenities: ["WiFi", "Security", "Water Supply", "Study Room"],
      rating: 4.5,
      description: "Affordable and comfortable accommodation"
    },
    {
      id: 5,
      name: "Elite Student Residence",
      location: "Near University of Lagos",
      price: 55000,
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=500&h=300&fit=crop",
      amenities: ["WiFi", "24/7 Power", "Water Supply", "Gym", "Security", "Parking"],
      rating: 4.9,
      description: "Premium hostel with luxury amenities"
    },
    {
      id: 6,
      name: "Budget Comfort Lodge",
      location: "Near University of Ibadan",
      price: 28000,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=300&fit=crop",
      amenities: ["WiFi", "Security", "Water Supply"],
      rating: 4.2,
      description: "Affordable option with basic amenities"
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

  const filteredHostels = allHostels.filter(hostel => {
    const matchesSearch = hostel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hostel.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = !selectedLocation || hostel.location.includes(selectedLocation);
    
    const matchesPrice = !priceRange || 
      (priceRange === "under-30k" && hostel.price < 30000) ||
      (priceRange === "30k-45k" && hostel.price >= 30000 && hostel.price <= 45000) ||
      (priceRange === "above-45k" && hostel.price > 45000);

    return matchesSearch && matchesLocation && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            Hostel.ng
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/hostels" className="text-primary font-medium">
              Browse Hostels
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h1 className="text-2xl font-bold mb-6">Find Your Perfect Hostel</h1>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search hostels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="University of Lagos">University of Lagos</SelectItem>
                <SelectItem value="University of Ibadan">University of Ibadan</SelectItem>
                <SelectItem value="Ahmadu Bello University">Ahmadu Bello University</SelectItem>
                <SelectItem value="University of Nigeria, Nsukka">University of Nigeria, Nsukka</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Price range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under-30k">Under ₦30,000</SelectItem>
                <SelectItem value="30k-45k">₦30,000 - ₦45,000</SelectItem>
                <SelectItem value="above-45k">Above ₦45,000</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedLocation("");
                setPriceRange("");
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
            {filteredHostels.length} hostel{filteredHostels.length !== 1 ? 's' : ''} found
          </h2>
        </div>

        {/* Hostels Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHostels.map((hostel) => (
            <Link key={hostel.id} to={`/hostel/${hostel.id}`}>
              <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={hostel.image}
                    alt={hostel.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-sm font-medium">
                    ⭐ {hostel.rating}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{hostel.name}</h3>
                  <p className="text-muted-foreground text-sm mb-2 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {hostel.location}
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">{hostel.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {hostel.amenities.slice(0, 4).map((amenity, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        <span className="mr-1">{getAmenityIcon(amenity)}</span>
                        {amenity}
                      </Badge>
                    ))}
                    {hostel.amenities.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{hostel.amenities.length - 4} more
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      ₦{hostel.price.toLocaleString()}
                      <span className="text-sm font-normal text-muted-foreground">/month</span>
                    </span>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredHostels.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No hostels found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or clearing the filters.
            </p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedLocation("");
                setPriceRange("");
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
