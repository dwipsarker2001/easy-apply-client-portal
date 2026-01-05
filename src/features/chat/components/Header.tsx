import { MoreVerticalFreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className=" bg-white flex items-center  justify-between p-4 ">
      {/*-------------------------------------
             Chat Avatar & Status  
        -------------------------------------*/}
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-full relative border-2 border-gray-400">
          <img
            className="h-full w-full rounded-full"
            src="https://loremfaces.net/96/id/1.jpg"
          />
          <div className="absolute bottom-0 right-0 bg-green-600 rounded-full w-3 h-3 border-2 border-white"></div>
        </div>
        <div>
          <h1 className="font-bold">Dwip Sarker</h1>
          <p className="text-sm text-gray-500">Online</p>
        </div>
      </div>

      {/*-------------------------------------
             More Options Button 
        -------------------------------------*/}
      <button>
        <HugeiconsIcon icon={MoreVerticalFreeIcons} />
      </button>
    </header>
  );
};

export default Header;
