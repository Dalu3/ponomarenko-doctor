import React from "react";

const ServicesCard = ({ icon, circleIcon, title, description, index, isVisible, cardRef }) => {
    return (
        <div
            ref={cardRef}
            className={`services-card${isVisible ? " services-card-visible" : ""}`}
            style={{ "--service-card-index": index }}
        >
            <div className="services-card-header">
                <div className="icon-container">
                    <img src={circleIcon} alt="" aria-hidden="true" className="circle-icon" />
                    <img src={icon} alt="" aria-hidden="true" className="services-icon" />
                </div>
                <h3 className="services-card-title">{title}</h3>
                <p className="services-card-description">{description}</p>
            </div>
        </div>
    );
};

export default ServicesCard;
