import axios, { AxiosError } from 'axios';
import type { AxiosRequestConfig, AxiosInstance } from 'axios';
import type { ErrorResponse } from '../types/auth';

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

let csrfToken: string | null = null;

const fetchCsrfToken = async () => {
    if (!csrfToken) {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/auth/csrf-token`, {
            withCredentials: true,
        });
        csrfToken = data.csrfToken;
    }
    return csrfToken;
};

api.interceptors.request.use(async (config: AxiosRequestConfig) => {
    if (['post', 'put', 'delete'].includes(config.method?.toLowerCase() || '')) {
        const token = await fetchCsrfToken();
        config.headers = config.headers || {};
        config.headers['X-CSRF-Token'] = token;
    }
    return config;
});

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