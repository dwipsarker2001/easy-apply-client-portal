import { useAppDispatch, useAppSelector } from '@/hooks';
import React from 'react';
import { setPreview } from '../redux/chatSlice';

const Preview: React.FC = () => {
  const dispatch = useAppDispatch();
  const preview = useAppSelector(state => state.chat.preview);
  if (!preview) return <></>;

  return (
    <div
      onClick={() => dispatch(setPreview(''))}
      className="fixed inset-0 bg-black flex items-center justify-center z-[99] cursor-zoom-out"
    >
      <img
        src={preview}
        alt="fullscreen"
        className="max-h-[95vh] max-w-[95vw] rounded-xl"
      />
    </div>
  );
};

export default Preview;
