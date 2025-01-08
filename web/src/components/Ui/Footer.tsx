import React from "react";
import '../../../style/footer.css';

const FooterComp:React.FC<{ heading: string; items: string[] }> = ({ heading, items }) => {
    return (
        <div className="footer-comp">
            <div className="footer-heading">{heading}</div>
            <div className="footer-sub-heading">
                <ul className="flex flex-col gap-1">
                    {items.map((item, index) => (
                        <li key={index} className="footer-item">{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const Footer = () => {
    const products = [
        "Programmable media",
        "Machine learning",
        "Natural language processing",
        "Computer vision",
        "Speech recognition",
        "Image recognition",
    ];

    const resources = [
        "Documentation",
        "API Reference",
        "Tutorials",
        "Community",
        "Blog",
        "Case Studies",
    ];

    const company = [
        "About Us",
        "Careers",
        "Press",
        "Partners",
        "Contact",
        "Privacy Policy",
    ];

    const support = [
        "Help Center",
        "FAQs",
        "Developer Support",
        "Service Status",
        "Billing Support",
        "Report an Issue",
    ];
    const collaborators = [
        "Nishant Mohan",
        "Shivam Aryan",
        "Ankita Singh",
        "Prateek Kumar",
        "Shubham Kumar",
        "Abhishek Kumar",
    ];

    return (
        <footer className="footer container bg-slate-950 flex flex-col  px-6 py-8">
            {/* Logo Section */}
            <div className="footer-logo flex flex-col  mb-6">
                <div className="relative flex items-center">
                    <img src="Logo.png" alt="logo" className="w-12 h-12" />
                    <span
                        className="text-xl font-bold "
                        style={{ fontFamily: "unset", color: "#f3f4f6" }}
                    >
                        ransformoDocs
                    </span>
                </div>
            </div>
            <hr className="border-slate-700 w-full mb-6" />
            {/* Footer Components */}
            <div className="footer-components grid grid-cols-3 md:grid-cols-5 gap-3">
                <FooterComp heading="Collaborators" items={collaborators} />
                <FooterComp heading="Products" items={products} />
                <FooterComp heading="Resources" items={resources} />
                <FooterComp heading="Company" items={company} />
                <FooterComp heading="Support" items={support} />
            </div>
            <hr className="border-slate-700 w-full mb-6" />
            {/* Copyright Section */}
            <div className="flex flex-col items-center text-center md:text-left">
                <span className="text-sm text-slate-500">© 2023 ransformoDocs. All rights reserved.</span>
                <span className="text-sm text-slate-500">
                    Designed and developed by Nishant Mohan, Shivam Aryan, Ankita Singh, Prateek Kumar, Shubham Kumar, Abhishek Kumar.
                </span>
                <span className="text-sm text-slate-500">
                    All content on this website is licensed under the{" "}
                    <a
                        href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                    >
                        Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
                    </a>
                </span>
            </div>
        </footer>
    );
};

export default Footer;
