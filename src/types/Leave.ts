import type { Employee } from "./Employee";

export interface Leave {
    _id: string;
    employee: Employee;
    date: string;
    reason: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    documentPath: string;
}