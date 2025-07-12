import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AmenitiesSelector from "@/components/AmenitiesSelector";
import MediaUpload from "@/components/MediaUpload";
import { MediaFile } from "@/types/media";

interface RoomFormData {
  name: string;
  campus: string;
  location: string;
  yearlyPrice: string;
  roomType: string;
  bedCount: number;
  bathrooms: number;
  description: string;
  amenities: string[];
}

interface RoomFormProps {
  onSubmit: (data: RoomFormData, images: MediaFile[], videos: MediaFile[]) => void;
}

const RoomForm = ({ onSubmit }: RoomFormProps) => {
  const [formData, setFormData] = useState<RoomFormData>({
    name: "",
    campus: "",
    location: "",
    yearlyPrice: "",
    roomType: "",
    bedCount: 1,
    bathrooms: 1,
    description: "",
    amenities: []
  });

  const [roomImages, setRoomImages] = useState<MediaFile[]>([]);
  const [roomVideos, setRoomVideos] = useState<MediaFile[]>([]);

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

  const roomTypes = [
    "Single Room",
    "One Bedroom", 
    "Two Bedroom",
    "Three Bedroom",
    "Shared Apartment"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, roomImages, roomVideos);
    
    // Reset form
    setFormData({
      name: "",
      campus: "",
      location: "",
      yearlyPrice: "",
      roomType: "",
      bedCount: 1,
      bathrooms: 1,
      description: "",
      amenities: []
    });
    setRoomImages([]);
    setRoomVideos([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Room Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="campus">Campus</Label>
          <Select value={formData.campus} onValueChange={(value) => setFormData({...formData, campus: value})}>
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
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="yearlyPrice">Yearly Price (₦)</Label>
          <Input
            id="yearlyPrice"
            type="number"
            value={formData.yearlyPrice}
            onChange={(e) => setFormData({...formData, yearlyPrice: e.target.value})}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="roomType">Room Type</Label>
          <Select value={formData.roomType} onValueChange={(value) => setFormData({...formData, roomType: value})}>
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
        
{/*         <div>
          <Label htmlFor="bedCount">Number of Beds</Label>
          <Select value={formData.bedCount.toString()} onValueChange={(value) => setFormData({...formData, bedCount: parseInt(value)})}>
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
        </div> */}
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          rows={4}
        />
      </div>
      
      <AmenitiesSelector
        selectedAmenities={formData.amenities}
        onAmenitiesChange={(amenities) => setFormData({...formData, amenities})}
      />
      
      <MediaUpload
        images={roomImages}
        videos={roomVideos}
        onImagesChange={setRoomImages}
        onVideosChange={setRoomVideos}
      />
      
      <Button type="submit" className="w-full">
        Create Room Listing
      </Button>
    </form>
  );
};

export default RoomForm;
export type { RoomFormData };
