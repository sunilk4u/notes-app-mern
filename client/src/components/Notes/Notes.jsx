import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "./style.css";

const Notes = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className="notes_panel">
      <div className="add_note">
        <TextField id="standard" label="Add New Note" variant="outlined" />
        <Button variant="contained">Add</Button>
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
