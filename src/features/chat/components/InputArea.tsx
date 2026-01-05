import { setLoginSheet, setMediaFrom } from "@/features/state";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  Camera01FreeIcons,
  GoogleDocFreeIcons,
  Image02FreeIcons,
  SignatureFreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { useState } from "react";

const InputArea: React.FC = () => {
  const dispatch = useAppDispatch();
  const mediaFrom = useAppSelector((state) => state.app.mediaFrom);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // setSelectedImage(file);
      // const fileURL = URL.createObjectURL(file);
      // onChange(fileURL);
      // setDetectChange();
    }
  };

  return (
    <div className="absolute bottom-0 w-screen z-99 px-3 flex flex-col gap-2 pb-4">
      {/* -------------------------------------
              input sheet area 
      -------------------------------------- */}
      <div className={`bg-white rounded-4xl p-6 ${mediaFrom ? "" : "hidden"}`}>
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
        <input id="master-input" type="file" className="hidden" />
      </div>

      {/* ------------------------------------
                  Message Input Area 
      --------------------------------------- */}
      <div className="flex items-center gap-2">
        <div className="bg-white grow flex px-5 rounded-full gap-5">
          <input
            type="text"
            className="grow py-4 focus:outline-none"
            placeholder="Message is not enabled..."
          />
          <button onClick={() => dispatch(setMediaFrom("camera"))}>
            <HugeiconsIcon icon={Camera01FreeIcons} />
          </button>
        </div>

        {/* --------------------------------------------
              Document Selection Area 
        -----------------------------------------------*/}
        <button
          onClick={() => dispatch(setMediaFrom("storage"))}
          className="py-2 bg-white text-black h-14 w-14 rounded-full grid place-content-center"
        >
          <HugeiconsIcon icon={Image02FreeIcons} />
        </button>
      </div>
    </div>
  );
};

export default InputArea;
