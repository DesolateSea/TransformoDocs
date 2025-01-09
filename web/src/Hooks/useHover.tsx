import { useState, useCallback, useRef } from "react";

export const useHover = () => {
    const [hoveredItem, setHoveredItem] = useState<string>("");
    const [time, setTime] = useState<number>(100);
    const leaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleMouseEnter = useCallback((item: string) => {
        if (leaveTimeout.current) {
            clearTimeout(leaveTimeout.current); // Clear the timeout if it's set
            leaveTimeout.current = null;
        }
        setHoveredItem(item);
    }, []);

    const handleMouseLeave = useCallback(() => {
        leaveTimeout.current = setTimeout(() => {
            setHoveredItem("");
        }, time);
    }, [time]);

    return { hoveredItem, handleMouseEnter, handleMouseLeave };
};
