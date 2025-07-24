import { useState } from "react";
import "../../styles/candidates.css";
import CandidatesTableHeader from "./candidates-table-header";
import CandidatesTableBody from "./candidates-table-body";
import CandidatesHeader from "./candidates-header";
import AddCandidateForm from "./add-candidate-form";
import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";

const CandidatesTable = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [filters, setFilters] = useState({ status: "All", department: "All", search: "" });

    const { isLoading, data: candidates = [], refetch } = useQuery({
        queryKey: ["candidates", filters],
        queryFn: async () => {
            console.log("Fetching candidates with filters:", filters); // Debug log
            const params = {
                status: filters.status === "All" ? undefined : filters.status,
                department: filters.department === "All" ? undefined : filters.department,
                search: filters.search || undefined,
            };
            const response = await api.get("/candidates", { params });
            return response.data.data;
        },
        refetchOnWindowFocus: true,
    });

    const handleAddCandidateClick = () => {
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
    };

    const handleFilterChange = (newFilters: { status: string; department: string; search: string; }) => {
        setFilters(newFilters);
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