import type { FC } from "react";
import type { Candidate } from "../../types/Candidate";
import Button from "../button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/api";
import { toast } from "react-hot-toast";

type CandidateActionType = {
    item: Candidate;
    onSuccess: () => void;
};

const CandidateActions: FC<CandidateActionType> = ({ item, onSuccess }) => {
    const { _id, resume } = item;
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: async () => {
            await api.delete(`/candidates/${_id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["candidates"] });
            toast.success("Candidate deleted successfully");
            onSuccess();
        },
        onError: (error: Error) => {
            toast.error(`Failed to delete candidate: ${error.message}`);
        },
    });

    const handleDeleteCandidate = () => {
        if (window.confirm("Are you sure you want to delete this candidate?")) {
            deleteMutation.mutate();
        }
    };

    const handleDownloadResume = async () => {
        try {
            const response = await api.get(`/candidates/${_id}/resume`, {
                responseType: "blob",
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;

            let filename = "resume.pdf";
            if (typeof resume === "string") {
                filename = resume.split("\\").pop() || filename;
            } else if (resume instanceof File) {
                filename = resume.name;
            }

            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            toast.success("Resume downloaded successfully");
            onSuccess();
        } catch (error) {
            toast.error("Failed to download resume");
            console.error("Download error:", error);
        }
    };

    return (
        <div className="candidate-act--container">
            <Button buttonType="candidate-action" onClick={handleDownloadResume}>
                Download Resume
            </Button>
            <Button buttonType="candidate-action" onClick={handleDeleteCandidate}>
                Delete Candidate
            </Button>
        </div>
    );
};

export default CandidateActions;