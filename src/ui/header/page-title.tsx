import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const pathToTitle: { [key: string]: string; } = {
    "/candidates": "Candidates",
    "/employees": "Employees",
    "/attendance": "Attendance",
    "/leaves": "Leaves",
};

const PageTitle = () => {
    const location = useLocation();

    useEffect(() => {
        const title = pathToTitle[location.pathname] || "HRMS Dashboard";
        document.title = title;
    }, [location.pathname]);

    const title = pathToTitle[location.pathname] || "HRMS Dashboard";

    return (
        <div>
            <span className="header-title">{title}</span>
        </div>
    );
};

export default PageTitle;