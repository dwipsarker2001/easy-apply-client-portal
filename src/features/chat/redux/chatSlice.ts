import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatItem } from '../types';

/*----------------------------------
  State Type
----------------------------------*/
interface ChatState {
  chat: ChatItem[];
  preview: string;
  mediaFrom: 'storage' | 'camera' | null;
}

/*----------------------------------
  Initial State
----------------------------------*/
const initialState: ChatState = {
  chat: [],
  preview: '',
  mediaFrom: null,
};

/*----------------------------------
  Chat Slice
----------------------------------*/
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    /*----------------------------------
      Add Chat Item
    ----------------------------------*/
    addChatItem(state, action: PayloadAction<ChatItem | ChatItem[]>) {
      if (Array.isArray(action.payload)) {
        state.chat.push(...action.payload);
      } else {
        state.chat.push(action.payload);
      }
    },

    /*----------------------------------
      Add Text Message
    ----------------------------------*/
    addMessage(state, action: PayloadAction<ChatItem>) {
      state.chat.push(action.payload);
    },

    /*----------------------------------
      Add Files
    ----------------------------------*/
    addFiles(state, action: PayloadAction<ChatItem>) {
      state.chat.push(action.payload);
    },

    /*----------------------------------
      Set Messages
    ----------------------------------*/
    setMessages(state, action: PayloadAction<ChatItem[]>) {
      state.chat = action.payload;
    },

    /*----------------------------------
      Clear Chat
    ----------------------------------*/
    clearChat(state) {
      state.chat = [];
    },

    /*----------------------------------
      Set Media Source
    ----------------------------------*/
    setMediaFrom(state, action: PayloadAction<'storage' | 'camera' | null>) {
      state.mediaFrom =
        state.mediaFrom === action.payload ? null : action.payload;
    },

    /*----------------------------------
      Set Preview
    ----------------------------------*/
    setPreview(state, action: PayloadAction<string>) {
      state.preview = action.payload;
    },
  },
});

/*----------------------------------
  Exports
----------------------------------*/
export const {
  addChatItem,
  addMessage,
  addFiles,
  setMessages,
  clearChat,
  setMediaFrom,
  setPreview,
} = chatSlice.actions;

export default chatSlice.reducer;
