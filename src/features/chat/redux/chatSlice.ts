import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatItem, ChatTextItem } from '@/types';

/*----------------------------------
  State Type
----------------------------------*/
interface ChatState {
  chat: ChatItem[];
  mediaFrom: 'storage' | 'camera' | null;
}

/*----------------------------------
  Initial State
----------------------------------*/
const initialState: ChatState = {
  chat: [],
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
    addChatItem(state, action: PayloadAction<ChatItem | ChatTextItem>) {
      state.chat.push(action.payload);
    },

    /*----------------------------------
      Add Text Message
    ----------------------------------*/
    addMessage(state, action: PayloadAction<ChatTextItem>) {
      state.chat.push(action.payload);
    },

    /*----------------------------------
      Add Files
    ----------------------------------*/
    addFiles(state, action: PayloadAction<File[]>) {
      action.payload.forEach(file => {
        state.chat.push({
          id: Date.now().toString(),
          type: 'file',
          file,
          direction: 'sent',
        });
      });
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
} = chatSlice.actions;

export default chatSlice.reducer;
