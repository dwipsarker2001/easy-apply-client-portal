import { IconSvgElement } from "@hugeicons/react";

// common props for components
export interface componentProps {
  className?: string;
}

// theme states
export interface ThemeState {
  headingSize: string;
  paragraphSize: string;
}

// sidebar menu item props
export interface SidebarMenuItemProps {
  icon: IconSvgElement;
  label: string;
  isActive: boolean;
  link: string;
}

// events props
export interface AppEvents {
  isMenuOpen: boolean;
}

// title bar props
export interface breadcrumbsType {
  label: string;
  link: string;
}

export interface titleBarProps {
  title: string;
  breadcrumbs: breadcrumbsType[];
}

export interface ActionPanelProps {
  label: string;
  icon: IconSvgElement;
  onClick: () => void;
}
