import type { FC } from "react";
import type { Employee } from "../../types/Employee";
import Spinner from "../Spinner";
import EmployeeRow from "./EmployeeRow";

type EmployeeType = {
    isLoading: boolean;
    employees: Employee[];
    onEditClick: (employee: Employee) => void;
};

const EmployeesTableBody: FC<EmployeeType> = ({ isLoading, employees, onEditClick }) => {
    if (isLoading) return <Spinner />;

    return (
        <div className="candidate-table--body">
            {
                !employees || employees.length === 0 ? <div className="no-candidate">No Employees Found!</div>
                    : employees.map((item) => <EmployeeRow key={item._id} item={item} onEditClick={onEditClick} />)}
        </div>
    );
};

export default EmployeesTableBody;