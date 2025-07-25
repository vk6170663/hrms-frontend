import type { Attendance } from '../types/Attendance';
import api from '../utils/api';

const API_URL = '/attendance';

export const getTodayAttendanceMerged = async (filters: { status?: string; search?: string; } = {}): Promise<Attendance[]> => {
    const params = {
        status: filters.status === 'Status' ? undefined : filters.status,
        search: filters.search || undefined,
    };
    const response = await api.get(`${API_URL}/today`, { params });
    console.log(response.data);

    return response.data;
};

export const getAttendance = async (filters: { status?: string; search: string; }): Promise<Attendance[]> => {
    const params = {
        status: filters.status === 'Status' ? undefined : filters.search,
        search: filters.search || undefined,
    };
    const response = await api.get(`${API_URL}`, { params });
    console.log(response.data);

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
    id: string | null,
    data: { status?: 'Present' | 'Absent'; tasks?: string; }
): Promise<Attendance> => {
    const response = await api.patch(`${API_URL}/${id}`, data);
    return response.data;
};