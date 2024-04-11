import axios from "axios";
import { PUBLIC_VERIFICATION_ENDPOINT } from '$env/static/public'

const api = axios.create({
  baseURL : PUBLIC_VERIFICATION_ENDPOINT,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    mode: 'no-cors',
  }
});

export default api;