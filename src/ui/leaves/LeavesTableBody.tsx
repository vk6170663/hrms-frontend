import type { FC } from "react";
import type { Leave } from "../../types/Leave";
import Spinner from "../Spinner";
import LeavesRow from "./LeavesRow";

type LeaveType = {
    isLoading: boolean;
    leaves: Leave[];
};

const LeavesTableBody: FC<LeaveType> = ({ isLoading, leaves }) => {
    if (isLoading) return <Spinner />;

    return (
        <div className='applied-leaves-body'>
            {
                !leaves || leaves.length === 0 ? <div className="no-candidate">No Leaves Found!</div>
                    : leaves.map((item) => <LeavesRow key={item._id} item={item} />)}
        </div>
    );
};

export default LeavesTableBody;