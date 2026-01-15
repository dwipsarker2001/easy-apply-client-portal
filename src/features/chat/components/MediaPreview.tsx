// FilePreview.tsx
import { GoogleDocFreeIcons } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { X } from 'lucide-react'; // or your icon library

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ file, onRemove }) => {
  const fileType = file.type;
  console.log(fileType);
  const isImage = fileType.startsWith('image/');
  const isPDF = fileType === 'application/pdf';

  // Create preview URL for images
  const previewUrl = isImage ? URL.createObjectURL(file) : null;

  return (
    <div className="relative bg-gray-100 rounded-lg p-3">
      <button
        onClick={onRemove}
        className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full p-1"
      >
        <X size={16} />
      </button>

      {isImage && previewUrl && (
        <img
          src={previewUrl}
          alt={file.name}
          className="w-full h-64 object-cover rounded-lg"
        />
      )}

      {isPDF && (
        <div className="flex items-center gap-3 p-4">
          <HugeiconsIcon icon={GoogleDocFreeIcons} size={40} />
          <div>
            <p className="font-medium">{file.name}</p>
            <p className="text-sm text-gray-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>
      )}

      <p className="text-sm text-gray-600 mt-2 truncate">{file.name}</p>
    </div>
  );
};

export default FilePreview;
