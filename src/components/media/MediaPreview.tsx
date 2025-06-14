
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { MediaFile } from "@/types/media";
import { formatFileSize } from "@/utils/fileValidation";

interface MediaPreviewProps {
  mediaFile: MediaFile;
  onRemove: () => void;
}

const MediaPreview = ({ mediaFile, onRemove }: MediaPreviewProps) => {
  return (
    <div className="relative group">
      {mediaFile.type === 'image' ? (
        <img
          src={mediaFile.preview}
          alt={mediaFile.name}
          className="w-full h-32 object-cover rounded-lg"
        />
      ) : (
        <video
          src={mediaFile.preview}
          className="w-full h-48 object-cover rounded-lg"
          controls
        />
      )}
      <Button
        type="button"
        variant="destructive"
        size="sm"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={onRemove}
      >
        <X className="w-3 h-3" />
      </Button>
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2 rounded-b-lg">
        <p className="truncate">{mediaFile.name}</p>
        <p>{formatFileSize(mediaFile.size)}</p>
      </div>
    </div>
  );
};

export default MediaPreview;
