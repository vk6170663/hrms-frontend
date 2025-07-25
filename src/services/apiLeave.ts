import type { Leave } from '../types/Leave';
import api from '../utils/api';

export const addLeave = async (employeeId: string, date: string, document: File, reason: string): Promise<Leave> => {
    const formData = new FormData();
    formData.append('employeeId', employeeId);
    formData.append('date', date);
    formData.append('document', document);
    formData.append('reason', reason);

    const response = await api.post("/leaves", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log(response);

    return response.data;
};

export const updateLeaveStatus = async (id: string, status: 'Pending' | 'Approved' | 'Rejected'): Promise<Leave> => {
    console.log(api.put(`/leaves/${id}`));
    const response = await api.put(`/leaves/${id}`, { status });

    console.log(response);

    return response.data;
};

export const getLeaves = async (filters: { status?: string; search?: string; date?: string; } = {}): Promise<Leave[]> => {
    const params = {
        status: filters.status === 'Status' ? undefined : filters.status,
        search: filters.search || undefined,
        date: filters.date || undefined
    };
    const response = await api.get(`/leaves`, { params });
    return response.data;
};

export const downloadLeaveDocument = async (id: string, fileName: string): Promise<void> => {
    const response = await api.get(`/leaves/${id}/download`, {
        responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
};