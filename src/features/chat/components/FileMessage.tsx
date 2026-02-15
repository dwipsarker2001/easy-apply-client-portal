import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { File02Icon } from '@hugeicons/core-free-icons';
import { ChatFileItem } from '../types';
import SendInfo from './SendingInfo';

// FileMessage component
const FileMessage: React.FC<ChatFileItem> = ({
  name,
  preview,
  direction,
  fileType,
  time,
}) => {
  // some required stats
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const isImage = fileType?.startsWith('image/');
  const isPDF = fileType === 'application/pdf';
  const fileURL = preview || '';
  const bubbleBase = direction === 'sent' ? 'bg-[#005C4B] text-white' : 'bg-white text-gray-900';

  return (
    <>
      <div
        className={`flex ${
          direction === 'sent' ? 'justify-end' : 'justify-start'
        }`}
      >
        <div className="relative max-w-[260px]">
        {/*------------------------------------------------
                        IMAGE 
        ------------------------------------------------ */}
          {isImage && (
            <div
              onClick={() => setIsPreviewOpen(true)}
              className="relative cursor-pointer"
            >
              <img
                src={fileURL}
                alt={name}
                className="rounded-2xl object-cover max-h-[300px] shadow-md"
              />

              <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm text-white text-[11px] px-2 py-[2px] rounded-full flex items-center gap-1">
                {time}
                {direction === 'sent' && <span>✓✓</span>}
              </div>
            </div>
          )}

          {/*------------------------------------------------
                          PDF File
          ------------------------------------------------ */}
          {isPDF && (
            <div className={`${bubbleBase} p-4 rounded-2xl shadow-md`}>
              <a
                href={fileURL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3"
              >
                <div className="bg-red-500 p-3 rounded-xl">
                  <HugeiconsIcon
                    icon={File02Icon}
                    size={22}
                    className="text-white"
                  />
                </div>
                <span className="text-sm font-medium truncate">
                  {name}
                </span>
              </a>

              <SendInfo time={time} />
            </div>
          )}
        </div>
      </div>

      {/*------------------------------------------------
                      FULLSCREEN IMAGE 
      ------------------------------------------------ */}
      {isPreviewOpen && isImage && (
        <div
          onClick={() => setIsPreviewOpen(false)}
          className="fixed inset-0 bg-black flex items-center justify-center z-50"
        >
          <img
            src={fileURL}
            alt={name}
            className="max-h-[95vh] max-w-[95vw] rounded-xl"
          />
        </div>
      )}
    </>
  );
};

export default FileMessage;
