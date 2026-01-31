import { ChatItem } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/*----------------------------------
  Initial State Type Definition
----------------------------------*/
interface InitialStateType {
  loginSheet: boolean;
  mediaFrom: 'storage' | 'camera' | null;
  chat: ChatItem[];
}

/*----------------------------------
  Initial State
----------------------------------*/
const initialState: InitialStateType = {
  loginSheet: false,
  mediaFrom: null,
  chat: [],
};

/*----------------------------------
  App Slice
----------------------------------*/

const appSlice = createSlice({
  name: 'easy-apply-client-portal',
  initialState,
  reducers: {
    setLoginSheet(state, action: PayloadAction<boolean>) {
      state.loginSheet = action.payload;
    },

    setMediaFrom(state, action: PayloadAction<'storage' | 'camera' | null>) {
      state.mediaFrom =
        state.mediaFrom === action.payload ? null : action.payload;
    },

    addMessage(state, action: PayloadAction<ChatItem>) {
  state.chat.push(action.payload);
},

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

    setMessages(state, action: PayloadAction<ChatItem[]>) {
      state.chat = action.payload;
    },

    clearChat(state) {
      state.chat = [];
    },
  },
});

/*----------------------------------
  Exports
----------------------------------*/
export const { setLoginSheet, setMediaFrom, addMessage, addFiles, setMessages, clearChat } =
  appSlice.actions;

export default appSlice.reducer;
