// src/features/font/fontSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppEvents } from "../../types";

const initialState: AppEvents = {
  isMenuOpen: false,
};

const appEvent = createSlice({
  name: "font",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
});

export const { toggleMenu } = appEvent.actions;
export default appEvent.reducer;
