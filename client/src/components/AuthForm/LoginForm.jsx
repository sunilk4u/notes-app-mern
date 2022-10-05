import React from "react";
import { Button, TextField } from "@mui/material";
import "./style.css";

const LoginForm = () => {
  return (
    <div className="login_form">
      <h6 className="login_label">Login</h6>
      <TextField id="filled-basic" label="Email" variant="filled" />
      <TextField
        id="filled-basic"
        label="Password"
        variant="filled"
        type="password"
      />
      <Button variant="contained">Log in</Button>
    </div>
  );
};

export default LoginForm;
