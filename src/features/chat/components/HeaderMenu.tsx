import { useAppDispatch, useAppSelector } from '@/hooks';
import { Delete02Icon, Logout03Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import React, { useState } from 'react';
import { clearChat } from '../redux/chatSlice';
import { logout } from '@/features/auth/redux/authSlice';
import ConfirmModal from '@/components/ConfirmModal';
import { ModalConfig } from '@/types';
import { useClearChat } from '../hooks';

interface HeaderMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const { handleClearChat } = useClearChat();
  const { userId } = useAppSelector(state => state.auth.userInfo);
  const { clientId } = useAppSelector(state => state.auth);
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);

  // Handle clear chat with confirmation
  const handleClearChatWithConfirm = () => {
    setModalConfig({
      title: 'Clear Chat?',
      description: 'All messages will be permanently deleted.',
      confirmText: 'Yes, clear',
      confirmColor: 'orange',
      onConfirm: async () => {
        if (userId && clientId) {
          await handleClearChat(userId, clientId);
          setModalConfig(null);
          onClose();
        }
      },
    });
  };

  // handle logout
  const handleLogout = () => {
    setModalConfig({
      title: 'Logout?',
      description: 'You will be signed out of your account.',
      confirmText: 'Yes, logout',
      confirmColor: 'red',
      onConfirm: () => {
        dispatch(logout());
        dispatch(clearChat());
        setModalConfig(null);
        onClose();
      },
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 transition-all duration-200
          ${isOpen ? 'visible' : 'invisible'}`}
      />

      {/* Dropdown Menu */}
      <div
        className={`absolute right-4 top-14 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50
          transition-all duration-200 origin-top-right
          ${isOpen ? 'visible opacity-100 scale-100' : 'invisible opacity-0 scale-95'}`}
      >
        <div className="p-1.5 flex flex-col gap-0.5">
          {/* Clear Chat */}
          <button
            onClick={handleClearChatWithConfirm}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-orange-50 active:scale-95 transition-all text-left group"
          >
            <div className="h-8 w-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-500 group-hover:bg-orange-200 transition-colors shrink-0">
              <HugeiconsIcon icon={Delete02Icon} size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Clear Chat</p>
              <p className="text-xs text-gray-400">Remove all messages</p>
            </div>
          </button>

          <div className="h-px bg-gray-100 mx-2" />

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 active:scale-95 transition-all text-left group"
          >
            <div className="h-8 w-8 rounded-lg bg-red-100 flex items-center justify-center text-red-500 group-hover:bg-red-200 transition-colors shrink-0">
              <HugeiconsIcon icon={Logout03Icon} size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-red-600">Logout</p>
              <p className="text-xs text-gray-400">Sign out of account</p>
            </div>
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {modalConfig && (
        <ConfirmModal
          config={modalConfig}
          onCancel={() => setModalConfig(null)}
        />
      )}
    </>
  );
};

export default HeaderMenu;
