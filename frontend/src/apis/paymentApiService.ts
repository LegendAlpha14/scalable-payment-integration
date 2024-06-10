import axios from "axios";

export const paymentApiService = axios.create({

    baseURL:`http://localhost:4000/`,  

    headers: { 'paymentEnvironment': import.meta.env.VITE_ENVIRONMENT }
});

