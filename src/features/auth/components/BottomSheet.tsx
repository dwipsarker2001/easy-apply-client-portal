import { useRegisterMutation } from '@/features/auth/api';
import { setLoginSheet } from '@/features/auth/redux/authSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { SmartPhone01Icon, UserIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import React, { useEffect, useState } from 'react';


const BottomSheet: React.FC = () => {
  const dispatch = useAppDispatch();
  const loginSheet = useAppSelector(state => state.auth.loginSheet);

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({ fullName: '', phoneNumber: '' });
  const [register, { isLoading, error, isSuccess }] = useRegisterMutation();

  // -------------------
  // Auto Reopen if registration failed
  // -------------------
  useEffect(() => {
    const clientId = localStorage.getItem('clientId');
    if (!clientId && !loginSheet) {
      // Reopen sheet if clientId not stored
      dispatch(setLoginSheet(true));
    }
  }, [loginSheet, dispatch]);

  const validateForm = (): boolean => {
    const newErrors = { fullName: '', phoneNumber: '' };
    let isValid = true;

    // Validate full name
    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters';
      isValid = false;
    }

    // Validate phone number
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
      isValid = false;
    } else if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  /* -------------------
       Handle submit
   ------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    if (validateForm()) {
      e.preventDefault();

      // get full name 
      if (!fullName || !phoneNumber) return;
      
      try {
        // register now
        register({ name: fullName, phoneNumber }).unwrap();
        setFullName('');
        setPhoneNumber('');
      } catch (err) {
        console.error('Registration failed', err);
      }
    }
  };

  return (
    <>
      {/* Backdrop */}
      {loginSheet && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => dispatch(setLoginSheet(false))}
        />
      )}

      {/* Bottom Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto bg-white rounded-t-3xl shadow-2xl transform transition-transform duration-300 ease-out z-50 ${
          loginSheet ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-6 pt-2 pb-4">
          <h2 className="text-[22px] font-bold text-gray-900">আপনার তথ্য</h2>
          <p className="text-sm text-gray-600 mt-1">
            ডকুমেন্ট আদান-প্রদান নিশ্চিত করতে আপনার সঠিক নাম এবং মোবাইল নম্বর
            প্রদান করা বাধ্যতামূলক , যা আমাদের কার্যক্রম সহজ করবে।
          </p>
        </div>

        {/* Form */}
        <div className="px-6 pb-8">
          <form onSubmit={handleSubmit}>
            {/* Full Name Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                নাম*
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <HugeiconsIcon icon={UserIcon} size={20} />
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors({ ...errors, fullName: '' });
                  }}
                  placeholder="আপনার পুরো নাম লিখুন "
                  className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    errors.fullName
                      ? 'border-red-500 focus:ring-red-200'
                      : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Phone Number Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                মোবাইল*
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <HugeiconsIcon icon={SmartPhone01Icon} />
                </div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={e => {
                    setPhoneNumber(e.target.value);
                    if (errors.phoneNumber)
                      setErrors({ ...errors, phoneNumber: '' });
                  }}
                  placeholder="মোবাইল নম্বর লিখুন "
                  className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    errors.phoneNumber
                      ? 'border-red-500 focus:ring-red-200'
                      : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                  }`}
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-500 animate-pulse mb-2 pl-2">
                Registration failed. Please try again.
              </p>
            )}

            {/* Submit Button */}
            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-slate-700 text-white py-3.5 rounded-xl font-semibold hover:bg-slate-800 active:scale-[0.98] transition-all shadow-md"
            >
              {isLoading ? 'সাবমিট...' : 'সাবমিট'}
            </button>
            {/* Success */}
            {isSuccess && (
              <p className="text-sm text-green-600 font-medium animate-pulse">
                Client registered successfully!
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default BottomSheet;
