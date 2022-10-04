import React from "react";
import Button from "@mui/material/Button";
import "./style.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header container">
        <div className="header_logo">My Notes</div>
        <div className="auth_buttons">
          <Button color="primary" variant="contained">Log in</Button>
          <Button variant="outlined">Sign Up</Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
