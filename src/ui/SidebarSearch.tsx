import { useState } from "react";
import Input from "./input";

interface SidebarSearchProps {
    onSearch?: (query: string) => void;
    placeholder?: string;
}

const SidebarSearch: React.FC<SidebarSearchProps> = ({ onSearch, placeholder = "Search" }) => {
    const [query, setQuery] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        onSearch?.(value);
    };

    return (
        <div className="sidebar-search">
            <div className="search-container">
                <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <Input
                    type="text"
                    containerClass="search-input"
                    placeholder={placeholder}
                    value={query}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};

export default SidebarSearch;