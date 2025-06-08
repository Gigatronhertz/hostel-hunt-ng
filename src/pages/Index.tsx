
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Wifi, Zap, Droplets, Users, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedCampus, setSelectedCampus] = useState("");

  // Nigerian universities/campuses
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

  // Sample featured hostels data with campus-based structure
  const featuredHostels = [
    {
      id: 1,
      name: "Unity Lodge",
      campus: "University of Lagos",
      location: "Akoka, Lagos",
      exactLocation: "23 Unity Road, Akoka",
      yearlyPrice: 540000, // ₦45,000 × 12
      inspectionFee: 5000,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=500&h=300&fit=crop",
      amenities: ["WiFi", "24/7 Power", "Water Supply"],
      rating: 4.8
    },
    {
      id: 2,
      name: "Scholar's Haven",
      campus: "University of Ibadan",
      location: "Bodija, Ibadan",
      exactLocation: "15 Academic Road, Bodija",
      yearlyPrice: 456000, // ₦38,000 × 12
      inspectionFee: 4000,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=300&fit=crop",
      amenities: ["WiFi", "Security", "Study Room"],
      rating: 4.6
    },
    {
      id: 3,
      name: "Campus View Hostel",
      campus: "Ahmadu Bello University",
      location: "Samaru, Zaria",
      exactLocation: "12 Campus Road, Samaru",
      yearlyPrice: 504000, // ₦42,000 × 12
      inspectionFee: 4500,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop",
      amenities: ["WiFi", "Laundry", "24/7 Power"],
      rating: 4.7
    }
  ];

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="w-4 h-4" />;
      case '24/7 power':
        return <Zap className="w-4 h-4" />;
      case 'water supply':
        return <Droplets className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            Hostel.ng
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/hostels" className="text-muted-foreground hover:text-primary transition-colors">
              Browse Hostels
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
            <Link to="/agent-login" className="text-primary font-medium">
              Agent Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-50 to-green-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Find Your Perfect Campus Hostel
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover comfortable, affordable hostels around your campus. 
            Book an inspection today and secure your ideal student accommodation.
          </p>
          
          {/* Campus Selection and Search */}
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-muted-foreground" />
                  <Select value={selectedCampus} onValueChange={setSelectedCampus}>
                    <SelectTrigger>
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
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Enter specific area..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="border-0 focus-visible:ring-0"
                  />
                </div>
              </div>
              <Link to={`/hostels${selectedCampus ? `?campus=${encodeURIComponent(selectedCampus)}` : ''}`}>
                <Button size="lg" className="w-full">
                  <Search className="w-4 h-4 mr-2" />
                  Find Hostels
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hostels */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Hostels</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHostels.map((hostel) => (
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
                    <div className="flex flex-wrap gap-2 mb-3">
                      {hostel.amenities.slice(0, 3).map((amenity, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
                        >
                          {getAmenityIcon(amenity)}
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-primary">
                          ₦{hostel.yearlyPrice.toLocaleString()}
                        </span>
                        <span className="text-sm font-normal text-muted-foreground block">per year</span>
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
          
          <div className="text-center mt-8">
            <Link to="/hostels">
              <Button size="lg" variant="outline">
                View All Hostels
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Select Campus</h3>
              <p className="text-muted-foreground">
                Choose your university to see hostels around your campus.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Browse</h3>
              <p className="text-muted-foreground">
                Explore verified hostels with photos, amenities, and yearly pricing.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Book Inspection</h3>
              <p className="text-muted-foreground">
                Pay inspection fee and schedule a visit to see the hostel.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">4. Move In</h3>
              <p className="text-muted-foreground">
                Complete your yearly payment and secure your accommodation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2">Hostel.ng</h3>
          <p className="mb-4">Your trusted partner in finding quality student accommodation across Nigeria.</p>
          <div className="flex justify-center space-x-6 text-sm">
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
            <Link to="/agent-login" className="hover:underline">Become an Agent</Link>
            <Link to="/privacy" className="hover:underline">Privacy</Link>
            <Link to="/terms" className="hover:underline">Terms</Link>
          </div>
          <p className="text-xs mt-4 text-primary-foreground/80">
            © 2024 Hostel.ng. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
