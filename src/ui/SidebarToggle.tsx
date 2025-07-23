import type React from "react";
import { useSidebar } from "../context/sidebar-context";

export const SidebarToggle: React.FC = () => {
    const { toggleSidebar } = useSidebar();

    return (
        <button className="sidebar-toggle" onClick={toggleSidebar}>
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>
    );
};