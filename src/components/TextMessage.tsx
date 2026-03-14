import { ChatItem } from '@/features/chat/types';
import { TickDouble01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import React from 'react';

const TextMessage: React.FC<ChatItem> = ({
  message,
  time,
  direction = 'sent',
}) => {
  const isSent = direction === 'sent';

  return (
    <div
      className={`${isSent ? 'flex flex-row-reverse ml-auto' : 'flex'} max-w-[80%]`}
    >
      <div className="relative">
        <div
          className={
            isSent
              ? 'relative bg-slate-700 p-2 px-3 text-white text-md rounded-xl rounded-tr-none'
              : 'relative bg-white p-2 px-3 rounded-lg rounded-tl-none'
          }
        >
          <span className="break-words whitespace-pre-wrap leading-snug">
            {message}
            {/* Inline phantom spacer — reserves space so time never overlaps text */}
            <span
              aria-hidden="true"
              className={`inline-flex invisible text-xs gap-1 ml-2 align-bottom ${isSent ? '' : ''}`}
            >
              {time}
              {isSent && <HugeiconsIcon size={14} icon={TickDouble01Icon} />}
            </span>
          </span>

          {/* Actual time — absolutely positioned to bottom-right */}
          <span
            className={`absolute bottom-2 right-3 flex items-end gap-1 text-xs font-thin ${
              isSent ? 'text-white/60' : 'text-gray-400'
            }`}
          >
            <span>{time}</span>
            {isSent && <HugeiconsIcon size={14} icon={TickDouble01Icon} />}
          </span>
        </div>

        {/* Tail */}
        <div
          className={
            isSent
              ? 'absolute -right-1 top-0 w-3 h-3 bg-slate-700'
              : 'absolute -left-1 top-0 w-3 h-3 bg-white'
          }
          style={{
            clipPath: isSent
              ? 'polygon(0 0, 100% 0, 0 100%)'
              : 'polygon(100% 0, 0 0, 100% 100%)',
          }}
        />
      </div>
    </div>
  );
};

export default TextMessage;
