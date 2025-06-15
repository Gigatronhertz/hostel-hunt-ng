
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Wifi, 
  Zap, 
  Shield, 
  Car, 
  ChefHat, 
  WashingMachine, 
  Snowflake, 
  BookOpen, 
  Tv, 
  Bed, 
  Droplets, 
  Wind,
  Camera,
  Phone,
  Dumbbell,
  Trees
} from "lucide-react";

export interface Amenity {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: string;
}

const availableAmenities: Amenity[] = [
  { id: "wifi", name: "WiFi", icon: <Wifi className="w-4 h-4" />, category: "Technology" },
  { id: "power", name: "24/7 Power", icon: <Zap className="w-4 h-4" />, category: "Utilities" },
  { id: "prepaid_meter", name: "Prepaid Meter", icon: <Zap className="w-4 h-4" />, category: "Utilities" },
  { id: "security", name: "Security", icon: <Shield className="w-4 h-4" />, category: "Safety" },
  { id: "parking", name: "Parking", icon: <Car className="w-4 h-4" />, category: "Transportation" },
  { id: "kitchen", name: "Kitchen", icon: <ChefHat className="w-4 h-4" />, category: "Facilities" },
  { id: "laundry", name: "Laundry", icon: <WashingMachine className="w-4 h-4" />, category: "Facilities" },
  { id: "ac", name: "Air Conditioning", icon: <Snowflake className="w-4 h-4" />, category: "Comfort" },
  { id: "study", name: "Study Room", icon: <BookOpen className="w-4 h-4" />, category: "Facilities" },
  { id: "tv", name: "TV/Entertainment", icon: <Tv className="w-4 h-4" />, category: "Entertainment" },
  { id: "furnished", name: "Furnished", icon: <Bed className="w-4 h-4" />, category: "Furniture" },
  { id: "water", name: "Running Water", icon: <Droplets className="w-4 h-4" />, category: "Utilities" },
  { id: "ventilation", name: "Good Ventilation", icon: <Wind className="w-4 h-4" />, category: "Comfort" },
  { id: "cctv", name: "CCTV", icon: <Camera className="w-4 h-4" />, category: "Safety" },
  { id: "intercom", name: "Intercom", icon: <Phone className="w-4 h-4" />, category: "Technology" },
  { id: "gym", name: "Gym/Fitness", icon: <Dumbbell className="w-4 h-4" />, category: "Recreation" },
  { id: "garden", name: "Garden/Green Area", icon: <Trees className="w-4 h-4" />, category: "Environment" },
];

interface AmenitiesSelectorProps {
  selectedAmenities: string[];
  onAmenitiesChange: (amenities: string[]) => void;
}

const AmenitiesSelector = ({ selectedAmenities, onAmenitiesChange }: AmenitiesSelectorProps) => {
  const handleAmenityToggle = (amenityId: string) => {
    const newAmenities = selectedAmenities.includes(amenityId)
      ? selectedAmenities.filter(id => id !== amenityId)
      : [...selectedAmenities, amenityId];
    
    onAmenitiesChange(newAmenities);
  };

  const categories = [...new Set(availableAmenities.map(a => a.category))];

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium">Room Amenities</Label>
        <p className="text-sm text-muted-foreground mt-1">
          Select all amenities available in this room
        </p>
      </div>
      
      {categories.map((category) => (
        <div key={category} className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">{category}</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {availableAmenities
              .filter(amenity => amenity.category === category)
              .map((amenity) => (
                <div key={amenity.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity.id}
                    checked={selectedAmenities.includes(amenity.id)}
                    onCheckedChange={() => handleAmenityToggle(amenity.id)}
                  />
                  <Label
                    htmlFor={amenity.id}
                    className="flex items-center space-x-2 cursor-pointer text-sm"
                  >
                    {amenity.icon}
                    <span>{amenity.name}</span>
                  </Label>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AmenitiesSelector;
export { availableAmenities };
