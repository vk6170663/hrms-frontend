import type { Employee } from '../types/Employee';
import api from '../utils/api';
import toast from 'react-hot-toast';

export const getEmployees = async (filters: { position?: string; search?: string; } = {}): Promise<Employee[]> => {
    try {
        const params = {
            position: filters.position === 'Position' ? undefined : filters.position,
            search: filters.search || undefined,
        };
        const res = await api.get('/employees', { params });

        if (!res.status || res.status >= 400) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const employees = Array.isArray(res.data) ? res.data : res.data.data;
        if (!employees || !Array.isArray(employees)) {
            throw new Error('Invalid response format: expected an array of employees');
        }
        return employees;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Failed to fetch employees:', error);
        toast.error(`Failed to fetch employees: ${errorMessage}`);
        throw error;
    }
};

export const getEmployeeDetails = async (employeeId: string): Promise<Employee> => {
    try {
        const res = await api.get(`/employees/${employeeId}`);

        if (!res.status || res.status >= 400) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data: { status: string; data: Employee; message?: string; } = res.data;
        return data.data;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Failed to fetch employee details:', error);
        toast.error(`Failed to fetch employee details: ${errorMessage}`);
        throw error;
    }
};

export const updateEmployee = async (employeeId: string, updates: Partial<Employee>): Promise<void> => {
    try {
        const response = await api.patch(`/employees/${employeeId}`, updates);
        if (response.status !== 200) {
            throw new Error('Failed to update employee');
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        toast.error(`Failed to update employee: ${errorMessage}`);
        throw error;
    }
};

export const deleteEmployee = async (employeeId: string): Promise<void> => {
    try {
        const response = await api.delete(`/employees/${employeeId}`);
        if (response.status !== 200) {
            throw new Error('Failed to delete employee');
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        toast.error(`Failed to delete employee: ${errorMessage}`);
        throw error;
    }
};