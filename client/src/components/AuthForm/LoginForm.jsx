import React from "react";
import { Button, TextField } from "@mui/material";
import "./style.css";

const LoginForm = () => {
  return (
    <div className="login_form">
      <h6 className="login_label">Login</h6>
      <TextField
        required
        id="filled-basic"
        label="Email"
        variant="filled"
        helperText="Enter a valid email"
      />
      <TextField
        required
        id="filled-basic"
        label="Password"
        variant="filled"
        type="password"
        helperText="Password must contain 8 chars and a number"
      />
      <Button variant="contained">Log in</Button>
    </div>
  );
};

export default LoginForm;
