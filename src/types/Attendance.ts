// types/Attendance.ts
export interface Attendance {
    _id: string | null;
    employee: {
        profile: string;
        _id: string;
        name: string;
        email: string;
        phoneNumber: string;
        position: string;
        department: string;
        joiningDate: string;
        createdAt: string;
    };
    date: string;
    status: 'Present' | 'Absent';
    tasks: string;
}