import type { Candidate } from "../types/Candidate";

const API = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_PROD_URL || 'http://localhost:5000/api/v1';

interface ApiResponse<T> {
    status: string;
    data: T;
    message?: string;
}

export async function getCandidates(): Promise<Candidate[]> {
    try {
        const res = await fetch(`${API}/candidates`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${getTokenFromCookie()}`
            }
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data: ApiResponse<Candidate[]> = await res.json();
        console.log(data.data);


        return data.data;
    } catch (error) {
        console.error('Failed to fetch candidates:', error);
        throw error;
    }
}
