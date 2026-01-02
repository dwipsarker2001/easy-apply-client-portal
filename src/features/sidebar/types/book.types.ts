import { IconSvgElement } from "@hugeicons/react";

export interface ItemProps {
  id: number;
  label: string;
  icon: IconSvgElement;
  link: string;
  isActive: boolean;
  menu?: ItemProps[];
  onClick?: () => void;
}
