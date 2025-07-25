import Spinner from '../Spinner';
import type { FC } from 'react';
import AttendanceRow from './AttendanceRow';
import type { Attendance } from '../../types/Attendance';

interface Props {
    isLoading: boolean;
    attendance: Attendance[];
    filterStatus?: string;
}

const AttendanceTableBody: FC<Props> = ({ isLoading, attendance, filterStatus }) => {
    if (isLoading) return <Spinner />;

    const filteredAttendance = filterStatus && filterStatus !== 'Status'
        ? attendance.filter(record => record.status === filterStatus)
        : attendance.filter(record => record.status === 'Present' || record.status === 'Absent');

    if (!filteredAttendance.length) {
        return <div className="empty-state">No attendance records found.</div>;
    }

    return (
        <div className="candidate-table--body">
            {filteredAttendance.map((item) => (
                <AttendanceRow key={item.employee._id} item={item} />
            ))}
        </div>
    );
};

export default AttendanceTableBody;
