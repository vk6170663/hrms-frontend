import type { FC } from "react";
import type { Candidate } from "../../types/Candidate";
import Button from "../button";
import CandidateActions from "./candidates-actions";
import { useState, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/api";
import { toast } from "react-hot-toast";
import GenericDropdown from "../GenericDropdown";

type CandidateType = {
    item: Candidate;
    index: number;
};

const CandidatesRow: FC<CandidateType> = ({ item, index }) => {
    const { fullName, email, phoneNumber, department, experience, status, _id } = item;
    const [isActionsVisible, setIsActionsVisible] = useState(false);
    const queryClient = useQueryClient();

    const handleToggleActions = () => {
        setIsActionsVisible((prev) => !prev);
    };

    const handleActionSuccess = () => {
        setIsActionsVisible(false);
    };

    const updateStatusMutation = useMutation({
        mutationFn: async (newStatus: string) => {
            const response = await api.patch(`/candidates/${_id}/status`, { status: newStatus });
            return response.data;
        },
        onSuccess: (data) => {
            console.log("Status update response:", data); // Debug log
            toast.success(data.message || "Candidate status updated successfully");
            queryClient.invalidateQueries({ queryKey: ["candidates"] }); // Invalidate cache to refresh list
        },
        onError: (error: Error) => {
            toast.error(`Failed to update status: ${error.message}`);
        },
    });

    const handleStatusChange = useCallback(
        (newStatus: string) => {
            if (newStatus !== status) {
                updateStatusMutation.mutate(newStatus);
            }
        },
        [status, updateStatusMutation]
    );

    const statusOptions = [
        { label: "New", value: "New" },
        { label: "Scheduled", value: "Scheduled" },
        { label: "Ongoing", value: "Ongoing" },
        { label: "Selected", value: "Selected" },
        { label: "Rejected", value: "Rejected" },
    ];

    return (
        <>
            <div className="candidate-row">
                <div>{index <= 9 ? `0${index + 1}` : index}</div>
                <div>{fullName}</div>
                <div>{email}</div>
                <div>{phoneNumber}</div>
                <div>{department}</div>
                <div>
                    <GenericDropdown
                        value={status}
                        onChange={handleStatusChange}
                        options={statusOptions}
                        useColors={true}
                    />
                </div>
                <div>{experience}</div>
                <div className="candidate-action--btn">
                    <Button buttonType="default-md" onClick={handleToggleActions}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="4"
                            height="16"
                            viewBox="0 0 4 16"
                            fill="none"
                        >
                            <path
                                d="M2 3C2.55 3 3 2.55 3 2C3 1.45 2.55 1 2 1C1.45 1 1 1.45 1 2C1 2.55 1.45 3 2 3Z"
                                stroke="#121212"
                                strokeWidth="2"
                            />
                            <path
                                d="M2 9C2.55 9 3 8.55 3 8C3 7.45 2.55 7 2 7C1.45 7 1 7.45 1 8C1 8.55 1.45 9 2 9Z"
                                stroke="#121212"
                                strokeWidth="2"
                            />
                            <path
                                d="M2 15C2.55 15 3 14.55 3 14C3 13.45 2.55 13 2 13C1.45 13 1 13.45 1 14C1 14.55 1.45 15 2 15Z"
                                stroke="#121212"
                                strokeWidth="2"
                            />
                        </svg>
                    </Button>
                    {isActionsVisible && (
                        <CandidateActions item={item} onSuccess={handleActionSuccess} />
                    )}
                </div>
            </div>
        </>
    );
};

export default CandidatesRow;