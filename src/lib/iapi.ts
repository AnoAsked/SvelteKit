import axios from "axios";

const iapi = axios.create({
  baseURL : "https://api.imgur.com/3/image/",
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Authorization': "Client-ID ef951e676f7e6bc",
    mode: 'no-cors',
  }
});

export default iapi;