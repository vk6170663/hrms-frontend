import type React from "react";
import type { NavItemType } from "../types/sidebar";
import { Link } from "react-router-dom";
import Button from "./button";

interface NavItemProps extends NavItemType {
    onClick?: (item: NavItemType) => void;
}

const NavItem: React.FC<NavItemProps> = ({ id, label, icon, href, onClick, active, ...props }) => {
    const handleClick = (e: React.MouseEvent) => {
        if (e && onClick) {
            e.preventDefault();
            onClick({ id, label, icon, href, onClick, active });
        }
    };

    const buttonOnClick = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        handleClick(new MouseEvent("click") as any);
    };

    return (
        <li className="nav-item">
            {
                href ?
                    <Link
                        to={href || "#"}
                        className={`nav-link ${active ? "active" : ""}`}
                        onClick={handleClick}
                        {...props}
                    >
                        {icon && <span className="nav-icon">{icon}</span>}
                        <span className="nav-label">{label}</span>
                    </Link> :
                    <Button buttonType="default-md" containerClass={`nav-link ${active ? "active" : ""}`} onClick={buttonOnClick}>
                        {icon && <span className="nav-icon">{icon}</span>}
                        <span className="nav-label">{label}</span>
                    </Button>
            }
        </li>
    );
};

export default NavItem;