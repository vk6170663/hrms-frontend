/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Attendance } from '../../types/Attendance';
import GenericDropdown from '../GenericDropdown';
import { addAttendance, updateAttendance } from '../../services/apiAttendance';
import Button from '../button';

interface Props {
    item: Attendance;
}

const AttendanceRow: FC<Props> = ({ item }) => {
    const { employee, status, tasks, _id } = item;
    const employeeData = employee;
    const profileImg = employeeData.image || '/default.jpg';
    const queryClient = useQueryClient();

    // Mutation for updating existing attendance
    const updateMutation = useMutation({
        mutationFn: (newStatus: string) =>
            updateAttendance(_id, { status: newStatus as 'Present' | 'Absent' }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['attendance'] });
        },
        onError: (error: any) => {
            console.error('Update failed:', error.response?.data?.message || error.message);
        },
    });

    // Mutation for adding new attendance
    const addMutation = useMutation({
        mutationFn: (newStatus: string) =>
            addAttendance({
                employeeId: employeeData._id,
                status: newStatus as 'Present' | 'Absent',
                tasks: tasks || 'Default Task', // Use existing tasks or placeholder
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['attendance'] });
        },
        onError: (error: any) => {
            console.error('Add failed:', error.response?.data?.message || error.message);
        },
    });

    const handleStatusChange = (value: string) => {
        if (_id && value !== status) {
            updateMutation.mutate(value);
        } else if (!_id && value !== '') {
            addMutation.mutate(value);
        }
    };

    return (
        <div className="attendance-row">
            <div>
                <img src={profileImg} alt="Profile" width="40px" height="40px" className='employee-img' />
            </div>
            <div>{employeeData.name}</div>
            <div>{employeeData.position}</div>
            <div>{employeeData.department}</div>
            <div>{tasks || 'No Tasks Assigned'}</div>
            <div>
                <GenericDropdown
                    value={status || 'Select Status'}
                    onChange={handleStatusChange}
                    options={[
                        { label: 'Select Status', value: '' },
                        { label: 'Present', value: 'Present' },
                        { label: 'Absent', value: 'Absent' },
                    ]}
                    isFilter={false}
                    useColors={true}
                />
            </div>
            <div className="candidate-action--btn">
                <Button buttonType="default-md">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="4"
                        height="16"
                        viewBox="0 0 4 16"
                        fill="none"
                    >
                        <path
                            d="M2 3C2.55 3 3 2.55 3 2C3 1.45 2.55 1 2 1C1.45 1 1 1.45 1 2C1 2.55 1.45 3 2 3Z"
                            stroke="#121212"
                            strokeWidth="2"
                        />
                        <path
                            d="M2 9C2.55 9 3 8.55 3 8C3 7.45 2.55 7 2 7C1.45 7 1 7.45 1 8C1 8.55 1.45 9 2 9Z"
                            stroke="#121212"
                            strokeWidth="2"
                        />
                        <path
                            d="M2 15C2.55 15 3 14.55 3 14C3 13.45 2.55 13 2 13C1.45 13 1 13.45 1 14C1 14.55 1.45 15 2 15Z"
                            stroke="#121212"
                            strokeWidth="2"
                        />
                    </svg>
                </Button>

            </div>
        </div>
    );
};

export default AttendanceRow;