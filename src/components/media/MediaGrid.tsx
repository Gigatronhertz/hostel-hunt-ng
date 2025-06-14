
import { MediaFile } from "@/types/media";
import MediaPreview from "./MediaPreview";

interface MediaGridProps {
  mediaFiles: MediaFile[];
  type: 'image' | 'video';
  onRemove: (id: string) => void;
}

const MediaGrid = ({ mediaFiles, type, onRemove }: MediaGridProps) => {
  if (mediaFiles.length === 0) return null;

  const gridClass = type === 'image' 
    ? "grid grid-cols-2 md:grid-cols-3 gap-4"
    : "grid grid-cols-1 md:grid-cols-2 gap-4";

  return (
    <div className={gridClass}>
      {mediaFiles.map((mediaFile) => (
        <MediaPreview
          key={mediaFile.id}
          mediaFile={mediaFile}
          onRemove={() => onRemove(mediaFile.id)}
        />
      ))}
    </div>
  );
};

export default MediaGrid;
