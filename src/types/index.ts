import { IconSvgElement } from '@hugeicons/react';

/*----------------------------------
  Common Component Props
----------------------------------*/
export interface ComponentProps {
  className?: string;
}

/*----------------------------------
  Theme State
----------------------------------*/
export interface ThemeState {
  headingSize: string;
  paragraphSize: string;
}

/*----------------------------------
  App Event State
----------------------------------*/
export interface AppEvents {
  isMenuOpen: boolean;
}

/*----------------------------------
  Action Panel Props
----------------------------------*/
export interface ActionPanelProps {
  label: string;
  icon: IconSvgElement;
  onClick: () => void;
}

/*----------------------------------
  Action Panel Props
----------------------------------*/
export interface ModalConfig {
  title: string;
  description: string;
  confirmText: string;
  confirmColor: 'red' | 'orange';
  onConfirm: () => void;
}
