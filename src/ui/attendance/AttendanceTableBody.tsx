import Spinner from '../Spinner';
import type { FC } from 'react';
import AttendanceRow from './AttendanceRow';
import type { Attendance } from '../../types/Attendance';

interface Props {
    isLoading: boolean;
    attendance: Attendance[];
}

const AttendanceTableBody: FC<Props> = ({ isLoading, attendance }) => {
    if (isLoading) return <Spinner />;

    if (attendance.length === 0)
        return <div className="no-candidate">No Attendance Records Found!</div>;

    return (
        <div className="candidate-table--body">
            {attendance.map((item) => (
                <AttendanceRow key={item._id} item={item} />
            ))}
        </div>
    );
};

export default AttendanceTableBody;
