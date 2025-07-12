
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { availableAmenities } from "@/components/AmenitiesSelector";
import { 
  Eye, 
  Edit, 
  Trash2, 
  MapPin,
  MessageCircle,
  Image,
  Video
} from "lucide-react";

interface Room {
  id: number;
  name: string;
  campus: string;
  location: string;
  yearlyPrice: number;
  roomType: string;
  bedCount: number;
  bathrooms: number;
  views: number;
  bookingRequests: number;
  amenities: string[];
  imageCount: number;
  videoCount: number;
}

interface RoomCardProps {
  room: Room;
  onDelete: (roomId: number) => void;
}

const RoomCard = ({ room, onDelete }: RoomCardProps) => {
  const getAmenityIcon = (amenityId: string) => {
    const amenity = availableAmenities.find(a => a.id === amenityId);
    return amenity?.icon;
  };

  const getAmenityName = (amenityId: string) => {
    const amenity = availableAmenities.find(a => a.id === amenityId);
    return amenity?.name || amenityId;
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold">{room.name}</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-1 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {room.location} • {room.campus}
            </p>
            <p className="text-muted-foreground text-sm mb-2">
              {room.roomType} • {room.bedCount} bed{room.bedCount !== 1 ? 's' : ''} • {room.bathrooms} bathroom{room.bathrooms !== 1 ? 's' : ''}
            </p>
            <p className="text-lg font-bold text-primary mb-3">
              ₦{room.yearlyPrice.toLocaleString()}/year
            </p>
            
            {/* Amenities display with icons */}
            <div className="flex flex-wrap gap-2 mb-3">
              {room.amenities.slice(0, 6).map((amenityId) => (
                <Badge key={amenityId} variant="outline" className="flex items-center gap-1">
                  {getAmenityIcon(amenityId)}
                  <span className="text-xs">{getAmenityName(amenityId)}</span>
                </Badge>
              ))}
              {room.amenities.length > 6 && (
                <Badge variant="outline" className="text-xs">
                  +{room.amenities.length - 6} more
                </Badge>
              )}
            </div>
            
            {/* Media count */}
            <div className="flex gap-4 mb-2">
              <div className="flex items-center gap-1">
                <Image className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">{room.imageCount}</span>
                <span className="text-sm text-muted-foreground">images</span>
              </div>
              <div className="flex items-center gap-1">
                <Video className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium">{room.videoCount}</span>
                <span className="text-sm text-muted-foreground">videos</span>
              </div>
            </div>
            
            {/* Key metrics */}
            <div className="flex gap-6 mb-2">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-500" />
                <span className="font-semibold">{room.views}</span>
                <span className="text-sm text-muted-foreground">views</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-green-500" />
                <span className="font-semibold">{room.bookingRequests}</span>
                <span className="text-sm text-muted-foreground">booking requests</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4" />
            </Button>
           <Button 
  variant="outline" 
  size="sm"
  onClick={() => {
    console.log("RoomCard → Deleting room ID:", room.id); // ✅ Add this
    onDelete(room.id); // This must be defined
  }}
>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
export type { Room };
