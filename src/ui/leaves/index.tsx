import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getLeaves } from '../../services/apiLeave';
import LeavesTableBody from './LeavesTableBody';
import LeaveFilter from './LeaveFilter';

const LeavesTable: React.FC = () => {
    const [filters, setFilters] = useState({ status: 'Status', search: '', date: '' });

    const { isLoading, data: leaves = [], } = useQuery({
        queryKey: ['leaves', filters.status, filters.search, filters.date],
        queryFn: () => getLeaves(filters),
    });

    const handleFilterChange = (newFilters: { status?: string; search?: string; date?: string; }) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
    };

    return (
        <>
            <LeaveFilter onFilterChange={handleFilterChange} />
            <div className='leaves--outer-container'>
                <div className='leaves-container'>
                    <div className='applied-leaves-header'>
                        <div>Applied Leaves</div>
                        <div className='leaves-header'>
                            <div>Profile</div>
                            <div>Name</div>
                            <div>Date</div>
                            <div>Reason</div>
                            <div>Status</div>
                            <div>Docs</div>
                        </div>
                    </div>
                    <LeavesTableBody isLoading={isLoading} leaves={leaves} />
                </div>
                <div className='leaves-calendar-container'>dsfgsd</div>
            </div>
        </>

    );
};

export default LeavesTable;