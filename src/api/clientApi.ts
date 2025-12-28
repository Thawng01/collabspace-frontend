import axios from "axios";

const baseUrl = "http://localhost:9000/api"
export const clientApi = axios.create({
    baseURL: baseUrl
})