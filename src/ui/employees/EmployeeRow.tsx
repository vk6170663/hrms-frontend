import type { FC } from 'react';
import type { Employee } from '../../types/Employee';
import Button from '../button';
import { useState, useCallback, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import EmployeeActions from './EmployeeActions';
import { deleteEmployee, updateEmployee } from '../../services/apiEmployees';
import { formatDate } from '../../utils/dateUtils';

type EmployeeType = {
    item: Employee;
    onEditClick: (employee: Employee) => void;
};

const EmployeeRow: FC<EmployeeType> = ({ item, onEditClick }) => {
    const { name, email, phoneNumber, position, department, joiningDate, _id } = item;
    const [isActionsVisible, setIsActionsVisible] = useState(false);
    const queryClient = useQueryClient();

    useEffect(() => {
        setIsActionsVisible(false);
    }, [item]);

    const handleToggleActions = () => {
        setIsActionsVisible((prev) => !prev);
    };

    const handleActionSuccess = () => {
        setIsActionsVisible(false);
    };

    const updateEmployeeMutation = useMutation({
        mutationFn: (updates: Partial<Employee>) => updateEmployee(_id, updates),
        onSuccess: () => {
            toast.success('Employee updated successfully');
            queryClient.invalidateQueries({ queryKey: ['employees'] });
        },
        onError: (error: Error) => {
            toast.error(`Failed to update employee: ${error.message}`);
        },
    });

    const deleteEmployeeMutation = useMutation({
        mutationFn: () => deleteEmployee(_id),
        onSuccess: () => {
            toast.success('Employee deleted successfully');
            queryClient.invalidateQueries({ queryKey: ['employees'] });
            handleActionSuccess();
        },
        onError: (error: Error) => {
            toast.error(`Failed to delete employee: ${error.message}`);
        },
    });

    const handleUpdate = useCallback(
        (updates: Partial<Employee>) => {
            updateEmployeeMutation.mutate(updates);
        },
        [updateEmployeeMutation]
    );

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            deleteEmployeeMutation.mutate();
        }
    };

    const formattedJoiningDate = joiningDate ? formatDate(joiningDate) : '';

    return (
        <>
            <div className="candidate-row">
                <div><img src='/default.jpg' alt='Avatar' width="40px" height="40px" className='employee-img' /></div>
                <div>{name}</div>
                <div>{email}</div>
                <div>{phoneNumber}</div>
                <div>{position}</div>
                <div>{department}</div>
                <div>{formattedJoiningDate}</div>
                <div className="candidate-action--btn">
                    <Button buttonType="default-md" onClick={handleToggleActions}>
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
                    {isActionsVisible && (
                        <EmployeeActions item={item} onUpdate={handleUpdate} onDelete={handleDelete} onSuccess={handleActionSuccess} onEditClick={() => onEditClick(item)} />
                    )}
                </div>
            </div>
        </>
    );
};

export default EmployeeRow;