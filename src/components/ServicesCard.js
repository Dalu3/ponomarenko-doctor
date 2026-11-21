import React from "react";

const scrollToContactForm = (event) => {
    const target = document.getElementById("contact-form");
    if (!target) {
        return;
    }

    event.preventDefault();

    const header = document.querySelector("header");
    const headerOffset = (header ? header.getBoundingClientRect().height : 0) + 16;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({ top: Math.max(top, 0), behavior: prefersReducedMotion ? "auto" : "smooth" });
};

const ServicesCard = ({ icon, title, description, index, isVisible, cardRef }) => {
    return (
        <a
            ref={cardRef}
            href="#contact-form"
            onClick={scrollToContactForm}
            className={`services-card${isVisible ? " services-card-visible" : ""}`}
            style={{ "--service-card-index": index }}
        >
            <div className="icon-container">
                <img src={icon} alt="" aria-hidden="true" className="services-icon" />
            </div>
            <h3 className="services-card-title">{title}</h3>
            <p className="services-card-description">{description}</p>
        </a>
    );
};

export default ServicesCard;
