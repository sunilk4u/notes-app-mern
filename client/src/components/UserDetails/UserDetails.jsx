import React, { useEffect } from "react";
import { Avatar, Button, TextField } from "@mui/material";
import avatar from "../../assets/default-avatar.png";
import "./style.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  logout,
  uploadImage,
  userDelete,
  userDetails,
  userUpdate,
} from "../../redux/userSlice";

const UserDetails = () => {
  const [edit, setEdit] = useState(true);
  const { _id, name, email, about, image } = useSelector((state) => state.user);
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
    setFormValues({ ...formValues, about: about, name: name, email: email });
  }, [about, name, email]);

  //when save button is clicked save the data
  const saveHandler = () => {
    if (edit === true) {
      return;
    }
    dispatch(
      userUpdate({
        _id,
        name: formValues.name,
        email: formValues.email,
        about: formValues.about,
      })
    );
    setEdit(true);
    dispatch(userDetails({ _id }));
  };

  //delete account handler
  const handleDelete = () => {
    dispatch(userDelete({ _id }));
    dispatch(logout());
  };

  //upload image handler
  const handleUpload = () => {
    const file = document.getElementById("file");
    const formData = new FormData();
    formData.append("_id", _id);
    formData.append("file", file.files[0]);
    dispatch(uploadImage(formData));
  };

  return (
    <div className="user_details">
      <form id="form" encType="multipart/form-data">
        <div className="avatar_section">
          <Avatar
            className="avatar"
            alt="user"
            src={
              image === ""
                ? `${process.env.REACT_APP_API_URI}/static/${_id}.jpg`
                : image
            }
          />
          <input id="file" type="file" name="file" />
          <Button variant="outlined" onClick={handleUpload}>
            Upload Photo
          </Button>
        </div>
      </form>
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
        />
      </div>
      <div className="detail_actions">
        <Button variant="outlined" onClick={() => setEdit((prev) => !prev)}>
          Edit Details
        </Button>
        <Button variant="outlined" onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="contained" onClick={saveHandler}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default UserDetails;
