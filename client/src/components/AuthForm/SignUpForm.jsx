import { Alert, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { logout, userSignup } from "../../redux/userSlice";
import { resetData } from "../../redux/noteSlice";

const SignUpForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { status, error_message, isLoggedIn } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    if (status === "userSignup_fulfilled") {
      nav("/");
    }
  }, [status, nav]);

  //is logged in as user then redirect to notes page
  if (isLoggedIn) {
    return <Navigate to="/notes" />;
  }

  //perform signup operation
  const handleSignUp = () => {
    if (status === "pending") {
      return;
    } else {
      dispatch(userSignup(formValues));
      dispatch(logout());
      dispatch(resetData());
      setFormValues({
        name: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="login_form">
      {status === "error" && (
        <Alert severity="error">
          {error_message || "cannot connect to server"}
        </Alert>
      )}
      <h6 className="login_label">Sign up</h6>
      <TextField
        required
        id="name"
        label="Name"
        variant="filled"
        value={formValues.name}
        onChange={(e) =>
          setFormValues({ ...formValues, name: e.currentTarget.value })
        }
        helperText="Name must have more than 3 chars"
      />
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
        type="password"
        value={formValues.password}
        onChange={(e) =>
          setFormValues({ ...formValues, password: e.currentTarget.value })
        }
        helperText="Password must contain 8 chars and a number"
      />
      <Button variant="contained" onClick={handleSignUp}>
        Sign up
      </Button>
    </div>
  );
};

export default SignUpForm;
