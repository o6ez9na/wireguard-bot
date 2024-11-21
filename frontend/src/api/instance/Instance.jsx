import axios from "axios";

const Instance = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Content-Type": "application/json",
  },
  withCredentials: true, // To enable cookies
});

export default Instance;
