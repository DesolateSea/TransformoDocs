import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
interface NavDropdownProps {
    title: string;
    content: React.ReactNode;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

const NavDropdown: React.FC<NavDropdownProps> = ({
    title,
    content,
    onMouseEnter,
    onMouseLeave,
}) => {
    const mode = useSelector((state: RootState) => state.mode.mode);
    const bgColor = mode?"#1f2937":"#fff";
    return (
        <div
            className="absolute z-50 left-0 top-full w-full   p-4 "
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{backgroundColor: bgColor}}
        >
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            {content}
        </div>
    );
};

export default NavDropdown;
