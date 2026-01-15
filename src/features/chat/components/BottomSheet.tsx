import React, { useEffect, useState } from "react";
import { setLoginSheet } from "@/state";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useRegisterMutation } from "@/features/auth/api";
import { setClientId } from "@/state/clientSlice";
import { X } from "lucide-react";


const BottomSheet: React.FC = () => {
  const dispatch = useAppDispatch();
  const loginSheet = useAppSelector((state) => state.app.loginSheet);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [register, { isLoading, error, isSuccess }] = useRegisterMutation();

// -------------------
  // Handle submit
  // -------------------
 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!name || !phoneNumber) return;

  try {
    const res = await register({ name, phoneNumber }).unwrap();
    dispatch(setClientId(res.data.clientId));
    dispatch(setLoginSheet(false));
    setName("");
    setPhoneNumber("");
  } catch (err) {
    console.error("Registration failed", err);
  }
};

// -------------------
  // Auto Reopen if registration failed
  // -------------------
  useEffect(() => {
    const clientId = localStorage.getItem("clientId");
    if (!clientId && !loginSheet) {
      // Reopen sheet if clientId not stored
      dispatch(setLoginSheet(true));
    }
  }, [loginSheet, dispatch]);


  return (
<>
      {/* Overlay */}
      {loginSheet && (
        <div
          onClick={() => dispatch(setLoginSheet(false))}
          className="fixed inset-0 bg-black/40 z-[9998] backdrop-blur-sm"
        />
      )}

      {/* Bottom Sheet */}
      <div
        className={`fixed inset-x-0 bottom-0 z-[9999] max-w-md mx-auto w-full h-[460px] bg-gradient-to-t from-white/95 to-white backdrop-blur-lg rounded-t-3xl shadow-2xl border-t border-gray-200 transform transition-transform duration-500 ease-in-out
          ${loginSheet ? "translate-y-0" : "translate-y-[460px]"}
        `}
      >
        {/* Header */}
        <div className="p-5 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-xl text-shadow-stone-950 text-gray-800">Registration</h2>
          <button
            onClick={() => dispatch(setLoginSheet(false))}
            className="p-2 rounded-full cursor-pointer hover:bg-red-100 transition"
          >
            <X className="text-red-500" size={20} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 flex flex-col space-y-5"
        >
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition  hover:shadow-md"
              required
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="01300000003"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition hover:shadow-md"
              required
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500 animate-pulse">
              Registration failed. Please try again.
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 cursor-pointer rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          {/* Success */}
          {isSuccess && (
            <p className="text-sm text-green-600 font-medium animate-pulse">
              Client registered successfully!
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default BottomSheet;
