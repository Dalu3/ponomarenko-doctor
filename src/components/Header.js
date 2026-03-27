import React, { useEffect, useRef, useState } from "react";
import logo from "../images/logo.png";

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

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
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
            <header className={`header-main-div ${isMenuOpen ? "sticky" : ""}`} ref={headerRef}>
                <img
                    src={logo}
                    onClick={() => scrollToTarget("top")}
                    className="header-logo"
                    alt="Logo"
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
                        <li className="nav-item" onClick={() => scrollToTarget("about")}>
                            Ваш лікар
                        </li>
                        <li className="nav-item" onClick={() => scrollToTarget("experience")}>
                            Досвід
                        </li>
                        <li className="nav-item" onClick={() => scrollToTarget("services")}>
                            Послуги
                        </li>
                    </ul>
                    <button className="header-button" onClick={openBooking}>
                        Запишіться зараз
                    </button>
                </div>
            </header>
        </>
    );
}
