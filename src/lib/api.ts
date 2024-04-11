import axios from "axios";

const api = axios.create({
  baseURL : "https://verificationserver-opvs.onrender.com/verification",
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    mode: 'no-cors',
  }
});

export default api;