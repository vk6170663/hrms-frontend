import type { FC } from "react";
import type { Candidate } from "../../types/Candidate";
import Spinner from "../Spinner";
import CandidatesRow from "./candidates-row";

type CandidateType = {
    isLoading: boolean;
    candidates: Candidate[];
};

const CandidatesTableBody: FC<CandidateType> = ({ isLoading, candidates }) => {
    if (isLoading) return <Spinner />;

    return (
        <div className="candidate-table--body">
            {
                !candidates || candidates.length === 0 ? <div className="no-candidate">No Candidates Found!</div>
                    : candidates.map((item, i) => <CandidatesRow key={item._id} index={i} item={item} />)}
        </div>
    );
};

export default CandidatesTableBody;