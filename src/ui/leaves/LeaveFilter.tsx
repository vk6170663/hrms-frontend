import Input from "../input";
import GenericDropdown from "../GenericDropdown";
import AddLeaveForm from "./AddLeaveForm";
import { useState, useEffect } from "react";
import Button from "../button";
import type { Employee } from "../../types/Employee";
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { getEmployees } from "../../services/apiEmployees";

interface LeaveFilterProps {
    onFilterChange: (filters: { status?: string; search?: string; date?: string; }) => void;
}

const LeaveFilter = ({ onFilterChange }: LeaveFilterProps) => {
    const [filterStatus, setFilterStatus] = useState("Status");
    const [searchQuery, setSearchQuery] = useState("");
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);
    const [employees, setEmployees] = useState<Employee[]>([]);

    const fetchEmployeesMutation = useMutation({
        mutationFn: getEmployees,
        retry: 2,
        retryDelay: 1000,
        onSuccess: (data) => {
            console.log('Fetched employees data:', data);
            setEmployees(data);
            // toast.success('Employees fetched successfully');
        },
        onError: (error: Error) => {
            toast.error(`Error fetching employees: ${error.message}`);
        },
    });

    useEffect(() => {
        fetchEmployeesMutation.mutate({});
    }, []);

    const handleStatusChange = (value: string) => {
        setFilterStatus(value);
        onFilterChange({ status: value === "Status" ? undefined : value, search: searchQuery });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        onFilterChange({ status: filterStatus, search: value });
    };

    const statusOptions = [
        { label: "Status", value: "Status" },
        { label: "Pending", value: "Pending" },
        { label: "Approved", value: "Approved" },
        { label: "Rejected", value: "Rejected" },
    ];

    const handleAddSuccess = () => {
        onFilterChange({ status: filterStatus, search: searchQuery });
    };

    return (
        <div className="leave-filter-container">
            <div className="candidate-header--search">
                <GenericDropdown
                    value={filterStatus}
                    onChange={handleStatusChange}
                    options={statusOptions}
                    isFilter
                    placeholder="Select Status"
                    useColors={false}
                />
            </div>
            <div className="leave-search-container">
                <div className="candidate-header--search">
                    <div className="sidebar-search">
                        <div className="search-container">
                            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <Input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Search by name..."
                                containerClass="search-input"
                            />
                        </div>
                    </div>
                </div>
                <div className="candidate-header--search">
                    <Button
                        onClick={() => setIsAddFormOpen(true)}
                        buttonType="add-candidate"
                    >
                        Add Leave
                    </Button>
                </div>
            </div>
            <AddLeaveForm
                isOpen={isAddFormOpen}
                onClose={() => setIsAddFormOpen(false)}
                employees={employees}
                onAddSuccess={handleAddSuccess}
            />
        </div>
    );
};

export default LeaveFilter;