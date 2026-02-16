import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { File02Icon } from "@hugeicons/core-free-icons";
import SendInfo from "./SendingInfo";
import { ChatItem } from "../types";

/* -------------------------------------------------
   FileMessage Component
-------------------------------------------------- */
const FileMessage: React.FC<ChatItem> = ({
  message,
  preview,
  direction,
  fileType,
  time,
}) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Determine file type
  const isImage = fileType?.startsWith("image/");
  const isPDF = fileType === "application/pdf";

  console.log(direction);

  // Bubble styling based on direction
  const bubbleBase =
    direction === "sent"
      ? "bg-[#005C4B] text-white"
      : "bg-white text-gray-900 border border-gray-200";

  return (
    <>
      <div
        className={`flex ${direction === "sent" ? "justify-end" : "justify-start"} mb-2`}
      >
        <div className="relative max-w-[260px]">
          {/* ------------------------------------------------
              IMAGE PREVIEW
          ------------------------------------------------ */}
          {isImage && (
            <div
              onClick={() => setIsPreviewOpen(true)}
              className={`relative cursor-pointer jsu rounded-2xl overflow-hidden shadow-md ${bubbleBase}`}
            >
              <img
                src={preview}
                alt="uploaded"
                className="object-cover max-h-[300px] w-full"
              />
              <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm text-white text-[11px] px-2 py-[2px] rounded-full flex items-center gap-1">
                {time}
                {direction === "sent" && <span>✓✓</span>}
              </div>
            </div>
          )}

          {/* ------------------------------------------------
              PDF FILE
          ------------------------------------------------ */}
          {isPDF && (
            <div className={`${bubbleBase} p-4 rounded-2xl shadow-md`}>
              <a
                href={preview}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3"
              >
                <div className="bg-red-500 p-3 rounded-xl flex-shrink-0">
                  <HugeiconsIcon icon={File02Icon} size={22} className="text-white" />
                </div>
                <span className="text-sm font-medium truncate">{message}</span>
              </a>
              <SendInfo time={time} />
            </div>
          )}

          {/* ------------------------------------------------
              GENERIC FILE (OTHER TYPES)
          ------------------------------------------------ */}
          {!isImage && !isPDF && (
            <div className={`${bubbleBase} p-4 rounded-2xl shadow-md`}>
              <a
                href={preview}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3"
              >
                <div className="bg-gray-500 p-3 rounded-xl flex-shrink-0">
                  <HugeiconsIcon icon={File02Icon} size={22} className="text-white" />
                </div>
                <span className="text-sm font-medium truncate">{message}</span>
              </a>
              <SendInfo time={time} />
            </div>
          )}
        </div>
      </div>

      {/* ------------------------------------------------
          FULLSCREEN IMAGE PREVIEW
      ------------------------------------------------ */}
      {isPreviewOpen && isImage && (
        <div
          onClick={() => setIsPreviewOpen(false)}
          className="fixed inset-0 bg-black flex items-center justify-center z-50 cursor-zoom-out"
        >
          <img
            src={preview}
            alt="fullscreen"
            className="max-h-[95vh] max-w-[95vw] rounded-xl shadow-lg"
          />
        </div>
      )}
    </>
  );
};

export default FileMessage;
