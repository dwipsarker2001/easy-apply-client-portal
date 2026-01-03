import { setLoginSheet, setMediaFrom } from "@/features/state";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  Camera01FreeIcons,
  Image02FreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { useState } from "react";

const InputArea: React.FC = () => {
  const dispatch = useAppDispatch();
  const mediaFrom = useAppSelector((state) => state.app.mediaFrom);

  return (
    <div className="absolute bottom-0 w-screen z-99 px-3 flex flex-col gap-2 pb-4">
      {/* input sheet area  */}
      <div
        className={`h-[200px] bg-white rounded-4xl p-4 ${mediaFrom ? "" : "hidden"}`}
      >
        <label htmlFor="">Select file to upload</label>
        <input type="file" />
      </div>

      {/* Message Input Area  */}
      <div className="flex items-center gap-2">
        <div className="bg-white grow flex px-5 rounded-full">
          <input
            type="text"
            className="grow py-4 focus:outline-none"
            placeholder="Message is not enabled..."
          />
          <button onClick={() => dispatch(setMediaFrom("camera"))}>
            <HugeiconsIcon icon={Camera01FreeIcons} />
          </button>
        </div>

        {/* document selection & send button area */}
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

//  onClick={() => dispatch(setLoginSheet(true))}

//  onClick={() => dispatch(setLoginSheet(true))}
