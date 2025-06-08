import axios from "axios";

export const serverApi = axios.create({ baseURL: process.env.SERVER_API });
