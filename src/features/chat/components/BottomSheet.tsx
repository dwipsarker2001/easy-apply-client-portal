import { setLoginSheet } from "@/features/state";
import { useAppDispatch, useAppSelector } from "@/hooks";
import React from "react";

const BottomSheet: React.FC = () => {
  const dispatch = useAppDispatch();
  const loginSheet = useAppSelector((state) => state.app.loginSheet);

  return (
    <div
      className={`fixed bottom-0 w-full h-[400px] bg-white rounded-t-3xl shadow-xl transform transition-transform duration-300 ${
        loginSheet ? "translate-y-0" : "translate-y-[400px]"
      }`}
    >
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-lg font-bold">Login Modal</h2>
        <button
          onClick={() => dispatch(setLoginSheet(false))}
          className="px-2 py-1 bg-red-500 text-white rounded"
        >
          Close
        </button>
      </div>
      <div className="p-4">
        {/* Your login form or content here */}
        <p>Bottom sheet content goes here...</p>
      </div>
    </div>
  );
};

export default BottomSheet;
