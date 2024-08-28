import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Define the type for the context state
interface DeviceContextProps {
    isMobile: boolean;
}

// Create the context with default values
const DeviceContext = createContext<DeviceContextProps | undefined>(undefined);

// Create a custom hook to use the DeviceContext
export const useDeviceContext = (): DeviceContextProps => {
    const context = useContext(DeviceContext);
    if (context === undefined) {
        throw new Error("useDeviceContext must be used within a DeviceProvider");
    }
    return context;
};

// Create a provider component
export const DeviceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const checkIsMobile = () => {
            const isMobileDevice =
                "ontouchstart" in window ||
                (window.matchMedia && window.matchMedia("(max-width: 768px)").matches);
            setIsMobile(isMobileDevice);
        };

        checkIsMobile();

        const handleResize = () => {
            checkIsMobile();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <DeviceContext.Provider value={{ isMobile }}>
            {children}
        </DeviceContext.Provider>
    );
};
