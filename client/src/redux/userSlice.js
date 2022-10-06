import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { decrement } = userSlice.actions;

export default userSlice.reducer;
