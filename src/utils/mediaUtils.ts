import { MediaFile } from '@/types/media';
import { generateVideoThumbnail, generateThumbnailFromUrl } from './videoThumbnail';

/**
 * Convert existing media URLs to MediaFile objects for editing
 */
export const convertUrlsToMediaFiles = (urls: string[], type: 'image' | 'video'): MediaFile[] => {
  if (!Array.isArray(urls)) return [];
  
  return urls.map((url, index) => ({
    id: `existing-${type}-${index}`,
    file: null as any, // Existing files don't have File objects
    type,
    preview: url,
    name: `existing-${type}-${index}`,
    size: 0,
    isExisting: true // Flag to identify existing vs new files
  }));
};

/**
 * Parse amenities from backend (handles both string and array formats)
 */
export const parseAmenities = (amenities: any): string[] => {
  if (!amenities) return [];
  
  // If it's already an array, return it
  if (Array.isArray(amenities)) return amenities;
  
  // If it's a string, try to parse it as JSON
  if (typeof amenities === 'string') {
    try {
      const parsed = JSON.parse(amenities);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      // If parsing fails, treat as single string
      return [amenities];
    }
  }
  
  return [];
};

/**
 * Separate new files from existing URLs
 */
export const separateMediaFiles = (mediaFiles: MediaFile[]) => {
  const newFiles = mediaFiles.filter(file => !file.isExisting && file.file);
  const existingUrls = mediaFiles.filter(file => file.isExisting).map(file => file.preview);
  
  return { newFiles, existingUrls };
};

/**
 * Process video files to generate thumbnails
 */
export const processVideoWithThumbnail = async (videoFile: MediaFile): Promise<MediaFile> => {
  if (videoFile.type !== 'video') return videoFile;
  
  try {
    let thumbnail: string;
    
    if (videoFile.isExisting) {
      // Generate thumbnail from existing video URL
      thumbnail = await generateThumbnailFromUrl(videoFile.preview);
    } else {
      // Generate thumbnail from new video file
      thumbnail = await generateVideoThumbnail(videoFile.file);
    }
    
    return {
      ...videoFile,
      thumbnail
    };
  } catch (error) {
    console.warn('Failed to generate video thumbnail:', error);
    return videoFile;
  }
};

/**
 * Get display image for a room - uses video thumbnail if no images available
 */
export const getRoomDisplayImage = (room: any): string | null => {
  // Check if there are any images
  if (room.images && room.images.length > 0) {
    return room.images[0];
  }
  
  // If no images but has videos, try to get video thumbnail
  if (room.videos && room.videos.length > 0) {
    // For existing rooms, we'll need to generate thumbnail on the fly
    return room.videos[0]; // Will be handled by video thumbnail generation
  }
  
  return null;
};