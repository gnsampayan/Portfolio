import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Define the type for the context state
interface DeviceContextProps {
    isMobile: boolean;
    windowResized: boolean;
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
    const [windowResized, setWindowResized] = useState<boolean>(false);

    useEffect(() => {
        const checkIsMobile = () => {
            const isMobileDevice =
                "ontouchstart" in window ||
                (window.matchMedia && window.matchMedia("(max-width: 768px)").matches);
            setIsMobile(isMobileDevice);
        };

        checkIsMobile();

        // Debounced resize handler
        let resizeTimer: NodeJS.Timeout; // Timeout reference

        const handleResize = () => {
            checkIsMobile();
            setWindowResized(true);

            clearTimeout(resizeTimer); // Clear the previous timeout
            resizeTimer = setTimeout(() => {
                setWindowResized(false);
            }, 1000);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(resizeTimer); // Clear the timeout when the component unmounts
        };
    }, []);

    return (
        <DeviceContext.Provider
            value={{
                isMobile,
                windowResized,
            }}>
            {children}
        </DeviceContext.Provider>
    );
};
