import axios from "axios";

export const userRequest = axios.create({
  baseURL: `${process.env.REACT_APP_API_URI}/api/user`,
  timeout: 1000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const notesRequest = axios.create({
  baseURL: `${process.env.REACT_APP_API_URI}/api/text`,
  timeout: 1000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const blobNotesRequest = axios.create({
  baseURL: `${process.env.REACT_APP_API_URI}/api/text`,
  timeout: 1000,
  withCredentials: true,
  responseType: "blob",
  headers: {
    "Content-Type": "application/octet-stream",
  },
});

export const uploadImageRequest = axios.create({
  baseURL: `${process.env.REACT_APP_API_URI}/api/user`,
  timeout: 1000,
  withCredentials: true,
});
