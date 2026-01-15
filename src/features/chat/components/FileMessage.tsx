import {
  File02Icon,
  FileAudioIcon,
  Image02Icon,
  VideoReplayIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import React from 'react';
import SendInfo from './SendingInfo';

interface FileMessageProps {
  file: File;
  direction?: 'sent' | 'received';
}

const FileMessage: React.FC<FileMessageProps> = ({
  file,
  direction = 'sent',
}) => {
  const fileURL = React.useMemo(() => URL.createObjectURL(file), [file]);
  const isImage = file.type.startsWith('image/');
  const isVideo = file.type.startsWith('video/');
  const isAudio = file.type.startsWith('audio/');

  React.useEffect(() => {
    return () => URL.revokeObjectURL(fileURL);
  }, [fileURL]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = () => {
    if (isImage) return Image02Icon;
    if (isVideo) return VideoReplayIcon;
    if (isAudio) return FileAudioIcon;
    return File02Icon;
  };

  const getFileColor = () => {
    if (isImage) return 'bg-blue-500';
    if (isVideo) return 'bg-purple-500';
    if (isAudio) return 'bg-green-500';
    return 'bg-gray-500';
  };

  return (
    <div className={direction === 'sent' ? 'flex flex-row-reverse' : 'flex'}>
      <div className="relative max-w-[280px]">
        {isImage ? (
          <div className="bg-slate-700 p-2 rounded-tl-lg rounded-bl-lg rounded-br-lg group relative">
            <img
              src={fileURL}
              alt={file.name}
              className="w-40 cursor-pointer hover:opacity-95 transition-opacity rounded-lg"
            />
            {/* File info overlay */}
          </div>
        ) : (
          <div
            className={
              direction === 'sent'
                ? 'bg-slate-700 rounded-2xl rounded-tr-md shadow-md overflow-hidden'
                : 'bg-white rounded-2xl rounded-tl-md shadow-md overflow-hidden'
            }
          >
            <a
              href={fileURL}
              download={file.name}
              className="flex items-start gap-3 p-4 hover:bg-black/5 transition-colors group"
            >
              {/* File icon */}
              <div
                className={`${getFileColor()} rounded-xl p-3 flex-shrink-0 group-hover:scale-105 transition-transform`}
              >
                <HugeiconsIcon
                  icon={getFileIcon()}
                  size={24}
                  className="text-white"
                />
              </div>

              {/* File details */}
              <div className="flex-1 min-w-0">
                <p
                  className={`font-medium text-sm truncate ${direction === 'sent' ? 'text-white' : 'text-gray-900'}`}
                >
                  {file.name}
                </p>
                <p
                  className={`text-xs mt-1 ${direction === 'sent' ? 'text-gray-300' : 'text-gray-500'}`}
                >
                  {formatFileSize(file.size)}
                </p>
              </div>

              {/* Download indicator */}
              <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${direction === 'sent' ? 'bg-white/10' : 'bg-gray-100'}`}
                >
                  <svg
                    className={
                      direction === 'sent' ? 'text-white' : 'text-gray-600'
                    }
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </div>
              </div>
            </a>
          </div>
        )}

        {/* Tail for non-image files */}
        <div
          className={
            direction === 'sent'
              ? 'absolute -right-1 top-0 w-3 h-3 bg-slate-700'
              : 'absolute -left-1 top-0 w-3 h-3 bg-white'
          }
          style={{
            clipPath:
              direction === 'sent'
                ? 'polygon(0 0, 100% 0, 0 100%)'
                : 'polygon(100% 0, 0 0, 100% 100%)',
          }}
        />

        {/* Sending Info */}
        {direction === 'sent' && <SendInfo />}
      </div>
    </div>
  );
};

export default FileMessage;
