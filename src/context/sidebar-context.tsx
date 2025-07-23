import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import type { SidebarContextType } from "../types/sidebar";

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useSidebar = (): SidebarContextType => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
};

interface SidebarProviderProps {
    children: React.ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen((prev) => !prev);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1024) {
                setIsOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <SidebarContext.Provider value={{ isOpen, toggleSidebar, closeSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};