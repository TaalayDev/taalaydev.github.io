import React, { useState } from 'react';
import sourceCode from '../assets/sourceCode.png';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleAnchorClick = (event) => {
        event.preventDefault();
        const link = event.currentTarget;
        const anchorId = new URL(link.href).hash.replace("#", "");
        const anchor = document.getElementById(anchorId);
        window.scrollTo({
            top: anchor.offsetTop,
            behavior: "smooth",
        });
        setMenuOpen(false);
    };

    return (
        <nav className="bg-white border-gray-200 px-8 sm:px-8 py-2.5 rounded">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <a href="/" className="flex items-center">
                    <img src={sourceCode} className="mr-4 h-6 sm:h-9" alt="Site Logo" />
                    <span
                        className="self-center text-xl font-semibold whitespace-nowrap"
                        style={{ color: '#50afc0' }}
                    >
                        TaalayDev
                    </span>
                </a>
                <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden bg-gray-100 focus:outline-none ring-2 ring-gray-200"
                    aria-controls="navbar-default"
                    aria-expanded={menuOpen}
                    onClick={toggleMenu}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                <div
                    className={`${menuOpen ? '' : 'hidden'} w-full md:block md:w-auto`}
                    id="navbar-default"
                >
                    <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
                        <li>
                            <a
                                href="#about"
                                className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                                onClick={handleAnchorClick}
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                href="#projects"
                                className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                                onClick={handleAnchorClick}
                            >
                                Projects
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://github.com/TaalayDev"
                                className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Github
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;