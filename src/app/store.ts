import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "../features/theme/themeSlice";
import eventReducer from "../features/events/eventSlice";
import chatReducer from "@/features/chat/redux/chatSlice";
import authReducer from "@/features/auth/redux/authSlice";
import { baseApi } from "@/api";

export const store = configureStore({
  reducer: {
    theme: settingReducer,
    events: eventReducer,
    auth: authReducer,
    chat: chatReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Export these types for typed hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
