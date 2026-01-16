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
import React, { useEffect, useState } from 'react';
import { useDocumentUpload } from '../hooks';
import MediaPreview from './MediaPreview';

const InputArea: React.FC = () => {
  const dispatch = useAppDispatch();
  const { mediaFrom, loginSheet } = useAppSelector(state => state.app);
  const { uploadDocument, isLoading } = useDocumentUpload();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [textValue, setTextValue] = useState('');
  const [clientId, setClientId] = useState<number | null>(null);

  // -------------------
  // Get client Id
  // -------------------
  useEffect(() => {
    const storedClientId = localStorage.getItem('clientId');
    if (storedClientId) {
      setClientId(Number(storedClientId));
    }
  }, []);

  if (loginSheet) return;

  // Handle text input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };

  // Handle sending a message with or without file
  const handleSendMessage = async () => {
    // If there's a file, upload it
    if (selectedFile) {
      const formData = new FormData();
      formData.append('files', selectedFile);
      formData.append('clientId', String(clientId));

      try {
        // Call RTK Query mutation
        await uploadDocument(formData);

        // Store file in Redux if needed
        dispatch(addFiles([selectedFile]));

        // Optionally send text message along with file
        if (textValue.trim()) {
          dispatch(addMessage(textValue.trim()));
        }

        // Clear everything
        setSelectedFile(null);
        setTextValue('');
        dispatch(setMediaFrom(null));
      } catch (err) {
        console.error('Document upload failed:', err);
      }
    }
    // If there's only text, send the message
    else if (textValue.trim()) {
      dispatch(addMessage(textValue.trim()));
      setTextValue('');
      dispatch(setMediaFrom(null));
    }
  };

  // Handle file selection (just set the file, don't upload yet)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setSelectedFile(file);
    dispatch(setMediaFrom(null)); // Close the media selector

    e.target.value = ''; // Reset input for re-selection
  };

  // Determine if we are in "typing mode" or have a file
  const isTyping = textValue.trim().length > 0;
  const hasContent = isTyping || selectedFile;

  return (
    <div className="absolute bottom-0 w-screen z-99 px-3 flex flex-col gap-2 pb-4">
      {/* -------------------------------------
              Input Sheet Area 
      -------------------------------------- */}
      {!isTyping && !selectedFile && mediaFrom && (
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
            accept=".pdf,.doc,.docx,image/*" // Allow documents and images
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

          {/* Camera button - hide when typing or file selected */}
          {!hasContent && (
            <button onClick={() => dispatch(setMediaFrom('camera'))}>
              <HugeiconsIcon icon={Camera01FreeIcons} />
            </button>
          )}
        </div>

        {/* Conditional buttons: Send or Document */}
        {hasContent ? (
          <button
            onClick={handleSendMessage}
            disabled={isLoading}
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
