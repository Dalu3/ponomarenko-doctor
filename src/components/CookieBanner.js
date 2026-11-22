import React, { useEffect, useState } from "react";
import { useTranslations } from "../i18n";

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
    const t = useTranslations().cookie;
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
            aria-label={t.label}
        >
            <div className="cookie-banner__copy">
                <div className="cookie-banner__head">
                    <span className="cookie-banner__icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                            <path
                                d="M12 3a9 9 0 1 0 9 9 3 3 0 0 1-3.5-3A3 3 0 0 1 14 5.5 3 3 0 0 1 12 3Z"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinejoin="round"
                            />
                            <circle cx="8.5" cy="10.5" r="1.1" fill="currentColor" />
                            <circle cx="14.5" cy="15" r="1.1" fill="currentColor" />
                            <circle cx="9.5" cy="16" r="0.9" fill="currentColor" />
                        </svg>
                    </span>
                    <p className="cookie-banner__eyebrow">{t.eyebrow}</p>
                </div>
                <p className="cookie-banner__text">
                    {t.text}
                </p>
            </div>

            <div className="cookie-banner__actions">
                <button
                    type="button"
                    className="cookie-banner__button cookie-banner__button--secondary"
                    onClick={handleReject}
                >
                    {t.reject}
                </button>
                <button
                    type="button"
                    className="cookie-banner__button cookie-banner__button--primary"
                    onClick={handleAccept}
                >
                    {t.accept}
                </button>
            </div>
        </aside>
    );
};

export default CookieBanner;
