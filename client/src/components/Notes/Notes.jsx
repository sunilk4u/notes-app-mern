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
import { createFile, fetchAll } from "../../redux/noteSlice";
import { useEffect } from "react";

//list of notes with name for selection dropdown
const SelectDropdown = ({ notes }) => {
  console.log(notes);
  return (
    <>
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={10}>Ten</MenuItem>
    </>
  );
};

const Notes = () => {
  const [filename, setFilename] = useState("");
  const [fileSelect, setFileSelect] = useState("");
  const user_id = useSelector((state) => state.user._id);
  const { _id, file_name, data, status, message, notes } = useSelector(
    (state) => state.note
  );
  const dispatch = useDispatch();

  //get all list of notes
  useEffect(() => {
    if (status === "createFile_fulfilled") {
      dispatch(fetchAll({ _id: user_id }));
    }
  }, [_id]);

  //create a new file on button click
  const handleFilename = () => {
    if (status === "pending") {
      return;
    } else {
      dispatch(createFile({ file_name: filename, user_id }));
    }
  };

  //handle current file selection
  const handleFileSelect = (event) => {
    setFileSelect(event.target.value);
  };

  return (
    <div className="notes_panel">
      {status === "error" && (
        <Alert severity="error">{message || "cannot connect to server"}</Alert>
      )}
      {status === "createFile_fulfilled" && (
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
          {notes.map((note) => {
            return <MenuItem value={note._id}>{note.file_name}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <div className="text_area">
        <TextField
          sx={{ width: "100%" }}
          rows={5}
          id="filled-textarea"
          label="Write your note"
          placeholder="Bla Bla Bla"
          multiline
          variant="filled"
        />
      </div>
      <div className="notes_action_buttons">
        <Button variant="contained">Save Note</Button>
        <Button variant="outlined">Download Note</Button>
      </div>
    </div>
  );
};

export default Notes;
