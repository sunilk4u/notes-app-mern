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

//fetch all file
export const fetchAll = createAsyncThunk(
  "note/fetchall",
  async (data, { rejectWithValue }) => {
    try {
      const response = await notesRequest.post("/fetchall", data);
      return response;
    } catch (err) {
      if (!err.response) throw err;
      return rejectWithValue(err.response.data.message);
    }
  }
);

//fetch single file
export const fetch = createAsyncThunk(
  "note/fetch",
  async (data, { rejectWithValue }) => {
    try {
      const response = await notesRequest.post("/fetch", data);
      return response;
    } catch (err) {
      if (!err.response) throw err;
      return rejectWithValue(err.response.data.message);
    }
  }
);

//save the note
export const saveNote = createAsyncThunk(
  "note/save",
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

//delete the note
export const deleteNote = createAsyncThunk(
  "note/delete",
  async (data, { rejectWithValue }) => {
    try {
      const response = await notesRequest.post("/delete", data);
      return response;
    } catch (err) {
      if (!err.response) throw err;
      return rejectWithValue(err.response.data.message);
    }
  }
);

const intitialState = {
  _id: "",
  file_name: "",
  data: "",
  status: "idle", //idle, pending, fulfilled, error
  message: "",
  note: {},
  notes: [],
};

export const noteSlice = createSlice({
  name: "note",
  initialState: intitialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    resetData: (state, action) => {
      return {
        _id: "",
        file_name: "",
        data: "",
        status: "idle",
        message: "",
        note: {},
      };
    },
  },
  extraReducers: {
    [createFile.pending]: (state, action) => {
      state.status = "createFile_pending";
    },
    [createFile.fulfilled]: (state, action) => {
      state.status = "createFile_fulfilled";
      state._id = action.payload.data._id;
      state.message = "file created successfully";
      state.data = "";
    },
    [createFile.rejected]: (state, action) => {
      state.status = "createFile_error";
      state.message = action.payload;
    },
    [fetchAll.pending]: (state, action) => {
      state.status = "fetchAll_pending";
    },
    [fetchAll.fulfilled]: (state, action) => {
      state.status = "fetchAll_fulfilled";
      state.notes = action.payload.data.notes;
    },
    [fetchAll.rejected]: (state, action) => {
      state.status = "fetchAll_error";
      state.message = action.payload;
    },
    [fetch.pending]: (state, action) => {
      state.status = "fetch_pending";
    },
    [fetch.fulfilled]: (state, action) => {
      state.status = "fetch_fulfilled";
      state.note = action.payload.data;
      state.data = action.payload.data.data;
      state._id = action.payload.data._id;
      state.file_name = action.payload.data.file_name;
    },
    [fetch.rejected]: (state, action) => {
      state.status = "fetch_error";
      state.message = action.payload;
    },
    [saveNote.pending]: (state, action) => {
      state.status = "saveNote_pending";
    },
    [saveNote.fulfilled]: (state, action) => {
      state.status = "saveNote_fulfilled";
      state.message = "Note Saved!";
    },
    [saveNote.rejected]: (state, action) => {
      state.status = "saveNote_error";
      state.message = action.payload;
    },
    [deleteNote.fulfilled]: (state, action) => {
      state.status = "deleteNote_fulfilled";
    },
  },
});

export const { setData, resetData } = noteSlice.actions;

export default noteSlice.reducer;
