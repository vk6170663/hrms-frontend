import type React from "react";
import type { NavItemType, NavSection as NavSectionType } from "../types/sidebar";
import NavItem from "./NavItem";

interface NavSectionProps {
    section: NavSectionType;
    onItemClick?: (item: NavItemType) => void;
}

export const NavSection: React.FC<NavSectionProps> = ({ section, onItemClick }) => {
    return (
        <div className="nav-section">
            <h3 className="section-title">{section.title}</h3>
            <ul className="nav-list">
                {section.items.map((item) => (
                    <NavItem
                        key={item.id}
                        {...item}
                        onClick={(itemProp) => {
                            if (item.onClick && typeof item.onClick === "function") {
                                item.onClick(item);
                            } else if (onItemClick) {
                                onItemClick(itemProp);
                            }
                        }}
                    />
                ))}
            </ul>
        </div>
    );
};