import { setLoginSheet, setMediaFrom, addMessage, addFiles } from "@/state";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  Camera01FreeIcons,
  GoogleDocFreeIcons,
  Image02FreeIcons,
  SentFreeIcons,
  SignatureFreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { useState } from "react";

const InputArea: React.FC = () => {
  const dispatch = useAppDispatch();
  const mediaFrom = useAppSelector((state) => state.app.mediaFrom);

  const [textValue, setTextValue] = useState("");

  // Handle text input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (textValue.trim() === "") return;
    dispatch(addMessage(textValue.trim()));
    setTextValue(""); // clear input
    dispatch(setMediaFrom(null)); // close media/document selector
  };

  // Handle file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    dispatch(addFiles(Array.from(files)));
    dispatch(setMediaFrom(null));
    e.target.value = "";
  };

  // Determine if we are in "typing mode"
  const isTyping = textValue.trim().length > 0;

  return (
    <div className="absolute bottom-0 w-screen z-99 px-3 flex flex-col gap-2 pb-4">
      {/* -------------------------------------
              Input Sheet Area 
      -------------------------------------- */}
      {!isTyping && (
        <div
          className={`bg-white rounded-4xl p-6 ${mediaFrom ? "" : "hidden"}`}
        >
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
              className="bg-[#f0f0f0] p-4 rounded-lg flex justify-center items-center flex-col gap-1"
            >
              <HugeiconsIcon icon={GoogleDocFreeIcons} />
              <p>Document</p>
            </label>
            <label
              htmlFor="master-input"
              className="bg-[#f0f0f0] p-4 rounded-lg flex justify-center items-center flex-col gap-1"
            >
              <HugeiconsIcon icon={Image02FreeIcons} />
              <p>Photo</p>
            </label>
            <label
              htmlFor="master-input"
              className="bg-[#f0f0f0] p-4 rounded-lg flex justify-center items-center flex-col gap-1"
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
          />
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
          />

          {/* Camera button */}
          {!isTyping && (
            <button onClick={() => dispatch(setMediaFrom("camera"))}>
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
            onClick={() => dispatch(setMediaFrom("storage"))}
            className="py-2 bg-white text-black h-14 w-14 rounded-full grid place-content-center"
          >
            <HugeiconsIcon icon={Image02FreeIcons} />
          </button>
        )}
      </div>
    </div>
  );
};

export default InputArea;
