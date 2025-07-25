import type { FC } from "react";
import type { Candidate } from "../../types/Candidate";
import Button from "../button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteCandidate, downloadResume } from "../../services/apiCandidates";

type CandidateActionType = {
    item: Candidate;
    onSuccess: () => void;
};

const CandidateActions: FC<CandidateActionType> = ({ item, onSuccess }) => {
    const { _id, resume } = item;
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: () => deleteCandidate(_id),
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
        let filename = 'resume.pdf';
        if (typeof resume === 'string') {
            filename = resume.split('\\').pop() || filename;
        } else if (resume instanceof File) {
            filename = resume.name;
        }
        await downloadResume(_id, filename); // Use service
        onSuccess();
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