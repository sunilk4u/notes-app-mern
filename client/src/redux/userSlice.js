import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../http";

//check user login auth
export const checkLogin = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userRequest.post("/login", data);
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    user_id: "",
    status: "idle", //idle, pending, fulfilled, error
    error_message: "",
  },
  reducers: {
    setStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: {
    [checkLogin.pending]: (state, action) => {
      state.status = "pending";
    },
    [checkLogin.fulfilled]: (state, action) => {
      state.status = "fulfiiled";
      state.isLoggedIn = true;
      state.user_id = action.payload._id;
    },
    [checkLogin.rejected]: (state, action) => {
      state.status = "error";
      state.error_message = action.payload;
    },
  },
});

export const { setStatus } = userSlice.actions;

export default userSlice.reducer;
