import axiosBase from 'axios';

export const axios = axiosBase.create({
    baseURL: process.env.NEXT_PUBLIC_URL_BASEPATH,
});
