import "../locales/i18n";
import React from "react";
import avatar from "../assets/avatar.jpg";
import IconButton from "./ui/IconButton.js";
import HeaderSearch from "./ui/HeaderSearch";
import {
  Menu02Icon,
  Search01Icon,
  Moon02FreeIcons,
  Notification03FreeIcons,
  DashboardCircleEditFreeIcons,
} from "@hugeicons/core-free-icons";

interface HeaderProps {
  sidebar: boolean;
  setSidebar: (status: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebar, setSidebar }) => {
  return (
    <header className="bg-primary flex justify-between px-4 py-4 text-white">
      {/* left side of heading  */}
      <div className="flex items-center gap-4">
        <div onClick={() => setSidebar(!sidebar)}>
          <IconButton icon={Menu02Icon} />
        </div>
        <HeaderSearch className="hidden md:flex" />
      </div>

      {/* right side of heading  */}
      <div className="text-contrast flex items-center justify-between gap-2">
        <IconButton className="md:hidden" icon={Search01Icon} />
        <IconButton className="hidden md:block" icon={DashboardCircleEditFreeIcons} />
        <IconButton icon={Notification03FreeIcons} />
        <IconButton className="hidden md:block" icon={Moon02FreeIcons} />
        <div className="ml-2">
          <img className="h-8 w-8 rounded-full" src={avatar} alt="avatar" />
        </div>
      </div>
    </header>
  );
};

export default Header;
