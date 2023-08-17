import axios from 'axios';

export const request = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_SERVER,
    headers: {
      "Content-Type": "application/json",
    },
  });