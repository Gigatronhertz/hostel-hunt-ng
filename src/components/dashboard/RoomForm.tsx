import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MediaUpload from '@/components/MediaUpload';
import AmenitiesSelector from '@/components/AmenitiesSelector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MediaFile } from '@/types/media';
import { convertUrlsToMediaFiles, parseAmenities, separateMediaFiles } from '@/utils/mediaUtils';

interface RoomFormProps {
  onSubmit: (roomData: any) => void;
  loading: boolean;
  editMode?: boolean;
  initialData?: any;
  onCancel?: () => void;
}

const RoomForm: React.FC<RoomFormProps> = ({ onSubmit, loading, editMode = false, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    yearlyPrice: '',
    campus: '',
    location: '',
    roomType: '',
    description: '',
    amenities: [] 
  });

  const [roomImages, setRoomImages] = useState<MediaFile[]>([]);
  const [roomVideos, setRoomVideos] = useState<MediaFile[]>([]);

  // Pre-populate form when in edit mode
  useEffect(() => {
    if (editMode && initialData) {
      // Parse amenities properly
      const parsedAmenities = parseAmenities(initialData.amenities);
      
      setFormData({
        name: initialData.name || '',
        yearlyPrice: initialData.yearlyPrice,
        campus: initialData.campus || '',
        location: initialData.location || '',
        roomType: initialData.roomType || '',
        description: initialData.description || '',
        amenities: parsedAmenities
      });

      // Convert existing media URLs to MediaFile objects
      const existingImages = convertUrlsToMediaFiles(initialData.images || [], 'image');
      const existingVideos = convertUrlsToMediaFiles(initialData.videos || [], 'video');
      
      setRoomImages(existingImages);
      setRoomVideos(existingVideos);
    } else {
      // Reset for new room
      setRoomImages([]);
      setRoomVideos([]);
    }
  }, [editMode, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Separate new files from existing URLs
    const { newFiles: newImageFiles, existingUrls: existingImageUrls } = separateMediaFiles(roomImages);
    const { newFiles: newVideoFiles, existingUrls: existingVideoUrls } = separateMediaFiles(roomVideos);
    
    // Get only new files for upload
    const newFiles = [
      ...newImageFiles.map(img => img.file),
      ...newVideoFiles.map(vid => vid.file)
    ].filter(Boolean);
    
    const roomData = {
      ...formData,
      yearlyPrice: Number(formData.yearlyPrice),
      //files: newFiles, // Only new files for upload
      images: existingImageUrls, // Preserve existing images
      videos: existingVideoUrls, // Preserve existing videos
      _id: editMode ? initialData?._id : undefined
    };
    
    onSubmit(roomData);
  };


  const campuses = [
    "University of Lagos",
    "University of Ibadan", 
    "Ahmadu Bello University",
    "University of Nigeria Nsukka",
    "Obafemi Awolowo University",
    "University of Benin",
    "Federal University of Technology, Akure",
    "Lagos State University",
    "Federal University of Agriculture Abeokuta",
    "Federal University of Agriculture Makurdi",
    "University of Port Harcourt",
    "Federal University of Technology, Minna",
    "Bayero University Kano"
  ];

  const roomTypes = [
    "Single Room",
    "One Bedroom", 
    "Two Bedroom",
    "Three Bedroom",
    "Shared Apartment"
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editMode ? 'Edit Room' : 'Add New Room'}</CardTitle>
      </CardHeader>
      <CardContent>
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
          
            <div className="space-y-2">
              <Label>Images & Videos {editMode ? '(Upload new files to replace existing)' : ''}</Label>
              <MediaUpload 
                images={roomImages}
                videos={roomVideos}
                onImagesChange={setRoomImages}
                onVideosChange={setRoomVideos}
              />
              {editMode && (
                <p className="text-sm text-muted-foreground">
                  {roomImages.length > 0 || roomVideos.length > 0 
                    ? 'Existing media shown above. Add new files to include them alongside existing ones.'
                    : 'No media selected. Add new files or existing media will be kept.'
                  }
                </p>
              )}
            </div>
          
          <div className="flex gap-2">
            {editMode && onCancel && (
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? (editMode ? 'Updating...' : 'Creating...') : (editMode ? 'Update Room' : 'Create Room')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RoomForm;