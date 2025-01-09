import React, { useState } from "react";
import { useSelector } from "react-redux";
import NavDropdown from "./NavDropdown";
import { useHover } from "../../Hooks/useHover";
import "../../../style/navbar.css";
import ProductNavInfo from "./ProductNavInfo";

const NavBar = () => {
    const mode = useSelector((state: any) => state.mode.mode);
    const { hoveredItem, handleMouseEnter, handleMouseLeave } = useHover();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // For toggling the hamburger menu

    const renderDropdownContent = (title: string) => {
        switch (title) {
            case "Products":
                return <ProductNavInfo />;
            case "Resources":
                return (
                    //later implementation of resources page
                    <ul className={`nav-dropdown ${mode ? "dark" : ""}`}>
                        <li>Guides & Tutorials</li>
                        <li>API Documentation</li>
                        <li>Developer Resources</li>
                    </ul>
                );
            case "About Us":
                return (
                    //later implementation for about us
                    <p className={`nav-dropdown ${mode ? "dark" : ""}`}>
                        Learn more about TransformoDocs, our mission, and the
                        amazing team behind the project.
                    </p>
                );
            default:
                return null;
        }
    };

    const links = ["Pricing", "Products", "Developer", "Resources", "About Us"];
    const dropdownLinks = ["Products", "Resources", "About Us"];

    return (
        <nav
            className={`m-auto w-full ${
                mode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
        >
            <div
                className={`navbar container flex flex-row justify-between items-center px-6 py-4 absolute top-0 ${
                    mode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                }`}
            >
                {/* Logo Section */}
                <div className="navbar-logo flex flex-row items-center gap-1">
                    <img src="Logo.png" alt="logo" className="w-10 h-10" />
                    <span className="text-xl font-bold">ransformoDocs</span>
                </div>

                {/* Hamburger Icon for Small Screens */}
                <button
                    className="block md:hidden text-xl focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 5.25h16.5M3.75 12h16.5M3.75 18.75h16.5"
                        />
                    </svg>
                </button>

                {/* Links Section (Visible on Larger Screens) */}
                <div className="hidden md:flex navbar-links flex-row items-center gap-6 relative">
                    {links.map((link) => (
                        <div
                            key={link}
                            className="relative h-full"
                            onMouseEnter={() => handleMouseEnter(link)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <a
                                href="#"
                                className={`navbar-link relative ${
                                    mode === "dark"
                                        ? "hover:text-gray-400"
                                        : "hover:text-gray-600"
                                }`}
                            >
                                {link}
                            </a>
                        </div>
                    ))}
                </div>

                {/* Mobile Dropdown Menu */}
                {isMenuOpen && (
                    <div
                        className={`absolute top-16 left-0 w-full ${
                            mode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                        } p-4 md:hidden`}
                    >
                        {links.map((link) => (
                            <div key={link} className="py-2" onMouseEnter={() => handleMouseEnter(link)}
                            onMouseLeave={handleMouseLeave}>
                                <a
                                    href="#"
                                    className={`block ${
                                        mode ? "hover:text-gray-400" : "hover:text-gray-600"
                                    }`}
                                >
                                    {link}
                                </a>
                            </div>
                        ))}
                    </div>
                )}

                {/* Dropdown */}
                {dropdownLinks.includes(hoveredItem) && (
                    <NavDropdown
                        title={hoveredItem}
                        content={renderDropdownContent(hoveredItem)}
                        onMouseEnter={() => handleMouseEnter(hoveredItem)}
                        onMouseLeave={handleMouseLeave}
                    />
                )}
            </div>
        </nav>
    );
};

export default NavBar;
