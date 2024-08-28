import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define a type for the window size state
export type WindowSize = {
    width: number;
    height: number;
};

// Create a context with default values
const WindowSizeContext = createContext<WindowSize | undefined>(undefined);

// Create a custom hook to use the WindowSizeContext
export const useWindowSize = (): WindowSize => {
    const context = useContext(WindowSizeContext);
    if (!context) {
        throw new Error('useWindowSize must be used within a WindowSizeProvider');
    }
    return context;
};

// Create a provider component
export const WindowSizeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        // Handler to call on window resize
        const handleResize = () => {
            // Debounce the resize event
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }, 150); // Adjust the delay as needed
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Remove event listener on cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <WindowSizeContext.Provider value={windowSize}>
            {children}
        </WindowSizeContext.Provider>
    );
};
