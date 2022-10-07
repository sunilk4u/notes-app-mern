import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { notesRequest } from "../http";

//create new file
export const createFile = createAsyncThunk(
  "note/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await notesRequest.put("/write", data);
      return response;
    } catch (err) {
      if (!err.response) throw err;
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const noteSlice = createSlice({
  name: "note",
  initialState: {
    _id: "",
    file_name: "",
    data: "",
    status: "idle", //idle, pending, fulfilled, error
    message: "",
  },
//   reducers: {},
  extraReducers: {
    [createFile.pending]: (state, action) => {
      state.status = "pending";
    },
    [createFile.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state._id = action.payload.data._id;
      state.file_name = action.payload.data.file_name;
      state.data = action.payload.data.data;
      state.message = "file created successfully"
    },
    [createFile.rejected]: (state, action) => {
      state.status = "error";
      state.message = action.payload;
    },
  },
});

// export const {} = noteSlice.actions;

export default noteSlice.reducer;
