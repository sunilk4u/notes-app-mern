import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uploadImageRequest, userRequest } from "../http";

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

//update user details
export const userUpdate = createAsyncThunk(
  "user/update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userRequest.patch("/update", data);
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

//logout user
export const userLogout = createAsyncThunk(
  "user/logout",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userRequest.post("/logout");
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

//delete user
export const userDelete = createAsyncThunk(
  "user/delete",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userRequest.post("/deregister", data);
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

//upload user image
export const uploadImage = createAsyncThunk(
  "user/upload",
  async (data, { rejectWithValue }) => {
    try {
      const response = await uploadImageRequest.post("/upload", data);
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
    email: "",
    status: "idle", //idle, pending, fulfilled, error
    error_message: "",
    image: "",
  },
  reducers: {
    logout: (state) => {
      state.status = "idle";
      state.isLoggedIn = false;
      state._id = "";
      state.name = "";
      state.email = "";
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
      state.status = "userSignup_fulfilled";
      state.isLoggedIn = false;
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
      state.about = action.payload.data.about;
      state.name = action.payload.data.name;
    },
    [userDetails.rejected]: (state, action) => {
      state.status = "error";
      state.error_message = action.payload;
    },
    [uploadImage.pending]: (state, action) => {
      state.staus = "pending";
      state.image = ``;
    },
    [uploadImage.fulfilled]: (state, action) => {
      state.staus = "fullfilled";
      state.image = `${process.env.REACT_APP_API_URI}/static/${
        state._id
      }.jpg?ver=${(Math.random() * 10000000).toFixed()}`;
    },
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
