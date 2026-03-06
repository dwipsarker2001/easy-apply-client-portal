import { useAppDispatch } from '@/hooks';
import {
  Delete02Icon,
  Logout03Icon,
  SpamIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import React, { useEffect, useRef } from 'react';
import { clearChat } from '../redux/chatSlice';
import Swal from 'sweetalert2';

interface HeaderMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
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

  const handleClearChat = async () => {
  const result = await Swal.fire({
    title: 'Clear chat?',
    text: 'All messages will be deleted permanently.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, clear it',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#1e293b',
    cancelButtonColor: '#e5e7eb',
    reverseButtons: true,
    borderRadius: '12px',
  });

  if (result.isConfirmed) {
    dispatch(clearChat());
    onClose();

    Swal.fire({
      icon: 'success',
      title: 'Chat cleared',
      timer: 1200,
      showConfirmButton: false,
    });
  }
};

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      // dispatch(logout());
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Menu */}
      <div
        ref={menuRef}
        className="absolute right-4 top-16 w-48 bg-white rounded-md shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
      >
        {/* Menu Items */}
        <div className="py-1">

          {/* Divider */}
          <div className="h-px bg-gray-100 my-1" />
          {/* Clear Chat */}
          <button
            onClick={handleClearChat}
            className="w-full flex items-center gap-2 px-2 py-2 hover:bg-gray-50 transition-colors text-left group text-sm"
          >
            <div className="text-orange-500 group-hover:scale-110 transition-transform">
              <HugeiconsIcon icon={Delete02Icon} size={20} />
            </div>
            <span className="text-gray-700 font-medium">Clear Chat</span>
          </button>
          {/* Divider */}
          <div className="h-px bg-gray-100 my-1" />

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-2 py-2 hover:bg-red-50 transition-colors text-left group text-sm"
          >
            <div className="text-red-500 group-hover:scale-110 transition-transform">
              <HugeiconsIcon icon={Logout03Icon} size={20} />
            </div>
            <span className="text-red-600 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default HeaderMenu;
