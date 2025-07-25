import { useState, useCallback, useEffect, useRef } from "react";

interface Option {
    label: string;
    value: string;
}

interface GenericDropdownProps {
    value?: string | undefined;
    onChange: (value: string) => void;
    options: Option[];
    isFilter?: boolean;
    placeholder?: string;
    useColors?: boolean;
}

const GenericDropdown = ({ value, onChange, options, isFilter = false, placeholder, useColors = false }: GenericDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSelect = useCallback(
        (optionValue: string) => {
            setSelectedValue(optionValue);
            onChange(optionValue);
            if (!isFilter) {
                setIsOpen(false);
            }
        },
        [onChange, isFilter]
    );

    const getStatusClass = (status: string | undefined) => {
        if (!useColors) return "dropdown-btn";
        const colorClasses: { [key: string]: string; } = {
            new: "new",
            scheduled: "scheduled",
            ongoing: "ongoing",
            selected: "selected",
            rejected: "rejected",
            present: "present",
            absent: "absent",
            pending: "pending",
            approved: "approved",
        };
        return status === undefined ? "" : `dropdown-btn ${colorClasses[status.toLowerCase()] || ""}${isOpen ? " active" : ""}`;
    };

    useEffect(() => {
        if (value !== undefined && value !== selectedValue) {
            setSelectedValue(value);
        }
    }, [value, selectedValue]);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === "Escape" && isOpen) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscKey);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscKey);
        };
    }, [isOpen]);

    return (
        <div className="custom-dropdown" ref={dropdownRef}>
            <button
                className={getStatusClass(selectedValue)}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {selectedValue || placeholder || "Status"}
                <span className="arrow">
                    {isOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="7"
                            viewBox="0 0 12 7"
                            fill="none"
                        >
                            <path
                                d="M1 5.5L5.29289 1.20711C5.68342 0.816583 6.31658 0.816583 6.70711 1.20711L11 5.5"
                                stroke="#121212"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="7"
                            viewBox="0 0 12 7"
                            fill="none"
                        >
                            <path
                                d="M1 1.5L5.29289 5.79289C5.68342 6.18342 6.31658 6.18342 6.70711 5.79289L11 1.5"
                                stroke="#121212"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    )}
                </span>
            </button>

            {isOpen && (
                <ul className="dropdown-list">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className="dropdown-option"
                            onClick={() => handleSelect(option.value)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default GenericDropdown;