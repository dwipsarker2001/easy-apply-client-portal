import { useAppDispatch } from '@/hooks';
import { Delete02Icon, Logout03Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import React, { useEffect, useRef, useState } from 'react';
import { clearChat } from '../redux/chatSlice';
import { logout } from '@/features/auth/redux/authSlice';
import ConfirmModal from '@/components/ConfirmModal';
import { ModalConfig } from '@/types';

interface HeaderMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/*----------------------------------
  Success Toast
----------------------------------*/
const SuccessToast: React.FC<{ message: string }> = ({ message }) => (
  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] animate-in fade-in slide-in-from-bottom-4 duration-300">
    <div className="flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#22c55e"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
      {message}
    </div>
  </div>
);

/*----------------------------------
  Header Menu
----------------------------------*/
const HeaderMenu: React.FC<HeaderMenuProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const menuRef = useRef<HTMLDivElement>(null);
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 1800);
  };

  const handleClearChat = () => {
    setModalConfig({
      title: 'Clear all messages?',
      description: 'This will permanently delete your entire chat history.',
      confirmText: 'Yes, clear it',
      confirmColor: 'orange',
      onConfirm: () => {
        dispatch(clearChat());
        setModalConfig(null);
        onClose();
        showToast('Chat cleared successfully');
      },
    });
  };

  const handleLogout = () => {
    setModalConfig({
      title: 'Logout?',
      description: 'You will be signed out of your account.',
      confirmText: 'Yes, logout',
      confirmColor: 'red',
      onConfirm: () => {
        dispatch(logout());
        setModalConfig(null);
        onClose();
        showToast('Logged out successfully');
      },
    });
  };

  return (
    <>
      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <div
            ref={menuRef}
            className="absolute right-4 top-16 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <div className="py-1">
              <div className="h-px bg-gray-100 my-1" />

              {/* Clear Chat */}
              <button
                onClick={handleClearChat}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-orange-50 transition-colors text-left group text-sm"
              >
                <div className="text-orange-500 group-hover:scale-110 transition-transform">
                  <HugeiconsIcon icon={Delete02Icon} size={20} />
                </div>
                <span className="text-gray-700 font-medium">Clear Chat</span>
              </button>

              <div className="h-px bg-gray-100 my-1" />

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-red-50 transition-colors text-left group text-sm"
              >
                <div className="text-red-500 group-hover:scale-110 transition-transform">
                  <HugeiconsIcon icon={Logout03Icon} size={20} />
                </div>
                <span className="text-red-600 font-medium">Logout</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Confirmation Modal */}
      {modalConfig && (
        <ConfirmModal
          config={modalConfig}
          onCancel={() => setModalConfig(null)}
        />
      )}

      {/* Success Toast */}
      {toast && <SuccessToast message={toast} />}
    </>
  );
};

export default HeaderMenu;
