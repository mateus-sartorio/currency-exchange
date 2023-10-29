import { configureStore } from "@reduxjs/toolkit";
import appStateReducer from "./appStateReducer";
import userInfoReducer from "./userInfoReducer";

export const store = configureStore({
  reducer: {
    appState: appStateReducer,
    userInfo: userInfoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
