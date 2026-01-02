import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialStateType {
  loginSheet: boolean;
  mediaFrom: "storage" | "camera" | null;
}

const initialState: InitialStateType = {
  loginSheet: false,
  mediaFrom: null,
};

const appSlice = createSlice({
  name: "easy-apply-client-portal",
  initialState,
  reducers: {
    setLoginSheet(state, action: PayloadAction<boolean>) {
      state.loginSheet = action.payload;
    },
    setMediaFrom(state, action: PayloadAction<"storage" | "camera" | null>) {
      state.mediaFrom =
        state.mediaFrom === action.payload ? null : action.payload;
    },
  },
});

export const { setLoginSheet, setMediaFrom } = appSlice.actions;
export default appSlice.reducer;
