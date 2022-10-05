import React from "react";
import { Avatar, Button, TextField } from "@mui/material";
import avatar from "../../assets/default-avatar.png";
import "./style.css";

const UserDetails = () => {
  return (
    <div className="user_details">
      <div className="avatar_section">
        <Avatar className="avatar" alt="user" src={avatar} />
        <Button variant="outlined">Upload Photo</Button>
      </div>
      <div className="details">
        <TextField
          disabled
          id="filled-disabled"
          label="Email"
          variant="filled"
          defaultValue="from server"
        />
        <TextField
          disabled
          id="outlined-disabled"
          label="Name"
          variant="filled"
          defaultValue="from server"
        />
        <TextField
          disabled
          id="filled-disabled"
          label="Password"
          type="password"
          variant="filled"
          defaultValue="from server"
        />
        <TextField
          disabled
          id="filled-disabled"
          label="About me"
          variant="filled"
          defaultValue="from server"
        />
      </div>
      <div className="detail_actions">
        <Button variant="outlined">Edit Details</Button>
        <Button variant="contained">Save</Button>
      </div>
    </div>
  );
};

export default UserDetails;
