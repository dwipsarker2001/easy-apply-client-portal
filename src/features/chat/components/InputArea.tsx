import { useAppDispatch, useAppSelector } from '@/hooks';
import { addFiles, addMessage, setMediaFrom } from '@/state';
import {
  Camera01FreeIcons,
  GoogleDocFreeIcons,
  Image02FreeIcons,
  SentFreeIcons,
  SignatureFreeIcons,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import React, { useState } from 'react';
import { useDocumentUpload } from '../hooks';

const InputArea: React.FC = () => {
  const dispatch = useAppDispatch();
  const mediaFrom = useAppSelector(state => state.app.mediaFrom);
  const { uploadDocument, isLoading } = useDocumentUpload();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [textValue, setTextValue] = useState('');

  // Handle text input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (textValue.trim() === '') return;
    dispatch(addMessage(textValue.trim()));
    setTextValue(''); // clear input
    dispatch(setMediaFrom(null)); // close media/document selector
  };

  // Handle file input for document upload only
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0]; // only handle the first file
    setSelectedFile(file);
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Call RTK Query mutation
      // await uploadDocument(formData);

      // Optionally store file in Redux if needed
      dispatch(addFiles([file]));
      dispatch(setMediaFrom(null));
    } catch (err) {
      console.error('Document upload failed:', err);
    } finally {
      e.target.value = ''; // reset input
    }
  };

  // Determine if we are in "typing mode"
  const isTyping = textValue.trim().length > 0;

  return (
    <div className="absolute bottom-0 w-screen z-99 px-3 flex flex-col gap-2 pb-4">
      {/* -------------------------------------
              Input Sheet Area 
      -------------------------------------- */}
      {!isTyping && mediaFrom && (
        <div className={`bg-white rounded-4xl p-6`}>
          <h1 className="font-semibold text-xl text-slate-600 mb-2">
            ডকুমেন্টের ধরন
          </h1>
          <p className="text-gray-500 mb-4">
            আপনি ঠিক কোন প্রকারের ডকুমেন্ট পাঠাতে চাচ্ছেন তা সিলেক্ট করুন, যা
            আমাদের দ্রুত পরবর্তী ব্যবস্থা নিতে সাহায্য করবে।
          </p>

          {/*--------- Input Options ---------  */}
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

          {/*--------- The Master Input ---------  */}
          <input
            onChange={handleFileChange}
            id="master-input"
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx" // optional: allow only document files
          />
        </div>
      )}
      {selectedFile && (
        <div className="mt-4 bg-gray-100 p-3 rounded-lg flex items-center gap-3">
          <HugeiconsIcon icon={GoogleDocFreeIcons} />
          <div className="text-sm">
            <p className="font-medium">{selectedFile.name}</p>
            <p className="text-gray-500">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>
      )}
      {/* ------------------------------------
                  Message Input Area 
      --------------------------------------- */}
      <div className="flex items-center gap-2">
        <div className="bg-white grow flex px-5 rounded-full gap-5">
          <input
            type="text"
            className="grow py-4 focus:outline-none"
            placeholder="Type a message..."
            value={textValue}
            onChange={handleInputChange}
            onClick={() => dispatch(setMediaFrom(null))}
          />

          {/* Camera button */}
          {!isTyping && (
            <button onClick={() => dispatch(setMediaFrom('camera'))}>
              <HugeiconsIcon icon={Camera01FreeIcons} />
            </button>
          )}
        </div>

        {/* Conditional buttons: Send or Document */}
        {isTyping ? (
          <button
            onClick={handleSendMessage}
            className="py-2 bg-blue-600 text-white h-14 w-14 rounded-full grid place-content-center"
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
