// import { useState, useCallback } from "react";

// interface StatusDropdownProps {
//     value?: string; // Current status value, defaults to "All" for filtering
//     onChange: (value: string) => void; // Callback for status/filter change
//     isFilter?: boolean; // Flag to indicate filter mode (no update action)
// }

// const StatusDropdown = ({ value = "All", onChange, isFilter = false }: StatusDropdownProps) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [selectedStatus, setSelectedStatus] = useState(value);

//     const options = ["All", "New", "Scheduled", "Ongoing", "Selected", "Rejected"];

//     const handleSelect = useCallback(
//         (option: string) => {
//             setSelectedStatus(option);
//             onChange(option);
//             if (!isFilter) {
//                 setIsOpen(false); // Close dropdown only if not in filter mode
//             }
//         },
//         [onChange, isFilter]
//     );

//     const getStatusClass = (status: string) => {
//         return `dropdown-btn ${status.toLowerCase()}${isOpen ? " active" : ""}`;
//     };

//     return (
//         <div className="custom-dropdown">
//             <button
//                 className={getStatusClass(selectedStatus)}
//                 onClick={() => setIsOpen((prev) => !prev)}
//             >
//                 {selectedStatus}
//                 <span className="arrow">
//                     {isOpen ? (
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width="12"
//                             height="7"
//                             viewBox="0 0 12 7"
//                             fill="none"
//                         >
//                             <path
//                                 d="M1 5.5L5.29289 1.20711C5.68342 0.816583 6.31658 0.816583 6.70711 1.20711L11 5.5"
//                                 stroke="#121212"
//                                 strokeWidth="1.5"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                             />
//                         </svg>
//                     ) : (
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width="12"
//                             height="7"
//                             viewBox="0 0 12 7"
//                             fill="none"
//                         >
//                             <path
//                                 d="M1 1.5L5.29289 5.79289C5.68342 6.18342 6.31658 6.18342 6.70711 5.79289L11 1.5"
//                                 stroke="#121212"
//                                 strokeWidth="1.5"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                             />
//                         </svg>
//                     )}
//                 </span>
//             </button>

//             {isOpen && (
//                 <ul className="dropdown-list">
//                     {options.map((option) => (
//                         <li
//                             key={option}
//                             className="dropdown-option"
//                             onClick={() => handleSelect(option)}
//                         >
//                             {option}
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default StatusDropdown;