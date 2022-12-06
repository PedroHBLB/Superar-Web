import axios from "axios";

const api = axios.create({
  // baseURL: "http://192.168.11.79:8000",
  //baseURL: `http://177.190.201.227:3000`,
  baseURL:"http://192.168.11.105:3000"
});

export { api };
