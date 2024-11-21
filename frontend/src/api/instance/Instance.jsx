import axios from "axios";

const Instance = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default Instance;
