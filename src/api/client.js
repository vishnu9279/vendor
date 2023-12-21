import axios from "axios";

const client = axios.create({
  baseURL: "https://junkbazzar.onrender.com/api",
});

export default client;
