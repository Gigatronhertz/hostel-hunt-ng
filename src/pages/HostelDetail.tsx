import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import AdCarousel from "@/components/AdCarousel";
import {
  ArrowLeft, MapPin, Wifi, Zap, Droplets, Users, MessageSquare,
  GraduationCap, CreditCard, Bed, Bath, Car
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HostelDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await fetch(`https://hostelng.onrender.com/room-details/${id}`);
        if (!response.ok) throw new Error("Room not found");
        const data = await response.json();
        setRoom(data.room);
      } catch (error) {
        console.error("Error fetching room:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoomDetails();
  }, [id]);

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!room) return;

    try {
      // Send booking request to backend
      const response = await fetch("https://hostelng.onrender.com/book-requests", {
        method: "POST",
        body: JSON.stringify({ creatorId: room.creatorId }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Failed to send booking request");
      }

      await response.json();
    } catch (error) {
      console.error("Error sending booking request:", error);
      toast({
        title: "Error",
        description: "Failed to send booking request. Please try again.",
        variant: "destructive"
      });
      return;
    }
  
    if (!room) return;
  
    // WhatsApp destination number (in international format, no `+`)
    const whatsappNumber = "2348053258472"; // Replace with the correct agent/central WhatsApp number
  
    // Construct message
    const message = `Hello, I'm interested in inspecting the room "${room.name}" listed for ₦${room.yearlyPrice.toLocaleString()}.\n\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
      `Message: ${formData.message || "N/A"}\n` +
      `Room ID: ${room._id}\n` +
      `Agent ID: ${room.creatorId || "N/A"}\n`;
  
    // Encode for URL
    const encodedMessage = encodeURIComponent(message);
  
    // WhatsApp API URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  
    // Open WhatsApp in new tab
    window.open(whatsappURL, "_blank");
  
    toast({
      title: "Redirecting to WhatsApp",
      description: `Please complete your inspection request in WhatsApp.`,
    });
  
    // Reset form
    setFormData({ name: "", phone: "", message: "" });
    setShowMessageForm(false);
  };
  

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="w-4 h-4" />;
      case "24/7 power":
        return <Zap className="w-4 h-4" />;
      case "water supply":
        return <Droplets className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <p className="text-muted-foreground">Loading room details...</p>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold mb-4">Room not found</h1>
          <Link to="/rooms"><Button>Back to Rooms</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">RentNaija</Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/rooms" className="text-muted-foreground hover:text-primary">Browse Rooms</Link>
            <Link to="/agent-login" className="text-muted-foreground hover:text-primary">Agent Login</Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Link to="/rooms" className="inline-flex items-center text-primary hover:underline mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Rooms
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Section */}
          <div className="lg:col-span-2">
         

            {/* Room Info */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">{room.name}</h1>
              <div className="space-y-2 mb-4">
                <p className="flex items-center gap-2 text-muted-foreground">
                  <GraduationCap className="w-4 h-4" />
                  {room.campus}
                </p>
                <p className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {room.location}
                </p>
                <div className="flex gap-3 flex-wrap text-sm">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Bed className="w-3 h-3" /> {room.roomType}
                  </Badge>
                  <Badge variant="outline">₦{room.yearlyPrice.toLocaleString()} / year</Badge>
                </div>
              </div>
              {room.description && <p className="text-lg mb-6">{room.description}</p>}
            </div>

            {/* Amenities */}
            {room.amenities && room.amenities.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Amenities</h2>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map((a: string, i: number) => (
                    <Badge key={i} variant="secondary" className="text-sm">
                      {getAmenityIcon(a)} {a}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

        
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
                  Inspection fee: ₦{room.inspectionFee?.toLocaleString?.() || "5000"}
                </div>
              </CardHeader>
              <CardContent>
                {!showMessageForm ? (
                  <>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Car className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-800">FREE Ride Included!</span>
                      </div>
                      <p className="text-sm text-green-700">We provide free transportation to and from your room inspection.</p>
                    </div>

                    <Button onClick={() => setShowMessageForm(true)} className="w-full" size="lg">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Book Inspection
                    </Button>
                  </>
                ) : (
                  <form onSubmit={handleSubmitMessage} className="space-y-4">
                    <h3 className="font-semibold mb-3">Book Your Inspection</h3>
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1">Send Request</Button>
                      <Button type="button" variant="outline" onClick={() => setShowMessageForm(false)}>Cancel</Button>
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
