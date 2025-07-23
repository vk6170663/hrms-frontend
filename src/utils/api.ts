import axios, { AxiosError, } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import type { ErrorResponse } from '../types/auth';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

let csrfToken: string | null = null;

const fetchCsrfToken = async () => {
    if (!csrfToken) {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL || import.meta.env.VITE_API_PROD_URL || 'http://localhost:5000/api/v1'}/auth/csrf-token`, {
            withCredentials: true,
        });
        csrfToken = data.csrfToken;
    }
    return csrfToken;
};

api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        if (['post', 'put', 'delete'].includes(config.method?.toLowerCase() || '')) {
            const token = await fetchCsrfToken();
            config.headers = config.headers || {}; // Ensure headers is always an object
            config.headers['X-CSRF-Token'] = token;
        }
        return config; // Return typed InternalAxiosRequestConfig
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ErrorResponse>) => {
        const message = error.response?.data.message || 'An unexpected error occurred';
        if (error.response?.status === 403 && message.includes('CSRF')) {
            csrfToken = null;
        }
        return Promise.reject(new Error(message));
    }
);

export default api;