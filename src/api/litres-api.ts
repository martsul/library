import axios from "axios";
import { config } from "dotenv";

config();

export const litresApi = axios.create({ baseURL: process.env.LITRES_URL });
