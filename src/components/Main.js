import React from "react";

const BOOKING_URL = "https://helsi.me/doctor/78c465a1-8408-4997-bb04-3588bcfa2087";

export default function Main() {
    return (
        <main className="main-section">
            <div className="main-content">
                <p className="main-subtitle">Педіатр і сімейний лікар у Дніпрі</p>
                <h1 className="main-title">
                    Пономаренко <br className="responsive-break" />
                    Анастасія Олександрівна
                </h1>
                <p className="main-description">
                    <span className="main-description-full">
                        Допомагаю дітям і дорослим: прийом за декларацією НСЗУ, приватні й
                        онлайн-консультації, візити додому.
                    </span>
                    <span className="main-description-short">
                        Приймаю дітей і дорослих:<br />за декларацією, онлайн і вдома.
                    </span>
                </p>
                <a
                    className="main-button"
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Записатися на прийом
                </a>
            </div>
        </main>
    );
}
