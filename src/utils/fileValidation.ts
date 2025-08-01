
import { MediaFile } from "@/types/media";

export const validateFiles = (files: File[], type: 'image' | 'video') => {
  const maxSize = type === 'image' ? 10 * 1024 * 1024 : 15 * 1024 * 1024; // 10MB for images, 100MB for videos
  const allowedTypes = type === 'image' 
    ? ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    : ['video/mp4', 'video/mov', 'video/avi', 'video/webm'];

  const validFiles: MediaFile[] = [];
  const errors: string[] = [];

  files.forEach((file) => {
    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      errors.push(`Invalid file type: ${file.name}. Please upload ${type}s only (${allowedTypes.join(', ')})`);
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      errors.push(`File too large: ${file.name}. ${type === 'image' ? 'Images' : 'Videos'} must be under ${type === 'image' ? '10MB' : '15MB'}`);
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

  return { validFiles, errors };
};

export const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
