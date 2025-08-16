import { useState, useEffect } from 'react';
import { generateThumbnailFromUrl } from '@/utils/videoThumbnail';

interface VideoThumbnailProps {
  videoUrl: string;
  alt?: string;
  className?: string;
  showPlayButton?: boolean;
  onClick?: () => void;
}

const VideoThumbnail = ({ 
  videoUrl, 
  alt = "Video thumbnail", 
  className = "", 
  showPlayButton = true,
  onClick 
}: VideoThumbnailProps) => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateThumbnail = async () => {
      try {
        const thumbnailUrl = await generateThumbnailFromUrl(videoUrl);
        setThumbnail(thumbnailUrl);
      } catch (error) {
        console.warn('Failed to generate video thumbnail:', error);
      } finally {
        setLoading(false);
      }
    };

    generateThumbnail();

    // Cleanup thumbnail URL on unmount
    return () => {
      if (thumbnail) {
        URL.revokeObjectURL(thumbnail);
      }
    };
  }, [videoUrl]);

  if (loading) {
    return (
      <div className={`bg-muted animate-pulse ${className}`}>
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-muted-foreground text-sm">Loading...</div>
        </div>
      </div>
    );
  }

  if (!thumbnail) {
    return (
      <div className={`bg-muted ${className}`}>
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-muted-foreground text-sm">Video</div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative cursor-pointer ${className}`}
      onClick={onClick}
    >
      <img
        src={thumbnail}
        alt={alt}
        className="w-full h-full object-cover"
      />
      {showPlayButton && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
            <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoThumbnail;