import React from "react";
import { Alert, Button, TextField } from "@mui/material";
import "./style.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { checkLogin } from "../../redux/userSlice";

const LoginForm = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const { status, error_message, isLoggedIn } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  //perform login operation
  const handleLogin = () => {
    if (status === "pending") {
      return;
    } else {
      dispatch(checkLogin(formValues));
    }
  };

  //is logged in as user then redirect to notes page
  if (isLoggedIn) {
    return <Navigate to="/notes" />;
  }

  return (
    <div className="login_form">
      {status === "error" && (
        <Alert severity="error">
          {error_message || "cannot connect to server"}
        </Alert>
      )}
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
