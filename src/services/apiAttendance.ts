import type { Attendance } from '../types/Attendance';
import api from '../utils/api';

const API_URL = '/attendance';

// In apiAttendance.ts
export const getTodayAttendanceMerged = async (filters: { status?: string; search?: string; } = {}): Promise<Attendance[]> => {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.search) params.append('search', filters.search);
    const response = await api.get(`${API_URL}/today`, { params });
    return response.data;
};

export const getAttendance = async (filters: { status?: string; search: string; }): Promise<Attendance[]> => {
    const params = {
        position: filters.status === 'Status' ? undefined : filters.search,
        search: filters.search || undefined,
    };
    const response = await api.get(`${API_URL}`, { params });
    return response.data;
};

export const getAttendanceById = async (id: string): Promise<Attendance> => {
    const response = await api.get(`${API_URL}/${id}`);
    return response.data;
};

export const addAttendance = async (data: {
    employeeId: string;
    status: 'Present' | 'Absent';
    tasks: string;
}): Promise<Attendance> => {
    const response = await api.post(`${API_URL}`, data);
    return response.data;
};

export const updateAttendance = async (
    id: string,
    data: { status?: 'Present' | 'Absent'; tasks?: string; }
): Promise<Attendance> => {
    const response = await api.patch(`${API_URL}/${id}`, data);
    return response.data;
};