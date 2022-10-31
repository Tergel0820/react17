import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/",
});

instance.defaults.withCredentials = true;

export default instance;

// http://rest.queen-spa.xyz:8000/api/v1/