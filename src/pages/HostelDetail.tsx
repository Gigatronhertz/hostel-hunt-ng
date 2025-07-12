import { useState, useEffect } from "react";
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
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await fetch(`https://hostelng.onrender.com/room/${id}`);
        if (!response.ok) {
          throw new Error('Room not found');
        }
        const data = await response.json();
        setRoom(data);
      } catch (error) {
        console.error('Error fetching room:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [id]);

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
    
    // Prepare WhatsApp message
    const whatsappMessage = `Hello, I'm interested in booking an inspection for ${room.name} at ${room.campus}. Here are my details:
    
Name: ${formData.name}
Phone: ${formData.phone}
Message: ${formData.message || 'No additional message'}

Room Details:
- Location: ${room.location}
- Price: ₦${room.yearlyPrice.toLocaleString()} per year
- Type: ${room.roomType}
- Agent ID: ${room.creatorId}`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Open WhatsApp with the message
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');

    toast({
      title: "WhatsApp Opened!",
      description: "Please send the message to book your inspection.",
    });

    // Reset form
    setFormData({ name: "", phone: "", message: "" });
    setShowMessageForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading room details...</h1>
        </div>
      </div>
    );
  }

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

  // Prepare media items for carousel
  const mediaItems = [
    ...(room.images?.map(image => ({
      type: "image",
      url: image,
      thumbnail: image
    })) || []),
    ...(room.videos?.map(video => ({
      type: "video",
      url: video,
      thumbnail: room.images?.[0] || ""
    })) || [])
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header and other existing code remains the same */}

      <div className="container mx-auto px-4 py-6">
        <Link to="/rooms" className="inline-flex items-center text-primary hover:underline mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Rooms
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Media Carousel */}
            <div className="mb-6">
              <Carousel className="w-full">
                <CarouselContent>
                  {mediaItems.length > 0 ? (
                    mediaItems.map((item, index) => (
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
                    ))
                  ) : (
                    <CarouselItem>
                      <div className="w-full h-64 md:h-80 bg-gray-100 rounded-lg flex items-center justify-center">
                        <p>No media available</p>
                      </div>
                    </CarouselItem>
                  )}
                </CarouselContent>
                {mediaItems.length > 1 && (
                  <>
                    <CarouselPrevious />
                    <CarouselNext />
                  </>
                )}
              </Carousel>
            </div>

            {/* Room Info - Update all fields to use the fetched room data */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold">{room.name}</h1>
                <div className="flex items-center gap-2">
                  <span className="text-lg">⭐ {room.rating || 'N/A'}</span>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-muted-foreground flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  {room.campus}
                </p>
                <p className="text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {room.location}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Bed className="w-3 h-3" />
                    {room.bedCount || 1} bed{room.bedCount !== 1 ? 's' : ''}
                  </Badge>
                  <Badge variant="outline">
                    {room.roomType}
                  </Badge>
                </div>
              </div>

              <p className="text-lg mb-6">{room.description}</p>

              {/* Amenities */}
              {room.amenities?.length > 0 && (
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
              )}

              {/* Features and Rules sections can be added if needed */}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl">
                  ₦{(room.yearlyPrice || 0).toLocaleString()}
                  <span className="text-base font-normal text-muted-foreground block">per year</span>
                </CardTitle>
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

                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1">
                        Send to WhatsApp
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
