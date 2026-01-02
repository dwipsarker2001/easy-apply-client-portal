import React from "react";
import { ItemProps } from "../types/book.types";
import Item from "./Item";

interface MenuProps {
  isDropdown?: boolean;
  items: ItemProps[];
}

const Menu: React.FC<MenuProps> = ({ isDropdown, items }) => {
  return (
    <ul className={`${isDropdown && "border-border ml-5 border-l pl-1.5"} text-secondary`}>
      {items.map((item: ItemProps) => (
        <Item
          key={item.id}
          id={item.id}
          icon={item.icon}
          link={item.link}
          isActive={item.isActive}
          label={item.label}
          menu={item.menu}
        />
      ))}
    </ul>
  );
};

export default Menu;
