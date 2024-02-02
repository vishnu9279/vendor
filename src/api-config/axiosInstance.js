import axios from "axios";
import {
    serverUrl
} from "./configuration.js";

const axiosInstance = axios.create({
    baseURL: serverUrl
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) config.headers.Authorization = `Bearer ${token}`;

        config.headers.platform = "web";

        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {

        return response;
    },
    (error) => {
        console.log("axiosInstance response error", error);
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access, e.g., redirect to sign-in page
            console.log("Unauthorized access. Redirecting to sign-in page.");
            localStorage.removeItem("token");
            window.location.href = "/vendor-signIn";
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
