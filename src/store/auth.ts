/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import api from '../utils/api';
import type { User, LoginCredentials, RegisterCredentials } from '../types/auth';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: RegisterCredentials) => Promise<void>;
    logout: () => Promise<void>;
    initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    login: async (credentials: LoginCredentials) => {
        try {
            const { data } = await api.post('/auth/login', credentials);
            set({ user: data.user, isAuthenticated: true });
        } catch (error: any) {
            throw new Error(error.message);
        }
    },
    register: async (credentials: RegisterCredentials) => {
        try {
            await api.post('/auth/register', credentials);
        } catch (error: any) {
            throw new Error(error.message);
        }
    },
    logout: async () => {
        try {
            await api.post('/auth/logout');
            set({ user: null, isAuthenticated: false });
        } catch (error: any) {
            throw new Error(error.message);
        }
    },
    initialize: async () => {
        try {
            const { data } = await api.get('/auth/me', { withCredentials: true });
            set({ user: data.user, isAuthenticated: !!data.user });
            setTimeout(() => {
                set({ user: null, isAuthenticated: false });
            }, 2 * 60 * 60 * 1000);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            set({ user: null, isAuthenticated: false });
        }
    },
}));