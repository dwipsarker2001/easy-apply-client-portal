import {
  Camera01FreeIcons,
  GoogleDocFreeIcons,
  Image02FreeIcons,
  SentFreeIcons,
  SignatureFreeIcons,
} from '@hugeicons/core-free-icons';
import React, { useEffect, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import MediaPreview from './MediaPreview';
import { useSendMessage } from '../hooks/useSentMessage';
import { setMediaFrom } from '../redux/chatSlice';

const InputArea: React.FC = () => {
  const dispatch = useAppDispatch();
  const { mediaFrom } = useAppSelector(state => state.chat);
  const auth = useAppSelector(state => state.auth);
  const {
    textValue,
    setTextValue,
    selectedFile,
    setSelectedFile,
    sendMessage,
    handleFileChange,
  } = useSendMessage({
    roomId: `room-user-${auth.userInfo.userId}-client-${auth.clientId}`,
    clientId: auth.clientId!,
    userId: auth.userInfo.userId!,
  });

  const isTyping = textValue.trim().length > 0;
  const hasContent = isTyping || selectedFile;

  return (
    <div className="absolute bottom-0 w-screen z-99 px-3 flex flex-col gap-2 pb-4">
      {/* Input Sheet Area */}
      {!isTyping && !selectedFile && mediaFrom && (
        <div className="bg-white rounded-4xl p-6">
          <h1 className="font-semibold text-xl text-slate-600 mb-2">
            ডকুমেন্টের ধরন
          </h1>
          <p className="text-gray-500 mb-4">
            আপনি ঠিক কোন প্রকারের ডকুমেন্ট পাঠাতে চাচ্ছেন তা সিলেক্ট করুন।
          </p>

          <div className="grid grid-cols-3 gap-2">
            <label
              htmlFor="master-input"
              className="bg-[#f0f0f0] p-4 rounded-lg flex justify-center items-center flex-col gap-1 cursor-pointer"
            >
              <HugeiconsIcon icon={GoogleDocFreeIcons} />
              <p>Document</p>
            </label>
            <label
              htmlFor="master-input"
              className="bg-[#f0f0f0] p-4 rounded-lg flex justify-center items-center flex-col gap-1 cursor-not-allowed opacity-50"
            >
              <HugeiconsIcon icon={Image02FreeIcons} />
              <p>Gallery</p>
            </label>
            <label
              htmlFor="master-input"
              className="bg-[#f0f0f0] p-4 rounded-lg flex justify-center items-center flex-col gap-1 cursor-not-allowed opacity-50"
            >
              <HugeiconsIcon icon={SignatureFreeIcons} />
              <p>Signature</p>
            </label>
          </div>

          <input
            id="master-input"
            type="file"
            className="hidden"
            onChange={e => handleFileChange(e.target.files?.[0] || null)}
            accept=".pdf,.doc,.docx,image/*"
          />
        </div>
      )}

      {/* File Preview */}
      {selectedFile && (
        <MediaPreview
          file={selectedFile}
          onRemove={() => setSelectedFile(null)}
        />
      )}

      {/* Message Input Area */}
      <div className="flex items-center gap-2">
        <div className="bg-white grow flex px-5 rounded-full gap-5">
          <input
            type="text"
            className="grow py-4 focus:outline-none"
            placeholder="Type a message..."
            value={textValue}
            onChange={e => setTextValue(e.target.value)}
            onClick={() =>
              dispatch({ type: 'app/setMediaFrom', payload: null })
            }
          />

          {!hasContent && (
            <button onClick={() => dispatch(setMediaFrom('camera'))}>
              <HugeiconsIcon icon={Camera01FreeIcons} />
            </button>
          )}
        </div>

        {hasContent ? (
          <button
            onClick={sendMessage}
            className="py-2 bg-slate-800 text-white h-14 w-14 rounded-full grid place-content-center disabled:opacity-50"
          >
            <HugeiconsIcon icon={SentFreeIcons} />
          </button>
        ) : (
          <button
            onClick={() => dispatch(setMediaFrom('storage'))}
            className="py-2 bg-white text-black h-14 w-14 rounded-full grid place-content-center"
          >
            <HugeiconsIcon icon={GoogleDocFreeIcons} />
          </button>
        )}
      </div>
    </div>
  );
};

export default InputArea;
