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
    <div className="absolute bottom-0 w-screen px-4 border flex flex-col gap-2 pb-4">
      {/* input sheet area  */}
      <div className={`h-[200px] bg-white ${mediaFrom ? "" : "hidden"}`}>
        <label htmlFor="">Select file to upload</label>
        <input type="file" />
      </div>

      {/* Message Input Area  */}
      <div className="flex items-center gap-2">
        <div className="bg-white grow flex">
          <input
            type="text"
            className="grow py-4"
            placeholder="Message is not enabled..."
          />
          <button onClick={() => dispatch(setMediaFrom("camera"))}>
            <HugeiconsIcon icon={Camera01FreeIcons} />
          </button>
        </div>

        {/* document selection & send button area */}
        <button
          onClick={() => dispatch(setMediaFrom("storage"))}
          className="py-2 bg-white text-black rounded"
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
