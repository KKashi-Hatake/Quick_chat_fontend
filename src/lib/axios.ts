import { CustomSession } from '@/app/api/auth/[...nextauth]/options';
import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // your express server base URL
});

api.interceptors.request.use(
    async (config) => {
        const session: CustomSession | null = await getSession() as CustomSession;

        if (session?.user?.token) {
            config.headers.Authorization = `${session.user?.token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clean session via next-auth
            signOut({ callbackUrl: '/login' });

            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

export default api;
