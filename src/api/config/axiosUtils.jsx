import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  // withCredentials: true, //enable when authentication is enabled
  timeout: 600000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
