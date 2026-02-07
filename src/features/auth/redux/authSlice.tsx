import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from '../types';

/*----------------------------------
  State Type
----------------------------------*/
interface AuthStateType {
  clientId: number | null,
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
  clientId: null,
  isLoggedIn: persistedState.isLoggedIn || false,
  loginSheet: true,
  userInfo: persistedState.userInfo || {
    userId: null,
    userName: null,
    userEmail: null,
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
      - Sets isLoggedIn to true
      - Stores user info in state
      - Persists auth state to localStorage
    ----------------------------------*/
    login(state, action: PayloadAction<UserInfo>) {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
      
      console.log(action.payload);

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
      - Resets isLoggedIn and userInfo
      - Closes login sheet
      - Removes auth state from localStorage
    ----------------------------------*/
    logout(state) {
      state.isLoggedIn = false;
      state.userInfo = { userId: null, userName: null, userEmail: null };
      state.loginSheet = false;

      try {
        localStorage.removeItem('authState');
      } catch (error) {
        console.error('Failed to clear state from localStorage:', error);
      }
    },

    /*----------------------------------
      Set Login Sheet
      - Toggles visibility of login modal/bottom sheet
    ----------------------------------*/
    setLoginSheet(state, action: PayloadAction<boolean>) {
      state.loginSheet = action.payload;
    },
  },
});

/*----------------------------------
  Exports
----------------------------------*/
export const { login, logout, setLoginSheet } = authSlice.actions;
export default authSlice.reducer;
