import type { FC } from 'react';
import type { Employee } from '../../types/Employee';
import Button from '../button';

type EmployeeActionType = {
    item: Employee;
    onUpdate: (updates: Partial<Employee>) => void;
    onDelete: () => void;
    onSuccess: () => void;
    onEditClick: () => void;
};

const EmployeeActions: FC<EmployeeActionType> = ({ onDelete, onEditClick }) => {
    const handleUpdateClick = () => {
        onEditClick();
    };

    return (
        <div className="employee-act--container">
            <Button buttonType="candidate-action" onClick={handleUpdateClick}>
                Edit
            </Button>
            <Button buttonType="candidate-action" onClick={onDelete}>
                Delete
            </Button>
        </div>
    );
};

export default EmployeeActions;