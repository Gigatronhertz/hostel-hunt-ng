import { useState, useEffect } from 'react';
import { generateThumbnailFromUrl } from '@/utils/videoThumbnail';
import { Skeleton } from '@/components/ui/skeleton';

interface RoomDisplayImageProps {
  room: {
    _id: string;
    name: string;
    images?: string[];
    videos?: string[];
  };
  className?: string;
  alt?: string;
}

const RoomDisplayImage = ({ room, className = "", alt }: RoomDisplayImageProps) => {
  const [displaySrc, setDisplaySrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getDisplayImage = async () => {
      setLoading(true);
      setError(false);

      // First priority: use regular image if available
      if (room.images && room.images.length > 0) {
        setDisplaySrc(room.images[0]);
        setLoading(false);
        return;
      }

      // Second priority: generate thumbnail from video if available
      if (room.videos && room.videos.length > 0) {
        try {
          const thumbnail = await generateThumbnailFromUrl(room.videos[0]);
          setDisplaySrc(thumbnail);
        } catch (error) {
          console.warn('Failed to generate video thumbnail:', error);
          setError(true);
          setDisplaySrc('/placeholder.svg'); // Fallback to placeholder
        }
        setLoading(false);
        return;
      }

      // Final fallback: placeholder
      setDisplaySrc('/placeholder.svg');
      setLoading(false);
    };

    getDisplayImage();
  }, [room.images, room.videos]);

  if (loading) {
    return <Skeleton className={className} />;
  }

  if (error || !displaySrc) {
    return (
      <div className={`bg-muted flex items-center justify-center ${className}`}>
        <span className="text-muted-foreground text-sm">No Image</span>
      </div>
    );
  }

  return (
    <img
      src={displaySrc}
      alt={alt || room.name}
      className={className}
      onError={() => {
        setError(true);
        setDisplaySrc('/placeholder.svg');
      }}
    />
  );
};

export default RoomDisplayImage;