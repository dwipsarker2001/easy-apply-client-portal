import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { CommandFreeIcons, Search01FreeIcons } from "@hugeicons/core-free-icons";

// properties type
interface headerSearchProps {
  className?: string;
  onClick?: () => void;
}

const HeaderSearch: React.FC<headerSearchProps> = (props) => {
  // properties destructure
  const { className, onClick } = props;
  return (
    <form
      onClick={onClick}
      className={`${className} bg-opacity-20 bg-component/6 flex w-62 cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 text-white/45 transition-opacity duration-200 hover:opacity-80`}
      action=""
    >
      <HugeiconsIcon icon={Search01FreeIcons} className="text-header-item h-5 w-5" />
      <p className="text-header-item flex-grow">Search now...</p>
      <div className="flex items-center gap-2">
        <HugeiconsIcon icon={CommandFreeIcons} className="text-header-item ml-2 h-5 w-5" />
        <span className="text-header-item">K</span>
      </div>
    </form>
  );
};

export default HeaderSearch;
