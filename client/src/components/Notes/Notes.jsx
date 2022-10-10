import React, { useState } from "react";
import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import {
  createFile,
  deleteNote,
  downloadNote,
  fetch,
  fetchAll,
  resetData,
  saveNote,
  setData,
} from "../../redux/noteSlice";
import { useEffect } from "react";

const Notes = () => {
  const [filename, setFilename] = useState("");
  const [fileSelect, setFileSelect] = useState("");
  const user_id = useSelector((state) => state.user._id);
  const { _id, data, status, message, notes } = useSelector(
    (state) => state.note
  );
  const dispatch = useDispatch();

  //get all list of notes and current loaded file
  useEffect(() => {
    setFileSelect(_id);
    if (
      status === "createFile_fulfilled" ||
      status === "idle" ||
      status === "deleteNote_fulfilled" ||
      status === "idle" ||
      status === "fetch_error"
    ) {
      dispatch(fetchAll({ _id: user_id }));
    }
  }, [_id, status]);

  //create a new file on button click
  const handleFilename = () => {
    if (status === "pending") {
      return;
    } else {
      dispatch(createFile({ file_name: filename, user_id }));
    }
  };

  //handle save note
  const handleSaveNote = () => {
    dispatch(saveNote({ _id, user_id, data }));
  };

  //handle delete note
  const handleDeleteNote = () => {
    dispatch(deleteNote({ _id, user_id }));
    dispatch(resetData());
  };

  //handle dowload button
  const handleDownload = () => {
    if (_id === "") {
      return;
    }
    dispatch(downloadNote(_id));
  };

  //handle current file selection
  const handleFileSelect = (e) => {
    setFileSelect(e.target.value);

    //fetch the file data
    dispatch(fetch({ _id: e.target.value }));
  };

  return (
    <div className="notes_panel">
      {status === "error" && (
        <Alert severity="error">{message || "cannot connect to server"}</Alert>
      )}
      {(status === "createFile_fulfilled" ||
        status === "saveNote_fulfilled") && (
        <Alert severity="success">
          {message || "cannot connect to server"}
        </Alert>
      )}
      <div className="add_note">
        <TextField
          id="standard"
          label="Add New Note"
          variant="outlined"
          value={filename}
          onChange={(e) => setFilename(e.currentTarget.value)}
        />
        <Button variant="contained" onClick={handleFilename}>
          Add
        </Button>
      </div>
      <FormControl className="notes_select">
        <InputLabel id="demo-simple-select-label">Choose your note</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={fileSelect}
          label="Notes"
          onChange={handleFileSelect}
        >
          {notes &&
            notes.map((note) => {
              return <MenuItem value={note._id}>{note.file_name}</MenuItem>;
            })}
        </Select>
      </FormControl>
      <div className="text_area">
        <TextField
          sx={{ width: "100%" }}
          rows={5}
          id="filled-textarea"
          placeholder="Bla Bla Bla"
          multiline
          variant="filled"
          value={data}
          onChange={(e) => dispatch(setData(e.currentTarget.value))}
        />
      </div>
      <div className="notes_action_buttons">
        <Button variant="contained" onClick={handleSaveNote}>
          Save Note
        </Button>
        <Button variant="outlined" onClick={handleDownload}>
          Download Note
        </Button>
        <Button variant="outlined" onClick={handleDeleteNote}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Notes;
