import axios from "axios";

const userRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URI + "/user",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

const notesRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URI + "/text",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

module.exports = {
  userRequest,
  notesRequest,
};
