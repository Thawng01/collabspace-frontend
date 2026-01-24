import axios from "axios";

const baseUrl = "http://localhost:8001/api";
export const clientApi = axios.create({
  baseURL: baseUrl,
});
