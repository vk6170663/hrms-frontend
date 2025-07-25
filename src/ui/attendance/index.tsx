import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AttendanceTableHeader from './AttendanceTableHeader';
import AttendanceTableBody from './AttendanceTableBody';
import { getTodayAttendanceMerged } from '../../services/apiAttendance';

const AttendanceTable = () => {
    const [filters, setFilters] = useState<{ status?: string; search: string; }>({
        status: 'Status',
        search: '',
    });

    // const queryClient = useQueryClient();

    const { isLoading, data: attendance = [] } = useQuery({
        queryKey: ['attendance', filters],
        queryFn: () => getTodayAttendanceMerged(filters),
        refetchOnWindowFocus: false,
    });

    return (
        <div className="candidate-container">
            <AttendanceTableHeader onFilterChange={setFilters} />
            <div className="candidate-table--wrapper">
                <div className="attendance-table--header">
                    <div>Profile</div>
                    <div>Name</div>
                    <div>Position</div>
                    <div>Department</div>
                    <div>Tasks</div>
                    <div>Status</div>
                    <div>Action</div>
                </div>
                <AttendanceTableBody isLoading={isLoading} attendance={attendance} />
            </div>
        </div>
    );
};

export default AttendanceTable;