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

//sign up user
export const userSignup = createAsyncThunk(
  "user/signup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userRequest.post("/register", data);
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

//get user details
export const userDetails = createAsyncThunk(
  "user/details",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userRequest.post("/details", data);
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
    _id: "",
    name: "",
    about: "",
    password: "",
    email: "",
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
      state._id = action.payload.data._id;
      state.name = action.payload.data.name;
      state.email = action.payload.data.email;
    },
    [checkLogin.rejected]: (state, action) => {
      state.status = "error";
      state.error_message = action.payload;
    },
    [userSignup.pending]: (state, action) => {
      state.status = "pending";
    },
    [userSignup.fulfilled]: (state, action) => {
      state.status = "fulfiiled";
      state.isLoggedIn = true;
      state._id = action.payload.data._id;
      state.name = action.payload.data.name;
      state.email = action.payload.data.email;
    },
    [userSignup.rejected]: (state, action) => {
      state.status = "error";
      state.error_message = action.payload;
    },

    [userDetails.pending]: (state, action) => {
      state.status = "pending";
    },
    [userDetails.fulfilled]: (state, action) => {
      state.status = "fulfiiled";
      state._id = action.payload.data._id;
      state.about = action.payload.data.about;
    },
    [userDetails.rejected]: (state, action) => {
      state.status = "error";
      state.error_message = action.payload;
    },
  },
});

export const { setStatus } = userSlice.actions;

export default userSlice.reducer;
