import React, { useState } from "react";
import { ItemProps } from "../types/book.types";
import { ArrowRight01FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { NavLink } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import Menu from "./Menu";

// default list item
const DefaultItem: React.FC<ItemProps> = ({ link, label, icon }) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        (isActive && "active") +
        " hover:bg-background [.active]:bg-active/15 [.active]:text-active flex items-center justify-between rounded-md px-3 py-2 font-medium"
      }
    >
      <div className="flex items-center gap-2">
        <HugeiconsIcon className="h-5 w-5" icon={icon} />
        <span className="font-medium">{label}</span>
      </div>
    </NavLink>
  );
};

// dropdown list item
const DropdownItem: React.FC<ItemProps> = ({ menu, isActive, icon, label }) => {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <div
        className={`${isActive && "active"} hover:bg-background [.active]:bg-active/15 [.active]:text-active flex cursor-pointer items-center justify-between rounded-md px-3 py-2`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="flex items-center gap-2">
          <HugeiconsIcon className="h-5 w-5" icon={icon} />
          <span className="font-medium">{label}</span>
        </div>
        {menu && <HugeiconsIcon className={`h-5 w-5 transition ${open && "rotate-90"}`} icon={ArrowRight01FreeIcons} />}
      </div>

      <AnimatePresence>
        {open && menu && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Menu isDropdown={true} items={menu} />
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};

// export list item
const Item: React.FC<ItemProps> = (props) => {
  if (props.menu) return <DropdownItem {...props} />;
  else return <DefaultItem {...props} />;
};

export default Item;
