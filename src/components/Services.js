import React from "react";
import ServicesCard from "./ServicesCard";
import check from "../images/check.png";
import heart from "../images/heart.png";
import wifi from "../images/wifi.png";
import home from "../images/home.png";
import circle from "../images/circle.png"; // Import the circle icon

const Services = () => {
    const serviceData = [
        {
            icon: check,
            circleIcon: circle,
            title: 'Безкоштовний прийом',
            description: 'Декларація НСЗУ. Прийом пацієнтів за декларацією НСЗУ в медичному центрі "Валео" за адресою: вул. Робоча, 148.',
            
        },
        {
            icon: heart,
            circleIcon: circle,
            title: 'Приватні консультації',
            description: 'Без декларації. Можливість отримати приватну консультацію без укладення декларації.',
        },
        {
            icon: wifi,
            circleIcon: circle,
            title: 'Онлайн консультації',
            description: 'Зручний формат. Консультації для пацієнтів, які не можуть прийти на особисту зустріч.',
        },
        {
            icon: home,
            circleIcon: circle,
            title: 'Консультації на дому',
            description: 'Комфорт та професіоналізм. Надання професійної допомоги вдома для вашого комфорту та зручності.',
        },
    ];

    return (
        <div className="services-section">
        <h2 className="services-section-title">
            <span className="title-left">Як я можу допомогти</span>
            <span className="title-underline"></span>
            <span className="title-right">вам і вашій родині?</span>
        </h2>
            <div className="services-container">
                {serviceData.map((service, index) => (
                    <ServicesCard
                        key={index}
                        icon={service.icon}
                        circleIcon={service.circleIcon}
                        title={service.title}
                        description={service.description}
                    />
                ))}
            </div>
        </div>
    );
};

export default Services;
