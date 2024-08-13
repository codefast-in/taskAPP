import axios from "axios";

export const app = axios.create({
  baseURL: "https://forms-3n00.onrender.com/api/v2/",
  withCredentials: true,
});
