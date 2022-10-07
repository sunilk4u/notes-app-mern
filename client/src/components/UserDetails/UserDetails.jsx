import React, { useEffect } from "react";
import { Avatar, Button, TextField } from "@mui/material";
import avatar from "../../assets/default-avatar.png";
import "./style.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userDetails } from "../../redux/userSlice";

const UserDetails = () => {
  const [edit, setEdit] = useState(true);
  const { _id, name, email, about } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    name: name,
    email: email,
    about: about,
  });

  //when page loads then load user data
  useEffect(() => {
    dispatch(userDetails({ _id }));
  }, []);

  //when about fetch is complete then render the component again
  useEffect(() => {
    setFormValues({ ...formValues, about: about });
  }, [about]);

  return (
    <div className="user_details">
      <div className="avatar_section">
        <Avatar className="avatar" alt="user" src={avatar} />
        <Button variant="outlined">Upload Photo</Button>
      </div>
      <div className="details">
        <TextField
          disabled
          id="email"
          label="Email"
          variant="filled"
          defaultValue={formValues.email}
        />
        <TextField
          disabled={edit}
          id="name"
          label="Name"
          variant="filled"
          value={formValues.name}
          onChange={(e) =>
            setFormValues({ ...formValues, name: e.currentTarget.value })
          }
          defaultValue={formValues.name}
        />
        <TextField
          disabled={edit}
          id="about-me"
          label="About me"
          variant="filled"
          value={formValues.about}
          onChange={(e) =>
            setFormValues({ ...formValues, about: e.currentTarget.value })
          }
          defaultValue={formValues.about}
        />
      </div>
      <div className="detail_actions">
        <Button variant="outlined" onClick={() => setEdit((prev) => !prev)}>
          Edit Details
        </Button>
        <Button variant="contained">Save</Button>
      </div>
    </div>
  );
};

export default UserDetails;
