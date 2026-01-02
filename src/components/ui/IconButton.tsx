import React from "react";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";

// props type
interface IconButtonProps {
  className?: string;
  icon: IconSvgElement;
  onClick?: () => void;
}

// render component
const IconButton: React.FC<IconButtonProps> = (props) => {
  const { className, icon, onClick } = props;
  return (
    <button onClick={onClick} className={`${className} rounded-full p-2 transition`}>
      <HugeiconsIcon icon={icon} className="text-header-item hover:text-header-item-hover h-6 w-6" />
    </button>
  );
};

// export component
export default IconButton;
