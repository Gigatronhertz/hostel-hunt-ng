
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Wifi, Zap, Droplets, Users, Filter, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const Hostels = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCampus, setSelectedCampus] = useState(searchParams.get('campus') || "");
  const [priceRange, setPriceRange] = useState("");

  const campuses = [
    "University of Lagos",
    "University of Ibadan", 
    "Ahmadu Bello University",
    "University of Nigeria, Nsukka",
    "Obafemi Awolowo University",
    "University of Benin",
    "Federal University of Technology, Akure",
    "Lagos State University"
  ];

  // Sample hostels data with campus-based structure
  const allHostels = [
    {
      id: 1,
      name: "Unity Lodge",
      campus: "University of Lagos",
      location: "Akoka, Lagos",
      exactLocation: "23 Unity Road, Akoka",
      yearlyPrice: 540000,
      inspectionFee: 5000,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=500&h=300&fit=crop",
      amenities: ["WiFi", "24/7 Power", "Water Supply", "Security", "Laundry"],
      rating: 4.8,
      description: "Modern hostel with excellent facilities near UNILAG"
    },
    {
      id: 2,
      name: "Scholar's Haven",
      campus: "University of Ibadan",
      location: "Bodija, Ibadan",
      exactLocation: "15 Academic Road, Bodija",
      yearlyPrice: 456000,
      inspectionFee: 4000,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=300&fit=crop",
      amenities: ["WiFi", "Security", "Study Room", "24/7 Power"],
      rating: 4.6,
      description: "Quiet environment perfect for studying at UI"
    },
    {
      id: 3,
      name: "Campus View Hostel",
      campus: "Ahmadu Bello University",
      location: "Samaru, Zaria",
      exactLocation: "12 Campus Road, Samaru",
      yearlyPrice: 504000,
      inspectionFee: 4500,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop",
      amenities: ["WiFi", "Laundry", "24/7 Power", "Parking"],
      rating: 4.7,
      description: "Beautiful view of ABU campus"
    },
    {
      id: 4,
      name: "Green Valley Lodge",
      campus: "University of Nigeria, Nsukka",
      location: "Nsukka, Enugu",
      exactLocation: "45 University Road, Nsukka",
      yearlyPrice: 420000,
      inspectionFee: 3500,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&h=300&fit=crop",
      amenities: ["WiFi", "Security", "Water Supply", "Study Room"],
      rating: 4.5,
      description: "Affordable and comfortable accommodation at UNN"
    },
    {
      id: 5,
      name: "Elite Student Residence",
      campus: "University of Lagos",
      location: "Yaba, Lagos",
      exactLocation: "78 Herbert Macaulay Way, Yaba",
      yearlyPrice: 660000,
      inspectionFee: 6000,
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=500&h=300&fit=crop",
      amenities: ["WiFi", "24/7 Power", "Water Supply", "Gym", "Security", "Parking"],
      rating: 4.9,
      description: "Premium hostel with luxury amenities near UNILAG"
    },
    {
      id: 6,
      name: "Budget Comfort Lodge",
      campus: "University of Ibadan",
      location: "Agbowo, Ibadan",
      exactLocation: "23 Agbowo Road, UI",
      yearlyPrice: 336000,
      inspectionFee: 3000,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=300&fit=crop",
      amenities: ["WiFi", "Security", "Water Supply"],
      rating: 4.2,
      description: "Affordable option with basic amenities at UI"
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
    
    const matchesCampus = !selectedCampus || hostel.campus === selectedCampus;
    
    const matchesPrice = !priceRange || 
      (priceRange === "under-400k" && hostel.yearlyPrice < 400000) ||
      (priceRange === "400k-550k" && hostel.yearlyPrice >= 400000 && hostel.yearlyPrice <= 550000) ||
      (priceRange === "above-550k" && hostel.yearlyPrice > 550000);

    return matchesSearch && matchesCampus && matchesPrice;
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
            <Link to="/agent-login" className="text-muted-foreground hover:text-primary transition-colors">
              Agent Login
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h1 className="text-2xl font-bold mb-6">Find Your Perfect Campus Hostel</h1>
          
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
            {selectedCampus && ` around ${selectedCampus}`}
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
                  <p className="text-muted-foreground text-sm mb-1 flex items-center gap-1">
                    <GraduationCap className="w-3 h-3" />
                    {hostel.campus}
                  </p>
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
                    <div>
                      <span className="text-lg font-bold text-primary">
                        ₦{hostel.yearlyPrice.toLocaleString()}
                      </span>
                      <span className="text-sm font-normal text-muted-foreground block">per year</span>
                      <span className="text-xs text-muted-foreground">
                        Inspection: ₦{hostel.inspectionFee.toLocaleString()}
                      </span>
                    </div>
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
              Try adjusting your search criteria or selecting a different campus.
            </p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCampus("");
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
