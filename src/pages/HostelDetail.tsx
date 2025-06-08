
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, MapPin, Wifi, Zap, Droplets, Users, MessageSquare, GraduationCap, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HostelDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });

  // Sample hostel data with campus-based structure
  const hostelsData = {
    "1": {
      id: 1,
      name: "Unity Lodge",
      campus: "University of Lagos",
      location: "Akoka, Lagos",
      exactLocation: "23 Unity Road, Akoka, Lagos State",
      yearlyPrice: 540000,
      inspectionFee: 5000,
      images: [
        "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop"
      ],
      amenities: ["WiFi", "24/7 Power", "Water Supply", "Security", "Laundry", "Study Room", "Parking"],
      rating: 4.8,
      description: "Unity Lodge offers modern accommodation for students at the University of Lagos. Our facility is designed with the student's comfort and academic success in mind. Located within walking distance of the main campus, we provide a safe, clean, and conducive environment for learning and personal growth.",
      features: [
        "Spacious rooms with modern furnishing",
        "24/7 security with CCTV surveillance", 
        "Reliable power supply with backup generator",
        "High-speed WiFi throughout the building",
        "Shared kitchen facilities",
        "Reading rooms and study areas",
        "Laundry facilities",
        "Ample parking space",
        "5 minutes walk to UNILAG main gate",
        "Close to campus facilities and libraries"
      ],
      rules: [
        "No smoking within the premises",
        "Visitors must be registered at reception",
        "Quiet hours from 10 PM to 6 AM",
        "Keep common areas clean", 
        "No pets allowed",
        "Respect other residents",
        "Annual payment required"
      ]
    },
    "2": {
      id: 2,
      name: "Scholar's Haven",
      campus: "University of Ibadan",
      location: "Bodija, Ibadan",
      exactLocation: "15 Academic Road, Bodija, Ibadan, Oyo State",
      yearlyPrice: 456000,
      inspectionFee: 4000,
      images: [
        "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop"
      ],
      amenities: ["WiFi", "Security", "Study Room", "24/7 Power", "Water Supply", "Laundry"],
      rating: 4.6,
      description: "Scholar's Haven provides a quiet and conducive environment for serious-minded students. Located close to the University of Ibadan, our hostel is perfect for students who prioritize their studies while enjoying comfortable accommodation.",
      features: [
        "Quiet study environment",
        "Well-furnished rooms",
        "24/7 security",
        "Reliable internet connection",
        "Clean water supply",
        "Dedicated study rooms",
        "Kitchen facilities",
        "10 minutes walk to UI campus",
        "Peaceful neighborhood"
      ],
      rules: [
        "Maintain a quiet environment",
        "No loud music or noise",
        "Respect other residents",
        "Keep personal spaces clean",
        "No unauthorized visitors after 9 PM",
        "Annual payment policy"
      ]
    }
  };

  const hostel = hostelsData[id as keyof typeof hostelsData];

  if (!hostel) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Hostel not found</h1>
          <Link to="/hostels">
            <Button>Back to Hostels</Button>
          </Link>
        </div>
      </div>
    );
  }

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

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send the message to the backend
    console.log("Inspection request:", {
      hostelId: id,
      hostelName: hostel.name,
      inspectionFee: hostel.inspectionFee,
      ...formData
    });

    toast({
      title: "Inspection Request Sent!",
      description: `We'll contact you within 24 hours. Inspection fee: ₦${hostel.inspectionFee.toLocaleString()}`,
    });

    // Reset form
    setFormData({ name: "", phone: "", message: "" });
    setShowMessageForm(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-10">
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
            <Link to="/agent-login" className="text-muted-foreground hover:text-primary transition-colors">
              Agent Login
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Back Button */}
        <Link to="/hostels" className="inline-flex items-center text-primary hover:underline mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Hostels
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="md:col-span-2">
                <img
                  src={hostel.images[0]}
                  alt={hostel.name}
                  className="w-full h-64 md:h-80 object-cover rounded-lg"
                />
              </div>
              {hostel.images.slice(1).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${hostel.name} view ${index + 2}`}
                  className="w-full h-32 md:h-40 object-cover rounded-lg"
                />
              ))}
            </div>

            {/* Hostel Info */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold">{hostel.name}</h1>
                <div className="flex items-center gap-2">
                  <span className="text-lg">⭐ {hostel.rating}</span>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-muted-foreground flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  {hostel.campus}
                </p>
                <p className="text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {hostel.exactLocation}
                </p>
              </div>

              <p className="text-lg mb-6">{hostel.description}</p>

              {/* Amenities */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Amenities</h2>
                <div className="flex flex-wrap gap-2">
                  {hostel.amenities.map((amenity, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      <span className="mr-1">{getAmenityIcon(amenity)}</span>
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Features</h2>
                <ul className="grid md:grid-cols-2 gap-2">
                  {hostel.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rules */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">House Rules</h2>
                <ul className="space-y-2">
                  {hostel.rules.map((rule, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl">
                  ₦{hostel.yearlyPrice.toLocaleString()}
                  <span className="text-base font-normal text-muted-foreground block">per year</span>
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CreditCard className="w-4 h-4" />
                  Inspection fee: ₦{hostel.inspectionFee.toLocaleString()}
                </div>
              </CardHeader>
              <CardContent>
                {!showMessageForm ? (
                  <div className="space-y-4">
                    <Button 
                      onClick={() => setShowMessageForm(true)}
                      className="w-full"
                      size="lg"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Book Inspection
                    </Button>
                    <div className="text-sm text-muted-foreground space-y-2">
                      <p>✓ Pay ₦{hostel.inspectionFee.toLocaleString()} inspection fee</p>
                      <p>✓ Schedule physical inspection</p>
                      <p>✓ Yearly payment upon approval</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitMessage} className="space-y-4">
                    <h3 className="font-semibold mb-3">Book Your Inspection</h3>
                    
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message (Optional)</Label>
                      <Textarea
                        id="message"
                        placeholder="Any specific requirements or questions..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        rows={3}
                      />
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg text-sm">
                      <p className="font-medium text-blue-900">Total Cost:</p>
                      <p className="text-blue-700">Inspection: ₦{hostel.inspectionFee.toLocaleString()}</p>
                      <p className="text-blue-700">Yearly fee: ₦{hostel.yearlyPrice.toLocaleString()}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1">
                        Send Request
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setShowMessageForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelDetail;
