import { MediaFile } from '@/types/media';

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