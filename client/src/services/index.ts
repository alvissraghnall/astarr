// api/v1/auth/create
import axios from "axios";

export const apiUrl = "http://[::1]:3000/api/v1";

export * from "./products.service";

export const PUBLIC_REQ = axios.create({
    baseURL: apiUrl
});


export const AUTH_REQ = () => {
    const defaultOptions = {
        method: 'get',
        headers: { 
            'content-type': 'application/json'
        },
        baseURL: apiUrl
    }

    let instance = axios.create(defaultOptions);

    instance.interceptors.request.use(config => {
        const JWT_TOKEN = localStorage.getItem("JWT_TOKEN");
        // const JWT_TOKEN = localStorage.getItem("__BTS__TKN");

        config.headers = config.headers ?? {};

        config.headers["Authorization"] = JWT_TOKEN ? `Bearer ${JWT_TOKEN}` : '';
        return config;
    })
    return instance;
}