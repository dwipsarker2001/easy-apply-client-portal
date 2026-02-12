import { useAppSelector } from '@/hooks';
import { MoreVerticalFreeIcons } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import React, { useState } from 'react';
import HeaderMenu from './HeaderMenu';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userInfo = useAppSelector(state => state.auth.userInfo);

  return (
    <header className="bg-white flex items-center justify-between p-4">
      {/*-------------------------------------
             Chat Avatar & Status  
        -------------------------------------*/}
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-full relative border-2 border-gray-400">
          <img
            className="h-full w-full rounded-full"
            src={userInfo.userAvatar}
          />
          <div
            className={`absolute bottom-0 right-0 rounded-full w-3 h-3 border-2 border-white
              ${userInfo.userStatus ? 'bg-green-500' : 'bg-gray-400'}`}
          ></div>
        </div>
        <div>
          <h1 className="font-bold">{userInfo.userName}</h1>
          <p className="text-sm text-gray-500">
            {userInfo.userStatus ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>

      {/*-------------------------------------
             More Options Button 
        -------------------------------------*/}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
      >
        <HugeiconsIcon icon={MoreVerticalFreeIcons} size={24} />
      </button>

      {/* --------------- Menu --------------------- */}
      <HeaderMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};

export default Header;
