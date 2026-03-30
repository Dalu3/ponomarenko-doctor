import React, { useEffect, useState } from "react";

const COOKIE_CONSENT_KEY = "ponomarenko_cookie_consent";

const readStoredConsent = () => {
    try {
        const storedConsent = window.localStorage.getItem(COOKIE_CONSENT_KEY);

        if (!storedConsent) {
            return null;
        }

        const parsedConsent = JSON.parse(storedConsent);

        return parsedConsent?.decision || null;
    } catch {
        return null;
    }
};

const saveConsent = (decision) => {
    try {
        window.localStorage.setItem(
            COOKIE_CONSENT_KEY,
            JSON.stringify({
                decision,
                analytics: decision === "accepted",
                essential: true,
                updatedAt: new Date().toISOString(),
            })
        );
    } catch {
        // Ignore storage errors so the site remains usable.
    }
};

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const storedConsent = readStoredConsent();

        if (storedConsent) {
            return;
        }

        setIsVisible(true);
    }, []);

    const closeBanner = () => {
        setIsVisible(false);
    };

    const handleAccept = () => {
        saveConsent("accepted");
        closeBanner();
    };

    const handleReject = () => {
        saveConsent("rejected");
        closeBanner();
    };

    if (!isVisible) {
        return null;
    }

    return (
        <aside
            className="cookie-banner"
            aria-live="polite"
            aria-label="Повідомлення про cookies"
        >
            <div className="cookie-banner__copy">
                <p className="cookie-banner__eyebrow">Cookies</p>
                <p className="cookie-banner__text">
                    Ми використовуємо cookies, щоб сайт працював стабільно,
                    запам’ятовував ваші налаштування та допомагав нам
                    покращувати досвід користування.
                </p>
            </div>

            <div className="cookie-banner__actions">
                <button
                    type="button"
                    className="cookie-banner__button cookie-banner__button--secondary"
                    onClick={handleReject}
                >
                    Відхилити
                </button>
                <button
                    type="button"
                    className="cookie-banner__button cookie-banner__button--primary"
                    onClick={handleAccept}
                >
                    Прийняти
                </button>
            </div>
        </aside>
    );
};

export default CookieBanner;
