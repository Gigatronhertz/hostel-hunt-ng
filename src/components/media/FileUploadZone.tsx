
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileImage, FileVideo } from "lucide-react";

interface FileUploadZoneProps {
  type: 'image' | 'video';
  onFileSelect: (files: File[]) => void;
}

const FileUploadZone = ({ type, onFileSelect }: FileUploadZoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    onFileSelect(files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    onFileSelect(files);
  };

  const IconComponent = type === 'image' ? FileImage : FileVideo;
  const acceptTypes = type === 'image' ? 'image/*' : 'video/*';
  const fileTypeText = type === 'image' ? 'PNG, JPG, WebP up to 10MB each' : 'MP4, MOV, AVI, WebM up to 100MB each';
  const buttonText = type === 'image' ? 'Choose Images' : 'Choose Videos';

  return (
    <div
      className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center transition-colors hover:border-muted-foreground/50"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <IconComponent className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
      <p className="text-sm text-muted-foreground mb-2">
        Click to upload {type}s or drag and drop
      </p>
      <p className="text-xs text-muted-foreground mb-4">
        {fileTypeText}
      </p>
      <Button
        type="button"
        variant="outline"
        onClick={() => inputRef.current?.click()}
      >
        <Upload className="w-4 h-4 mr-2" />
        {buttonText}
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept={acceptTypes}
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUploadZone;
