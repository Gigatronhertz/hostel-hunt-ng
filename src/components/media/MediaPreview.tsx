
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
        <div className="relative">
          {mediaFile.thumbnail ? (
            <div className="relative">
              <img
                src={mediaFile.thumbnail}
                alt={`${mediaFile.name} thumbnail`}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
                </div>
              </div>
            </div>
          ) : (
            <video
              src={mediaFile.preview}
              className="w-full h-48 object-cover rounded-lg"
              controls
            />
          )}
        </div>
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
        <p>
          {mediaFile.isExisting 
            ? 'Existing file' 
            : formatFileSize(mediaFile.size)
          }
        </p>
      </div>
    </div>
  );
};

export default MediaPreview;
