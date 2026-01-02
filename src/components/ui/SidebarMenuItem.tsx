import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";
import { SidebarMenuItemProps } from "../../types";
import { NavLink } from "react-router";

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = (props) => {
  return (
    <li>
      <NavLink
        to={props.link}
        className={({ isActive }) =>
          [isActive && "active", "sidebar_menu_item"].filter(Boolean).join(" ")
        }
      >
        <HugeiconsIcon icon={props.icon} />
        {props.label}
      </NavLink>
    </li>
  );
};

export default SidebarMenuItem;
