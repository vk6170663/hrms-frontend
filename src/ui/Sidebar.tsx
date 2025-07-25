import type React from "react";
import type { SidebarProps } from "../types/sidebar";
import SidebarSearch from "./SidebarSearch";
import { useSidebar } from "../context/sidebar-context";
import { NavSection } from "./NavSection";
import Logo from "./logo";
import { Link } from "react-router-dom";

export const Sidebar: React.FC<SidebarProps> = ({ sections, onSearch, className = "" }) => {
    const { isOpen, closeSidebar } = useSidebar();

    return (
        <>
            <div className={`sidebar ${isOpen ? "open" : ""} ${className}`}>
                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        <Link className="logo-link" to="/">
                            <Logo />
                        </Link>
                    </div>
                    <SidebarSearch onSearch={onSearch} />
                </div>
                <div className="sidebar-content">
                    {sections.map((section) => (
                        <NavSection
                            key={section.id}
                            section={section}
                            onItemClick={(item) => {
                                if (item.id === "logout") {
                                    if (item.onClick) {
                                        item.onClick();
                                    }
                                } else if (item.href) {
                                    closeSidebar();
                                }
                            }}
                        />
                    ))}
                </div>
            </div>
            <div className={`sidebar-overlay ${isOpen ? "show" : ""}`} onClick={closeSidebar} />
        </>
    );
};