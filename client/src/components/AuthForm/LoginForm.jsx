import React from "react";
import { Button, TextField } from "@mui/material";
import "./style.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "../../redux/userSlice";

const LoginForm = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const status = useSelector((state) => state.user.status);
  const dispatch = useDispatch();

  //perform login operation
  const handleLogin = () => {
    if (status === "idle") {
      dispatch(checkLogin(formValues));
    }
  };

  return (
    <div className="login_form">
      <h6 className="login_label">Login</h6>
      <TextField
        required
        id="email"
        label="Email"
        variant="filled"
        value={formValues.email}
        onChange={(e) =>
          setFormValues({ ...formValues, email: e.currentTarget.value })
        }
        helperText="Enter a valid email"
      />
      <TextField
        required
        id="password"
        label="Password"
        variant="filled"
        value={formValues.password}
        onChange={(e) =>
          setFormValues({ ...formValues, password: e.currentTarget.value })
        }
        type="password"
        helperText="Password must contain 8 chars and a number"
      />
      <Button variant="contained" onClick={handleLogin}>
        Log in
      </Button>
    </div>
  );
};

export default LoginForm;
