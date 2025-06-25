import axios from "axios";

// const localhostApi = "http://localhost:3333";

export const api = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
