import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import { logout, userLogout } from "../../redux/userSlice";
import { resetData } from "../../redux/noteSlice";

//header menu items
const HeaderMenu = ({ logout }) => {
  const { isLoggedIn } = useSelector((state) => state.user);

  //if logged in then show user account button
  if (isLoggedIn) {
    return (
      <>
        <Button variant="outlined" component={Link} to="/user">
          Account
        </Button>
        <Button variant="outlined" component={Link} to="/notes">
          Notes
        </Button>
        <Button variant="contained" component={Link} to="/" onClick={logout}>
          Logout
        </Button>
      </>
    );
  } else {
    return (
      <>
        <Button variant="contained" component={Link} to="/">
          Log in
        </Button>
        <Button variant="outlined" component={Link} to="/signup">
          Sign Up
        </Button>
      </>
    );
  }
};

const Header = () => {
  const dispatch = useDispatch();

  //logout and clear state when clicked on logout button
  const logoutHandler = () => {
    dispatch(userLogout())
    dispatch(logout())
    dispatch(resetData())
  };

  return (
    <div className="header">
      <div className="header container">
        <div className="header_logo">My Notes</div>
        <div className="auth_buttons">
          <HeaderMenu logout={logoutHandler} />
        </div>
      </div>
    </div>
  );
};

export default Header;
