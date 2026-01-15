import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/*----------------------------------
  State Type
----------------------------------*/
interface ClientState {
  clientId: number | null;
}

/*----------------------------------
  Load from localStorage
----------------------------------*/
const storedClientId = localStorage.getItem("clientId");

/*----------------------------------
  Initial State
----------------------------------*/
const initialState: ClientState = {
  clientId: storedClientId ? Number(storedClientId) : null,
};

/*----------------------------------
  Client Slice
----------------------------------*/
const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClientId(state, action: PayloadAction<number>) {
      state.clientId = action.payload;
      localStorage.setItem("clientId", action.payload.toString());
    },

    clearClientId(state) {
      state.clientId = null;
      localStorage.removeItem("clientId");
    },
  },
});

/*----------------------------------
  Exports
----------------------------------*/
export const { setClientId, clearClientId } = clientSlice.actions;
export default clientSlice.reducer;
