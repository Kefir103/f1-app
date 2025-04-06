import axiosBase from 'axios';

export const axios = axiosBase.create({
    baseURL: process.env.API_URL,
});
