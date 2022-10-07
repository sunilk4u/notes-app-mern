import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../http";

//check user login auth
export const checkLogin = createAsyncThunk("user/login", async (data) => {
  
    const response = await userRequest.post("/login", data);
    return response;

});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    user_id: "",
    status: "idle", //idle, pending, fulfilled, error
    error_message: ""
  },
  reducers: {
    decrement: (state) => {
      state.value -= 1;
    },
  },
  extraReducers: {
    [checkLogin.pending]: (state, action) => {
      state.status = "pending";
    },
    [checkLogin.fulfilled]: (state, action) => {
      state.status = "fulfiiled";
      state.isLoggedIn = true;
    },
    [checkLogin.rejected]: (state, action) => {
      state.status = "error";
    },
  },
});

export const { decrement } = userSlice.actions;

export default userSlice.reducer;
