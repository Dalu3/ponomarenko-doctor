import React, { useEffect, useRef, useState } from "react";
import logo from "../images/logo.png";

const navItems = [
    { target: "about", label: "Ваш лікар" },
    { target: "experience", label: "Досвід" },
    { target: "services", label: "Послуги" },
];

export default function Header() {
    const bookingUrl = "https://helsi.me/doctor/78c465a1-8408-4997-bb04-3588bcfa2087";
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const headerRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const scrollToTarget = (targetId) => {
        setIsMenuOpen(false);

        requestAnimationFrame(() => {
            if (targetId === "top") {
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
            }

            const section = document.getElementById(targetId);
            if (section) {
                if (targetId === "about") {
                    const aboutOffset = window.innerWidth <= 600 ? 28 : 88;
                    const sectionTop = section.getBoundingClientRect().top + window.scrollY;

                    window.scrollTo({
                        top: Math.max(sectionTop - aboutOffset, 0),
                        behavior: "smooth",
                    });

                    return;
                }

                section.scrollIntoView({ behavior: "smooth" });
            }
        });
    };

    const openBooking = () => {
        setIsMenuOpen(false);
        window.open(bookingUrl, "_blank", "noopener,noreferrer");
    };

    useEffect(() => {
        if (!isMenuOpen) {
            return undefined;
        }

        const handleClickOutside = (event) => {
            if (headerRef.current && !headerRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setIsMenuOpen(false);
            }
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isMenuOpen]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1060) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <div
                className={`menu-overlay ${isMenuOpen ? "open" : ""}`}
                onClick={closeMenu}
                aria-hidden={!isMenuOpen}
            />
            <header className={`header-main-div ${isMenuOpen ? "menu-open" : ""}`} ref={headerRef}>
                <img
                    src={logo}
                    onClick={() => scrollToTarget("top")}
                    className="header-logo"
                    alt="Логотип лікаря Анастасії Олександрівни Пономаренко"
                />
                <button
                    type="button"
                    className={`menu-icon hamburger ${isMenuOpen ? "open" : ""}`}
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={isMenuOpen}
                    aria-controls="header-navigation"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div className={`header-second-div ${isMenuOpen ? "open" : ""}`} id="header-navigation">
                    <ul className="nav-list">
                        {navItems.map((item, index) => (
                            <li
                                key={item.target}
                                className="nav-item"
                                style={{ "--i": index }}
                                onClick={() => scrollToTarget(item.target)}
                            >
                                <span>{item.label}</span>
                                <svg className="nav-item-arrow" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M9 5l7 7-7 7" />
                                </svg>
                            </li>
                        ))}
                    </ul>
                    <button
                        className="header-button"
                        style={{ "--i": navItems.length }}
                        onClick={openBooking}
                    >
                        {"Запишіться\u00A0зараз"}
                    </button>
                </div>
            </header>
        </>
    );
}
