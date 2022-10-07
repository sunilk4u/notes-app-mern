import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.css";

//header menu items
const HeaderMenu = () => {
  const { isLoggedIn } = useSelector((state) => state.user);

  //if logged in then show user account button
  if (isLoggedIn) {
    return (
      <Button variant="outlined" component={Link} to="/user">
        Account
      </Button>
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
  return (
    <div className="header">
      <div className="header container">
        <div className="header_logo">My Notes</div>
        <div className="auth_buttons">
          <HeaderMenu />
        </div>
      </div>
    </div>
  );
};

export default Header;
