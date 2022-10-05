import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./style.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header container">
        <div className="header_logo">My Notes</div>
        <div className="auth_buttons">
          <Button variant="contained" component={Link} to="/">
            Log in
          </Button>
          <Button variant="outlined" component={Link} to="/signup">Sign Up</Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
