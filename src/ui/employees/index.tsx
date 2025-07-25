import { useState } from 'react';
import '../../styles/candidates.css';
import { useQuery } from '@tanstack/react-query';
import { getEmployees } from '../../services/apiEmployees';
import EmployeesTableHeader from '../employees/EmployeesTableHeader';
import EmployeesTableBody from '../employees/EmployeesTableBody';
import EditEmployeeForm from '../employees/EditEmployeeForm';
import type { Employee } from '../../types/Employee';
import EmployeeFilter from './EmployeeFilter';

const EmployeesTable = () => {
    const [filters, setFilters] = useState<{ position?: string; search: string; }>({
        position: "Position",
        search: "",
    });
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

    const { isLoading, data: employees = [], refetch } = useQuery({
        queryKey: ["employees", JSON.stringify(filters)],
        queryFn: () => getEmployees(filters),
        refetchOnWindowFocus: true,
    });

    // const handleFilterChange = (newFilters: { position?: string; search: string; }) => {
    //     setFilters(newFilters);
    //     refetch();
    // };

    const handleEditClick = (employee: Employee) => {
        setSelectedEmployee(employee);
        setIsEditFormOpen(true);
    };

    const handleFormClose = () => {
        setIsEditFormOpen(false);
        setSelectedEmployee(null);
    };

    const handleUpdateSuccess = () => {
        refetch();
    };

    return (
        <>
            <div className="employees-table-container">
                <EmployeeFilter onFilterChange={setFilters} />
                <div className="candidate-table--wrapper">
                    <EmployeesTableHeader />
                    <EmployeesTableBody
                        isLoading={isLoading}
                        employees={employees}
                        onEditClick={handleEditClick}
                    />
                </div>
                {isEditFormOpen && selectedEmployee && (
                    <EditEmployeeForm
                        isOpen={isEditFormOpen}
                        onClose={handleFormClose}
                        employee={selectedEmployee}
                        onUpdateSuccess={handleUpdateSuccess}
                    />
                )}
            </div>
        </>
    );
};

export default EmployeesTable;