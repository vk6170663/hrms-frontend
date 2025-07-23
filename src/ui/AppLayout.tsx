import '../styles/sidebar.css';
import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider, useSidebar } from "../context/sidebar-context";
import { Sidebar } from "./Sidebar";
import { SidebarToggle } from "./SidebarToggle";
import { useAuthStore } from "../store/auth";
import { useEffect, useState } from "react";
import Header from './header';
import Logout from './Logout';

const AppLayoutContent = () => {
    const [logoutShow, setLogoutShow] = useState(false);

    const { initialize, logout, isAuthenticated } = useAuthStore();
    const location = useLocation();
    const { isOpen, closeSidebar } = useSidebar();

    useEffect(() => {
        initialize();
    }, [initialize]);

    useEffect(() => {
        if (isAuthenticated) {
            const timeoutId = setTimeout(() => {
                logout().then(() => {
                    if (location.pathname !== "/login" && location.pathname !== "/signup") {
                        window.location.href = "/login";
                    }
                });
            }, 2 * 60 * 60 * 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [isAuthenticated, logout, location.pathname]);

    const handleLogout = async () => {
        return logout().then(() => {
            if (location.pathname !== "/login" && location.pathname !== "/signup") {
                window.location.href = "/login";
            }
        });
    };

    const handleLogoutClick = () => {
        console.log("Logout button clicked");
        setLogoutShow(true);
    };

    const navigationSections = [
        {
            id: "recruitment",
            title: "Recruitment",
            items: [
                {
                    id: "candidates",
                    label: "Candidates",
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none">
                            <path d="M1 8H6M3.5 10.5V5.5M12.5 11C16.2966 11 18.2305 12.3374 18.8093 15.0121C19.0429 16.0917 18.1046 17 17 17H8C6.89543 17 5.95709 16.0917 6.19071 15.0121C6.76953 12.3374 8.70338 11 12.5 11ZM12.5 7C14.1667 7 15 6.14286 15 4C15 1.85714 14.1667 1 12.5 1C10.8333 1 10 1.85714 10 4C10 6.14286 10.8333 7 12.5 7Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ),
                    href: "candidates",
                    active: location.pathname === "/candidates",
                },
            ],
        },
        {
            id: "organization",
            title: "Organization",
            items: [
                {
                    id: "employees",
                    label: "Employees",
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none">
                            <path d="M18.5051 19H20C21.1046 19 22.0669 18.076 21.716 17.0286C21.1812 15.4325 19.8656 14.4672 17.5527 14.1329M14.5001 10.8645C14.7911 10.9565 15.1244 11 15.5 11C17.1667 11 18 10.1429 18 8C18 5.85714 17.1667 5 15.5 5C15.1244 5 14.7911 5.04354 14.5001 5.13552M9.5 14C13.1135 14 15.0395 15.0095 15.716 17.0286C16.0669 18.076 15.1046 19 14 19H5C3.89543 19 2.93311 18.076 3.28401 17.0286C3.96047 15.0095 5.88655 14 9.5 14ZM9.5 11C11.1667 11 12 10.1429 12 8C12 5.85714 11.1667 5 9.5 5C7.83333 5 7 5.85714 7 8C7 10.1429 7.83333 11 9.5 11Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ),
                    href: "employees",
                    active: location.pathname === "/employees",
                },
                {
                    id: "attendance",
                    label: "Attendance",
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none">
                            <path d="M10 11C10 10.4477 10.4477 10 11 10H13C13.5523 10 14 10.4477 14 11V19C14 19.5523 13.5523 20 13 20H11C10.4477 20 10 19.5523 10 19V11Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 15C4 14.4477 4.44772 14 5 14H7C7.55228 14 8 14.4477 8 15V19C8 19.5523 7.55228 20 7 20H5C4.44772 20 4 19.5523 4 19V15Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16 7C16 6.44772 16.4477 6 17 6H19C19.5523 6 20 6.44772 20 7V19C20 19.5523 19.5523 20 19 20H17C16.4477 20 16 19.5523 16 19V7Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ),
                    href: "attendance",
                    active: location.pathname === "/attendance",
                },
                {
                    id: "leaves",
                    label: "Leaves",
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none">
                            <path d="M10 4C10 7.31371 7.31371 10 4 10C7.31371 10 10 12.6863 10 16C10 12.6863 12.6863 10 16 10C12.6863 10 10 7.31371 10 4Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M17.5 15C17.5 16.3807 16.3807 17.5 15 17.5C16.3807 17.5 17.5 18.6193 17.5 20C17.5 18.6193 18.6193 17.5 20 17.5C18.6193 17.5 17.5 16.3807 17.5 15Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ),
                    href: "leaves",
                    active: location.pathname === "/leaves",
                },
            ],
        },
        {
            id: "others",
            title: "Others",
            items: [
                {
                    id: "logout",
                    label: "Logout",
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none">
                            <path d="M14 20H6C4.89543 20 4 19.1046 4 18L4 6C4 4.89543 4.89543 4 6 4H14M10 12H21M21 12L18 15M21 12L18 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ),
                    onClick: handleLogoutClick,
                },
            ],
        },
    ];

    return (
        <>
            <Sidebar
                sections={navigationSections}
            />
            <SidebarToggle />
            <Header />
            <main className={`main-content ${isOpen ? "sidebar-open" : "sidebar-closed"}`} onClick={closeSidebar}>
                <Outlet />
            </main>
            <Logout logoutShow={logoutShow} setLogoutShow={setLogoutShow} handleLogout={handleLogout} />
        </>
    );
};

const AppLayout = () => {
    return (
        <SidebarProvider>
            <AppLayoutContent />
        </SidebarProvider>
    );
};

export default AppLayout;