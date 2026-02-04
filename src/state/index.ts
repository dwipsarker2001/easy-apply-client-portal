import { ChatItem, ChatTextItem } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
  fullName: string;
  phoneNumber: string;
}

/*----------------------------------
  Initial State Type Definition
----------------------------------*/
interface InitialStateType {
  isLoggedIn: boolean;
  userInfo: UserInfo | null;
  loginSheet: boolean;
  mediaFrom: 'storage' | 'camera' | null;
  chat: ChatItem[];
}

/*----------------------------------
  Load persisted state from localStorage
----------------------------------*/
const loadPersistedState = (): Partial<InitialStateType> => {
  try {
    const serializedState = localStorage.getItem('appState');
    if (serializedState) {
      return JSON.parse(serializedState);
    }
  } catch (error) {
    console.error('Failed to load state from localStorage:', error);
  }
  return {};
};

/*----------------------------------
  Initial State
----------------------------------*/
const persistedState = loadPersistedState();

/*----------------------------------
  Initial State
----------------------------------*/
const initialState: InitialStateType = {
  isLoggedIn: persistedState.isLoggedIn || false,
  userInfo: persistedState.userInfo || null,
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
    login(state, action: PayloadAction<UserInfo>) {
      state.isLoggedIn = true;
      state.userInfo = action.payload;

      // Persist to localStorage
      try {
        localStorage.setItem(
          'appState',
          JSON.stringify({
            isLoggedIn: true,
            userInfo: action.payload,
          })
        );
      } catch (error) {
        console.error('Failed to save state to localStorage:', error);
      }
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userInfo = null;
      state.chat = [];

      // Clear from localStorage
      try {
        localStorage.removeItem('appState');
      } catch (error) {
        console.error('Failed to clear state from localStorage:', error);
      }
    },

    setLoginSheet(state, action: PayloadAction<boolean>) {
      state.loginSheet = action.payload;
    },

    setMediaFrom(state, action: PayloadAction<'storage' | 'camera' | null>) {
      state.mediaFrom =
        state.mediaFrom === action.payload ? null : action.payload;
    },

    addMessage(state, action: PayloadAction<ChatTextItem>) {
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
export const {
  setLoginSheet,
  setMediaFrom,
  addMessage,
  addFiles,
  setMessages,
  clearChat,
} = appSlice.actions;

export default appSlice.reducer;
