import { ChatItem } from '@/features/chat/types';
import { TickDouble01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import React from 'react';

const TextMessage: React.FC<ChatItem> = ({
  message,
  time,
  direction = 'sent',
}) => {
  return (
    <div
      className={`${direction === 'sent' ? 'flex flex-row-reverse ml-auto' : 'flex'} max-w-[80%]`}
    >
      <div className="relative">
        <div
          className={
            direction === 'sent'
              ? 'flex flex-wrap justify-end gap-2 bg-slate-700 p-2 px-3 text-white text-md rounded-xl rounded-tr-none'
              : 'flex flex-wrap gap-2 bg-white p-2 px-3 rounded-lg rounded-tl-none'
          }
        >
          <div>{message}</div>
          <div className="text-xs font-thin flex items-end gap-1">
            <span>{time}</span>
            {direction === 'sent' && (
              <span>
                <HugeiconsIcon size={16} icon={TickDouble01Icon} />
              </span>
            )}
          </div>
        </div>
        {/* Tail */}
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
      </div>
    </div>
  );
};

export default TextMessage;
