import type { Candidate } from '../types/Candidate';
import api from '../utils/api';
import toast from 'react-hot-toast';

export const getCandidates = async (filters: { status?: string | undefined; department?: string | undefined; search?: string; } = {}): Promise<Candidate[]> => {
    try {
        const params = {
            status: filters.status === 'Position' ? undefined : filters.status,
            department: filters.department === 'Department' ? undefined : filters.department,
            search: filters.search || undefined,
        };
        const res = await api.get('/candidates', { params });

        if (!res.status || res.status >= 400) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data: { status: string; data: Candidate[]; message?: string; } = res.data;
        console.log('Fetched candidates:', data.data);
        return data.data;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Failed to fetch candidates:', error);
        toast.error(`Failed to fetch candidates: ${errorMessage}`);
        throw error;
    }
};

export const addCandidate = async (formData: FormData): Promise<void> => {
    try {
        const response = await api.post('/candidates', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (response.status !== 200 && response.status !== 201) {
            throw new Error('Failed to add candidate');
        }
        toast.success('Candidate added successfully');
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        toast.error(`Failed to add candidate: ${errorMessage}`);
        throw error;
    }
};

export const updateCandidateStatus = async (candidateId: string, newStatus: string): Promise<{ message?: string; }> => {
    try {
        const response = await api.patch(`/candidates/${candidateId}/status`, { status: newStatus });
        if (response.status !== 200) {
            throw new Error('Failed to update candidate status');
        }
        // toast.success(response.data.message || 'Candidate status updated successfully');
        return response.data;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        toast.error(`Failed to update status: ${errorMessage}`);
        throw error;
    }
};

export const deleteCandidate = async (candidateId: string): Promise<void> => {
    try {
        const response = await api.delete(`/candidates/${candidateId}`);
        if (response.status !== 200) {
            throw new Error('Failed to delete candidate');
        }
        toast.success('Candidate deleted successfully');
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        toast.error(`Failed to delete candidate: ${errorMessage}`);
        throw error;
    }
};

export const downloadResume = async (candidateId: string, resumeFilename: string): Promise<void> => {
    try {
        const response = await api.get(`/candidates/${candidateId}/resume`, { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', resumeFilename || 'resume.pdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        toast.success('Resume downloaded successfully');
    } catch (error) {
        toast.error('Failed to download resume');
        console.error('Download error:', error);
        throw error;
    }
};