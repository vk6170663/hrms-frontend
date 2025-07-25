export interface Attendance {
    _id: string;
    employee: {
        _id: string;
        name: string;
        position: string;
        department: string;
        image?: string;
    };
    date: string;
    status: 'Present' | 'Absent';
    tasks: string;
}
