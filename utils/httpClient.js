import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const axiosInstance = axios.create({
    headers: {
        Authorization: `token ${process.env.PERSONAL_GITHUB_TOKEN}`,
    }
});