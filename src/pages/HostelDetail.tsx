
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ArrowLeft, MapPin, Wifi, Zap, Droplets, Users, MessageSquare, GraduationCap, CreditCard, Bed, Bath, Car, Play } from "lucide-react";
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

  // Updated room data with videos and media types
  const roomsData = {
    "1": {
      id: 1,
      name: "Unity Lodge - Single Room",
      campus: "University of Lagos",
      location: "Akoka, Lagos",
      exactLocation: "23 Unity Road, Akoka, Lagos State",
      yearlyPrice: 540000,
      inspectionFee: 5000,
      roomType: "Single Room",
      bedCount: 1,
      hasPrivateBathroom: true,
      hasPrivateToilet: true,
      media: [
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
          thumbnail: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=200&fit=crop"
        },
        {
          type: "video",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
          thumbnail: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=200&fit=crop"
        },
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop",
          thumbnail: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=200&fit=crop"
        },
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
          thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop"
        },
        {
          type: "video",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
          thumbnail: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=300&h=200&fit=crop"
        }
      ],
      amenities: ["WiFi", "24/7 Power", "Water Supply", "Security", "Laundry", "Study Room", "Parking"],
      rating: 4.8,
      description: "Modern single room with excellent facilities near UNILAG. This spacious room comes with a comfortable single bed, study desk, wardrobe, and private bathroom. Perfect for students who value privacy and comfort.",
      features: [
        "Spacious single room with modern furnishing",
        "Private bathroom and toilet",
        "24/7 security with CCTV surveillance", 
        "Reliable power supply with backup generator",
        "High-speed WiFi throughout the building",
        "Study desk and chair included",
        "Built-in wardrobe and storage",
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
        "Keep room and common areas clean", 
        "No pets allowed",
        "Respect other residents",
        "Annual payment required"
      ]
    },
    "2": {
      id: 2,
      name: "Scholar's Haven - Two Bedroom",
      campus: "University of Ibadan",
      location: "Bodija, Ibadan",
      exactLocation: "15 Academic Road, Bodija, Ibadan, Oyo State",
      yearlyPrice: 456000,
      inspectionFee: 4000,
      roomType: "Two Bedroom",
      bedCount: 2,
      hasPrivateBathroom: true,
      hasPrivateToilet: true,
      media: [
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop",
          thumbnail: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=200&fit=crop"
        },
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop",
          thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop"
        },
        {
          type: "video",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
          thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop"
        }
      ],
      amenities: ["WiFi", "Security", "Study Room", "24/7 Power", "Water Supply", "Laundry"],
      rating: 4.6,
      description: "Spacious two-bedroom apartment perfect for sharing or couples. Features two comfortable beds in separate rooms, shared living area, kitchen, and private bathroom facilities.",
      features: [
        "Two separate bedrooms with beds",
        "Shared living area and kitchen",
        "Private bathroom and toilet",
        "24/7 security",
        "Reliable internet connection",
        "Clean water supply",
        "Dedicated study rooms",
        "Kitchen facilities with appliances",
        "10 minutes walk to UI campus",
        "Peaceful neighborhood"
      ],
      rules: [
        "Maintain a quiet environment",
        "No loud music or noise",
        "Respect other residents",
        "Keep personal spaces clean",
        "No unauthorized visitors after 9 PM",
        "Annual payment policy",
        "Maximum 2 occupants"
      ]
    }
  };

  const room = roomsData[id as keyof typeof roomsData];

  if (!room) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Room not found</h1>
          <Link to="/rooms">
            <Button>Back to Rooms</Button>
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
    
    // BACKEND INTEGRATION: Replace with Supabase inspection booking
    // Example: const { error } = await supabase.from('inspection_bookings').insert([{...formData, room_id: id}])
    console.log("Inspection request:", {
      roomId: id,
      roomName: room.name,
      inspectionFee: room.inspectionFee,
      ...formData
    });

    toast({
      title: "Inspection Request Sent!",
      description: `We'll contact you within 24 hours. Inspection fee: ₦${room.inspectionFee.toLocaleString()}`,
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

      <div className="container mx-auto px-4 py-6">
        {/* Back Button */}
        <Link to="/rooms" className="inline-flex items-center text-primary hover:underline mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Rooms
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Media Carousel with Video Support */}
            <div className="mb-6">
              <Carousel className="w-full">
                <CarouselContent>
                  {room.media.map((item, index) => (
                    <CarouselItem key={index}>
                      <div className="relative">
                        {item.type === "video" ? (
                          <div className="relative">
                            <video
                              controls
                              className="w-full h-64 md:h-80 object-cover rounded-lg"
                              poster={item.thumbnail}
                            >
                              <source src={item.url} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                            <div className="absolute top-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                              Video Tour
                            </div>
                          </div>
                        ) : (
                          <img
                            src={item.url}
                            alt={`${room.name} view ${index + 1}`}
                            className="w-full h-64 md:h-80 object-cover rounded-lg"
                          />
                        )}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>

            {/* Room Info */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold">{room.name}</h1>
                <div className="flex items-center gap-2">
                  <span className="text-lg">⭐ {room.rating}</span>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-muted-foreground flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  {room.campus}
                </p>
                <p className="text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {room.exactLocation}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Bed className="w-3 h-3" />
                    {room.bedCount} bed{room.bedCount !== 1 ? 's' : ''}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Bath className="w-3 h-3" />
                    {room.hasPrivateBathroom ? 'Private' : 'Shared'} bathroom
                  </Badge>
                  <Badge variant="outline">
                    {room.roomType}
                  </Badge>
                </div>
              </div>

              <p className="text-lg mb-6">{room.description}</p>

              {/* Amenities */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Amenities</h2>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map((amenity, index) => (
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
                  {room.features.map((feature, index) => (
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
                  {room.rules.map((rule, index) => (
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
                  ₦{room.yearlyPrice.toLocaleString()}
                  <span className="text-base font-normal text-muted-foreground block">per year</span>
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CreditCard className="w-4 h-4" />
                  Inspection fee: ₦{room.inspectionFee.toLocaleString()}
                </div>
              </CardHeader>
              <CardContent>
                {!showMessageForm ? (
                  <div className="space-y-4">
                    {/* Free Ride Highlight */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Car className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-800">FREE Ride Included!</span>
                      </div>
                      <p className="text-sm text-green-700">
                        We provide free transportation to and from your room inspection. No extra charges!
                      </p>
                    </div>
                    
                    <Button 
                      onClick={() => setShowMessageForm(true)}
                      className="w-full"
                      size="lg"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Book Inspection
                    </Button>
                    <div className="text-sm text-muted-foreground space-y-2">
                      <p>✓ Pay ₦{room.inspectionFee.toLocaleString()} inspection fee</p>
                      <p>✓ FREE pickup and drop-off included</p>
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
                      <p className="font-medium text-blue-900">What's Included:</p>
                      <p className="text-blue-700">✓ Inspection: ₦{room.inspectionFee.toLocaleString()}</p>
                      <p className="text-blue-700">✓ FREE transportation both ways</p>
                      <p className="text-blue-700">✓ Personal tour with agent</p>
                      <p className="font-medium text-blue-900 mt-2">If approved:</p>
                      <p className="text-blue-700">Yearly fee: ₦{room.yearlyPrice.toLocaleString()}</p>
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
