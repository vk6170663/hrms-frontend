import { useState } from "react";
import Input from "../input";
import GenericDropdown from "../GenericDropdown";

interface EmployeesHeaderProps {
    onFilterChange: (filters: { position?: string; search: string; }) => void;
}

const EmployeeFilter = ({ onFilterChange }: EmployeesHeaderProps) => {
    const [filterPosition, setFilterPosition] = useState("Position");
    const [searchQuery, setSearchQuery] = useState("");

    const handlePositionChange = (value: string) => {
        setFilterPosition(value);
        onFilterChange({ position: value === "Position" ? undefined : value, search: searchQuery });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        onFilterChange({ position: filterPosition, search: value });
    };

    const positionOptions = [
        { label: "Position", value: "Position" },
        { label: "Intern", value: "Intern" },
        { label: "Full Time", value: "Full Time" },
        { label: "Junior", value: "Junior" },
        { label: "Senior", value: "Senior" },
        { label: "Team Lead", value: "Team Lead" },
    ];

    return (
        <div className="candidate-header">
            <div className="candidate-header--search">
                <GenericDropdown
                    value={filterPosition}
                    onChange={handlePositionChange}
                    options={positionOptions}
                    isFilter
                    placeholder="Select Status"
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
            </div>
        </div>
    );
};

export default EmployeeFilter;