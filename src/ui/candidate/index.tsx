import "../../styles/candidates.css";
import CandidatesTableHeader from "./candidates-table-header";
import CandidatesTableBody from "./candidates-table-body";
import CandidatesHeader from "./candidates-header";
import AddCandidateForm from "./add-candidate-form";
import { useQuery } from "@tanstack/react-query";
import { getCandidates } from "../../services/apiCandidates";
import { useState } from "react";

const CandidatesTable = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [filters, setFilters] = useState({ status: "Position", department: "Department", search: "" });

    const { isLoading, data: candidates = [], refetch } = useQuery({
        queryKey: ["candidates", filters],
        queryFn: () => getCandidates(filters),
        refetchOnWindowFocus: true,
    });

    const handleAddCandidateClick = () => {
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
    };

    const handleFilterChange = (newFilters: { status?: string; department?: string; search: string; }) => {
        setFilters({
            status: newFilters.status || "Position",
            department: newFilters.department || "Department",
            search: newFilters.search,
        });
        refetch();
    };

    return (
        <>
            <div>
                <CandidatesHeader onAddCandidateClick={handleAddCandidateClick} onFilterChange={handleFilterChange} />
                <div className="candidate-table--wrapper">
                    <CandidatesTableHeader />
                    <CandidatesTableBody isLoading={isLoading} candidates={candidates} />
                </div>
            </div>
            <AddCandidateForm isOpen={isFormOpen} onClose={handleCloseForm} />
        </>
    );
};

export default CandidatesTable;