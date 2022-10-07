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
import { createFile } from "../../redux/noteSlice";

const Notes = () => {
  const [age, setAge] = useState("");
  const [filename, setFilename] = useState("");
  const user_id = useSelector((state) => state.user._id);
  const { _id, file_name, data, status, message } = useSelector(
    (state) => state.note
  );
  const dispatch = useDispatch();

  //create a new file on button click
  const handleFilename = () => {
    if (status === "pending") {
      return;
    } else {
      dispatch(createFile({ file_name: filename, user_id }));
    }
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className="notes_panel">
      {status === "error" && (
        <Alert severity="error">
          {message || "cannot connect to server"}
        </Alert>
      )}
      {status === "fulfilled" && (
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
          value={age}
          label="Notes"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
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
