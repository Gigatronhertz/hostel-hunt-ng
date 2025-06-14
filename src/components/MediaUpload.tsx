import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MediaFile, MediaUploadProps } from "@/types/media";
import { validateFiles } from "@/utils/fileValidation";
import FileUploadZone from "./media/FileUploadZone";
import MediaGrid from "./media/MediaGrid";

const MediaUpload = ({ images, videos, onImagesChange, onVideosChange }: MediaUploadProps) => {
  const { toast } = useToast();

  const processFiles = (files: File[], type: 'image' | 'video') => {
    const { validFiles, errors } = validateFiles(files, type);

    // Show errors if any
    errors.forEach(error => {
      toast({
        title: "Upload Error",
        description: error,
        variant: "destructive"
      });
    });

    // Add valid files
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
          <FileUploadZone
            type="image"
            onFileSelect={(files) => processFiles(files, 'image')}
          />
          <MediaGrid
            mediaFiles={images}
            type="image"
            onRemove={(id) => removeFile(id, 'image')}
          />
        </TabsContent>
        
        <TabsContent value="videos" className="space-y-4">
          <FileUploadZone
            type="video"
            onFileSelect={(files) => processFiles(files, 'video')}
          />
          <MediaGrid
            mediaFiles={videos}
            type="video"
            onRemove={(id) => removeFile(id, 'video')}
          />
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
