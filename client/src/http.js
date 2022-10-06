import axios from "axios";

export const userRequest = axios.create({
  baseURL: `${process.env.REACT_APP_API_URI}/api/user`,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const notesRequest = axios.create({
  baseURL: `${process.env.REACT_APP_API_URI}/api/text`,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});
