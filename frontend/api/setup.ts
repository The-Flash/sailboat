import axios from "axios";

export const taskAPI = axios.create({
    baseURL: process.env.NEXT_PUBLIC_CLIENT_URL as string,
    headers: {
        "Content-Type": "application/json"
    }
});