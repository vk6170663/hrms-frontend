import { useState } from 'react';
import GenericDropdown from '../GenericDropdown';
import Input from '../input';

interface Props {
    onFilterChange: (filters: { status?: string; search: string; }) => void;
}

const AttendanceTableHeader: React.FC<Props> = ({ onFilterChange }) => {
    const [status, setStatus] = useState('Status');
    const [search, setSearch] = useState('');

    const handleStatusChange = (value: string) => {
        setStatus(value);
        onFilterChange({ status: value === 'Status' ? '' : value, search });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setSearch(val);
        onFilterChange({ status: status === 'Status' ? '' : status, search: val });
    };

    return (
        <div className="candidate-header flex items-center space-x-4">
            <GenericDropdown
                value={status}
                onChange={handleStatusChange}
                options={[
                    { label: 'Status', value: 'Status' },
                    { label: 'Present', value: 'Present' },
                    { label: 'Absent', value: 'Absent' },
                ]}
                isFilter
                useColors={true}
            />
            <div className="sidebar-search">
                <div className="search-container flex items-center">
                    <svg className="search-icon w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <Input
                        type="text"
                        placeholder="Search by name..."
                        value={search}
                        onChange={handleSearchChange}
                        containerClass="search-input"
                    />
                </div>
            </div>
        </div>
    );
};

export default AttendanceTableHeader;