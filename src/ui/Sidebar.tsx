import type React from "react";
import type { NavItemType, SidebarProps } from "../types/sidebar";
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
                                if (item.onClick) {
                                    console.log("Executing item.onClick for:", item.label);
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    if (item.onClick.length === 0 || !(item.onClick as any).length) {
                                        // Treat as no-argument function
                                        (item.onClick as () => void)();
                                    } else {
                                        // Treat as function with item argument
                                        (item.onClick as (item: NavItemType) => void)(item);
                                    }
                                    closeSidebar(); // Close sidebar after click
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