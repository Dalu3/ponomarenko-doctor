import React from "react";

const ServicesCard = ({ icon, circleIcon, title, description }) => {
    return (
        <div id="services" className="services-card">
            <div className="services-card-header">
                <div className="icon-container">
                    <img src={circleIcon} alt="Circle" className="circle-icon" />
                    <img src={icon} alt={title} className="services-icon" />
                </div>
                <h3 className="services-card-title">{title}</h3>
                <p className="services-card-description">{description}</p>
            </div>
        </div>
    );
};

export default ServicesCard;