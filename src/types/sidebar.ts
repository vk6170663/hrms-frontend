import type React from "react";

export interface NavItemType {
    id: string;
    label: string;
    icon?: React.ReactNode;
    href?: string;
    onClick?: (item: NavItemType) => void;
    active?: boolean;
}

export interface NavSection {
    id: string;
    title: string;
    items: NavItemType[];
}

export interface SidebarProps {
    sections: NavSection[];
    onSearch?: (query: string) => void;
    onItemClick?: (item: NavItemType) => void;
    className?: string;
}

export interface SidebarContextType {
    isOpen: boolean;
    toggleSidebar: () => void;
    closeSidebar: () => void;
}