import Button from "../button";
import { useState } from "react";
import Input from "../input";
import GenericDropdown from "../GenericDropdown";

interface CandidatesHeaderProps {
    onAddCandidateClick: () => void;
    onFilterChange: (filters: { status?: string; department?: string; search: string; }) => void;
}

const CandidatesHeader = ({ onAddCandidateClick, onFilterChange }: CandidatesHeaderProps) => {
    const [filterStatus, setFilterStatus] = useState("Position");
    const [filterDepartment, setFilterDepartment] = useState("Department");
    const [searchQuery, setSearchQuery] = useState("");

    const handleStatusChange = (value: string) => {
        setFilterStatus(value);
        onFilterChange({ status: value === "Position" ? undefined : value, department: filterDepartment === "Department" ? undefined : filterDepartment, search: searchQuery });
    };

    const handleDepartmentChange = (value: string) => {
        setFilterDepartment(value);
        onFilterChange({ status: filterStatus === "Position" ? undefined : filterStatus, department: value === "Department" ? undefined : value, search: searchQuery });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        onFilterChange({ status: filterStatus === "Position" ? undefined : filterStatus, department: filterDepartment === "Department" ? undefined : filterDepartment, search: value });
    };

    const statusOptions = [
        { label: "Position", value: "Position" },
        { label: "New", value: "New" },
        { label: "Scheduled", value: "Scheduled" },
        { label: "Ongoing", value: "Ongoing" },
        { label: "Selected", value: "Selected" },
        { label: "Rejected", value: "Rejected" },
    ];

    const departmentOptions = [
        { label: "Department", value: "Department" },
        { label: "Frontend", value: "Frontend" },
        { label: "Backend", value: "Backend" },
        { label: "DevOps", value: "DevOps" },
        { label: "QA", value: "QA" },
    ];

    return (
        <div className="candidate-header">
            <div className="candidate-header--search">
                <GenericDropdown
                    value={filterStatus}
                    onChange={handleStatusChange}
                    options={statusOptions}
                    isFilter
                    placeholder="Select Status"
                    useColors={false}
                />
                <GenericDropdown
                    value={filterDepartment}
                    onChange={handleDepartmentChange}
                    options={departmentOptions}
                    isFilter
                    placeholder="Select Department"
                    useColors={false}
                />
            </div>
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

                <Button buttonType="add-candidate" onClick={onAddCandidateClick}>
                    Add Candidate
                </Button>
            </div>
        </div>
    );
};

export default CandidatesHeader;