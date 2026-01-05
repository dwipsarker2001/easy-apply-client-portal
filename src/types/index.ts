import { IconSvgElement } from "@hugeicons/react";

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
  Chat Types
----------------------------------*/
export type MessageDirection = "sent" | "received";

export type ChatTextItem = {
  id: string;
  type: "text";
  content: string;
  direction: MessageDirection;
};

export type ChatFileItem = {
  id: string;
  type: "file";
  file: File;
  direction: MessageDirection;
};

export type ChatItem = ChatTextItem | ChatFileItem;

/*----------------------------------
  Chat State
----------------------------------*/
export interface ChatState {
  chat: ChatItem[];
}

/*----------------------------------
  Action Panel Props
----------------------------------*/
export interface ActionPanelProps {
  label: string;
  icon: IconSvgElement;
  onClick: () => void;
}
