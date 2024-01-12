import axios from "axios";

export const baseRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});
