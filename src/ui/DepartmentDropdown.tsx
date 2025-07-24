// import type { FC } from "react";
// import { useState, useCallback } from "react";

// interface DepartmentDropdownProps {
//     value?: string;
//     onChange: (value: string) => void;
//     isFilter?: boolean;
// }

// const DepartmentDropdown: FC<DepartmentDropdownProps> = ({ value, onChange, isFilter = false }) => {
//     const [selectedDepartment, setSelectedDepartment] = useState(value || "All");

//     const handleChange = useCallback(
//         (e: React.ChangeEvent<HTMLSelectElement>) => {
//             const newDepartment = e.target.value;
//             setSelectedDepartment(newDepartment);
//             onChange(newDepartment);
//         },
//         [onChange]
//     );

//     const options = [
//         { label: "All", value: "All" },
//         { label: "Frontend", value: "Frontend" },
//         { label: "Backend", value: "Backend" },
//         { label: "DevOps", value: "DevOps" },
//         { label: "QA", value: "QA" },
//         // Add more departments as needed
//     ];

//     return (
//         <select value={selectedDepartment} onChange={handleChange} className="department-dropdown">
//             {options.map((option) => (
//                 <option key={option.value} value={option.value}>
//                     {option.label}
//                 </option>
//             ))}
//         </select>
//     );
// };

// export default DepartmentDropdown;