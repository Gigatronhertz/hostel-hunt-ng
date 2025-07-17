
export interface MediaFile {
  id: string;
  file: File;
  type: 'image' | 'video';
  preview: string;
  name: string;
  size: number;
  isExisting?: boolean; // Flag to identify existing vs new files
}

export interface MediaUploadProps {
  images: MediaFile[];
  videos: MediaFile[];
  onImagesChange: (images: MediaFile[]) => void;
  onVideosChange: (videos: MediaFile[]) => void;
}
