import React from "react";
import { useTranslations } from "../i18n";

const BOOKING_URL = "https://helsi.me/doctor/78c465a1-8408-4997-bb04-3588bcfa2087";

export default function Main() {
    const t = useTranslations().main;
    return (
        <main className="main-section">
            <div className="main-content">
                <p className="main-subtitle">{t.subtitle}</p>
                <h1 className="main-title">
                    {`${t.titleFirst} `}<br className="responsive-break" />
                    {t.titleSecond}
                </h1>
                <p className="main-description">
                    <span className="main-description-full">
                        {t.descriptionFull}
                    </span>
                    <span className="main-description-short">
                        {t.descriptionShortFirst}<br />{t.descriptionShortSecond}
                    </span>
                </p>
                <a
                    className="main-button"
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {t.button}
                </a>
            </div>
        </main>
    );
}
