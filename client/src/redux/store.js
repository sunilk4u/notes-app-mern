import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import noteSlice from "./noteSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    note: noteSlice,
  },
});
