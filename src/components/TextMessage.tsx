import { TickDouble01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import React from 'react';

interface PropsType {
  message: string;
  direction?: 'sent' | 'received';
  time: string;
}

const TextMessage: React.FC<PropsType> = ({ message, time, direction = 'sent', }) => {
  return (
    <div className={direction === 'sent' ? 'flex flex-row-reverse' : 'flex'}>
      <div className="relative">
        <div
          className={
            direction === 'sent'
              ? 'flex gap-2 bg-slate-700 p-2 px-3 text-white text-md rounded-lg rounded-tr-none'
              : 'flex gap-2 bg-white p-2 px-3 rounded-lg rounded-tl-none'
          }
        >
          {message}
          {/* Message info */}
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
