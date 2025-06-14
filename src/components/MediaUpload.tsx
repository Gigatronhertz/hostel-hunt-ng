
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Upload, X, Image, Video, FileImage, FileVideo } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MediaFile {
  id: string;
  file: File;
  type: 'image' | 'video';
  preview: string;
  name: string;
  size: number;
}

interface MediaUploadProps {
  images: MediaFile[];
  videos: MediaFile[];
  onImagesChange: (images: MediaFile[]) => void;
  onVideosChange: (videos: MediaFile[]) => void;
}

const MediaUpload = ({ images, videos, onImagesChange, onVideosChange }: MediaUploadProps) => {
  const { toast } = useToast();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    processFiles(files, 'image');
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    processFiles(files, 'video');
  };

  const processFiles = (files: File[], type: 'image' | 'video') => {
    const maxSize = type === 'image' ? 10 * 1024 * 1024 : 100 * 1024 * 1024; // 10MB for images, 100MB for videos
    const allowedTypes = type === 'image' 
      ? ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      : ['video/mp4', 'video/mov', 'video/avi', 'video/webm'];

    const validFiles: MediaFile[] = [];

    files.forEach((file) => {
      // Validate file type
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: `Please upload ${type}s only (${allowedTypes.join(', ')})`,
          variant: "destructive"
        });
        return;
      }

      // Validate file size
      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: `${type === 'image' ? 'Images' : 'Videos'} must be under ${type === 'image' ? '10MB' : '100MB'}`,
          variant: "destructive"
        });
        return;
      }

      // Create preview URL
      const preview = URL.createObjectURL(file);
      
      const mediaFile: MediaFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        file,
        type,
        preview,
        name: file.name,
        size: file.size
      };

      validFiles.push(mediaFile);
    });

    if (validFiles.length > 0) {
      if (type === 'image') {
        onImagesChange([...images, ...validFiles]);
      } else {
        onVideosChange([...videos, ...validFiles]);
      }

      toast({
        title: "Files uploaded successfully",
        description: `${validFiles.length} ${type}(s) added`
      });
    }
  };

  const removeFile = (id: string, type: 'image' | 'video') => {
    if (type === 'image') {
      const updatedImages = images.filter(img => img.id !== id);
      onImagesChange(updatedImages);
    } else {
      const updatedVideos = videos.filter(vid => vid.id !== id);
      onVideosChange(updatedVideos);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, type: 'image' | 'video') => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    processFiles(files, type);
  };

  return (
    <div className="space-y-4">
      <Label className="text-base font-medium">Room Media</Label>
      
      <Tabs defaultValue="images" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="images" className="flex items-center gap-2">
            <Image className="w-4 h-4" />
            Images ({images.length})
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="w-4 h-4" />
            Videos ({videos.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="images" className="space-y-4">
          <div
            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center transition-colors hover:border-muted-foreground/50"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'image')}
          >
            <FileImage className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">
              Click to upload images or drag and drop
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              PNG, JPG, WebP up to 10MB each
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => imageInputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose Images
            </Button>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
          
          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.preview}
                    alt={image.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeFile(image.id, 'image')}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2 rounded-b-lg">
                    <p className="truncate">{image.name}</p>
                    <p>{formatFileSize(image.size)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="videos" className="space-y-4">
          <div
            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center transition-colors hover:border-muted-foreground/50"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'video')}
          >
            <FileVideo className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">
              Click to upload videos or drag and drop
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              MP4, MOV, AVI, WebM up to 100MB each
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => videoInputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose Videos
            </Button>
            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              multiple
              className="hidden"
              onChange={handleVideoUpload}
            />
          </div>
          
          {videos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {videos.map((video) => (
                <div key={video.id} className="relative group">
                  <video
                    src={video.preview}
                    className="w-full h-48 object-cover rounded-lg"
                    controls
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeFile(video.id, 'video')}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2 rounded-b-lg">
                    <p className="truncate">{video.name}</p>
                    <p>{formatFileSize(video.size)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* BACKEND INTEGRATION: File upload to Supabase Storage */}
      {/* Example implementation:
      const uploadFiles = async (files: MediaFile[]) => {
        const uploadPromises = files.map(async (mediaFile) => {
          const fileName = `${Date.now()}-${mediaFile.file.name}`;
          const { data, error } = await supabase.storage
            .from('room-media')
            .upload(fileName, mediaFile.file);
          
          if (error) throw error;
          return data.path;
        });
        
        return await Promise.all(uploadPromises);
      };
      */}
    </div>
  );
};

export default MediaUpload;
export type { MediaFile };
