import { TickDouble01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

// sender information
interface SendInfoType {
  time: string
}

// sender info component
const SendInfo:React.FC<SendInfoType> = ({time}) => {
  return (
    <div className="flex gap-2 justify-end items-end absolute bottom-0 right-0 bg-black/30 w-full rounded-b-xl text-right px-1">
      <span className="font-medium text-white text-xs">{time}</span>
      <span className="text-white">
        <HugeiconsIcon size={16} icon={TickDouble01Icon} />
      </span>
    </div>
  );
};

// sender information
export default SendInfo;
