import axios from "axios";

const iapi = axios.create({
  baseURL : "https://api.imgur.com/3/image",
  headers: {
    'Authorization': "Client-ID ef951e676f7e6bc",
  }
});

export default iapi;