import type { FC } from "react";
import type { Leave } from "../../types/Leave";
import { formatDate } from "../../utils/dateUtils";
import GenericDropdown from "../GenericDropdown";
import Button from "../button";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateLeaveStatus, downloadLeaveDocument } from '../../services/apiLeave';
import { toast } from 'react-hot-toast';

type LeaveType = {
    item: Leave;
};

const LeavesRow: FC<LeaveType> = ({ item }) => {
    const { _id, date, employee, status, reason } = item;
    const { name, department } = employee;

    const formattedDate = date ? formatDate(date) : '';
    const statusOptions = [
        { label: "Pending", value: "Pending" },
        { label: "Approved", value: "Approved" },
        { label: "Rejected", value: "Rejected" },
    ];

    const queryClient = useQueryClient();

    // Mutation for updating leave status
    const updateStatusMutation = useMutation({
        mutationFn: (newStatus: 'Pending' | 'Approved' | 'Rejected') => updateLeaveStatus(_id, newStatus),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['leaves'] });
            toast.success('Leave status updated successfully');
        },
        onError: (error: Error) => {
            toast.error(`Error updating status: ${error.message}`);
        },
    });

    // Handle status change from GenericDropdown
    const handleStatusChange = (value: string) => {
        const newStatus = value as 'Pending' | 'Approved' | 'Rejected';
        if (newStatus !== status) {
            updateStatusMutation.mutate(newStatus);
        }
    };

    // Handle document download
    const handleDownload = () => {
        const fileName = `leave-${_id}.pdf`; // Customize filename as needed
        downloadLeaveDocument(_id, fileName).catch((error) => {
            toast.error(`Error downloading document: ${error.message}`);
        });
    };

    return (
        <div className="leaves-row">
            <div><img src='/default.jpg' alt='Avatar' width="40px" height="40px" className='employee-img' /></div>
            <div>
                <div>{name}</div>
                <div>{department}</div>
            </div>
            <div>{formattedDate}</div>
            <div>{reason}</div>
            <div>
                <GenericDropdown
                    options={statusOptions}
                    value={status}
                    onChange={handleStatusChange}
                />
            </div>
            <div>
                <Button onClick={handleDownload}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
                        <path d="M7.83366 1.5H3.16699C2.06242 1.5 1.16699 2.39543 1.16699 3.5V14.5C1.16699 15.6046 2.06242 16.5 3.16699 16.5H10.8337C11.9382 16.5 12.8337 15.6046 12.8337 14.5V6.5M7.83366 1.5L12.8337 6.5M7.83366 1.5V5.5C7.83366 6.05228 8.28137 6.5 8.83366 6.5H12.8337" stroke="#4D007D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Button>
            </div>
        </div>
    );
};

export default LeavesRow;