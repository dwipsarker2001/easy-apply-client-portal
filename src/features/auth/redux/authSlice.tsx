import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from '../types';

/*----------------------------------
  State Type
----------------------------------*/
interface AuthStateType {
  clientId: number | null;
  clientToken: string | null;
  userInfo: UserInfo;
  isLoggedIn: boolean;
  loginSheet: boolean;
}

/*----------------------------------
  Load persisted state from localStorage
----------------------------------*/
const loadPersistedState = (): Partial<AuthStateType> => {
  try {
    const serializedState = localStorage.getItem('authState');
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

const initialState: AuthStateType = {
  clientId: Number(localStorage.getItem('clientId')) || null,
  clientToken: localStorage.getItem('clientToken'),
  isLoggedIn: persistedState.isLoggedIn ?? false,
  loginSheet:
    persistedState.loginSheet ?? (persistedState.isLoggedIn ? false : true),
  userInfo: persistedState.userInfo || {
    userId: null,
    userName: null,
    userEmail: null,
    userAvatar: undefined,
    userStatus: false,
  },
};

/*----------------------------------
  Auth Slice
----------------------------------*/
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /*----------------------------------
      Login 
    ----------------------------------*/
    login(state, action: PayloadAction<UserInfo>) {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
      state.loginSheet = false;

      try {
        localStorage.setItem(
          'authState',
          JSON.stringify({
            isLoggedIn: true,
            userInfo: action.payload,
          })
        );
      } catch (error) {
        console.error('Failed to save state to localStorage:', error);
      }
    },

    /*----------------------------------
      Logout 
    ----------------------------------*/
    logout(state) {
      state.isLoggedIn = false;
      state.clientId = null;
      state.clientToken = null;
      state.userInfo = {
        userId: null,
        userName: null,
        userEmail: null,
        userAvatar: undefined,
        userStatus: false,
      };
      state.loginSheet = true;

      try {
        localStorage.removeItem('authState');
        localStorage.removeItem('clientId');
        localStorage.removeItem('clientToken');
      } catch (error) {
        console.error('Failed to clear state from localStorage:', error);
      }
    },

    /*----------------------------------
      Set Login Sheet
    ----------------------------------*/
    setLoginSheet(state, action: PayloadAction<boolean>) {
      state.loginSheet = action.payload;

      const saved = loadPersistedState();
      localStorage.setItem(
        'authState',
        JSON.stringify({
          ...saved,
          loginSheet: action.payload,
        })
      );
    },

    /*----------------------------------
      Set client id
    ----------------------------------*/
    setClientId(state, action: PayloadAction<number>) {
      state.clientId = action.payload;
    },

    /*----------------------------------
      Set client token
    ----------------------------------*/
    setClientToken(state, action: PayloadAction<string>) {
      state.clientToken = action.payload;
    },
  },
});

/*----------------------------------
  Exports
----------------------------------*/
export const { login, logout, setLoginSheet, setClientId, setClientToken } =
  authSlice.actions;
export default authSlice.reducer;
