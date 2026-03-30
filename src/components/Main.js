import React from "react";

export default function Main() {
    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <main className="main-section">
            <div className="main-content">
                <p className="main-subtitle">
                    <span className="main-subtitle-desktop">Професійна медична допомога</span>
                    <span className="main-subtitle-mobile">Для дітей і дорослих</span>
                </p>
                <h1 className="main-title">
                    <span className="main-title-desktop">
                        Пономаренко <span className="responsive-break"><br></br></span>Анастасія Олександрівна
                    </span>
                    <span className="main-title-mobile">Анастасія Пономаренко</span>
                </h1>
                <p className="main-description">
                    <span className="main-description-desktop">Педіатр · Лікар загальної практики сімейної медицини</span>
                    <span className="main-description-mobile">Педіатр · Сімейний лікар</span>
                </p>
                <button className="main-button" onClick={() => scrollToSection("footer")}>
                    <span className="main-button-label-desktop">Зв’язатися зі мною</span>
                    <span className="main-button-label-mobile">Зв’язатися зі мною</span>
                </button>
            </div>
        </main>
    );
}
