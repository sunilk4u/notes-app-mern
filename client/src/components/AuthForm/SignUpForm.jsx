import { Button, TextField } from "@mui/material";
import React from "react";

const SignUpForm = () => {
  return (
    <div className="login_form">
      <h6 className="login_label">Sign up</h6>
      <TextField
        required
        id="filled-basic"
        label="Name"
        variant="filled"
        helperText="Name must have more than 3 chars"
      />
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
      <Button variant="contained">Sign up</Button>
    </div>
  );
};

export default SignUpForm;
