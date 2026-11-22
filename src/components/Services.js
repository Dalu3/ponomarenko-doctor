import React, { useEffect, useRef, useState } from "react";
import ServicesCard from "./ServicesCard";
import check from "../images/check.png";
import heart from "../images/heart.png";
import wifi from "../images/wifi.png";
import home from "../images/home.png";
import { useTranslations } from "../i18n";

const serviceIcons = [check, heart, wifi, home];

const Services = () => {
    const t = useTranslations().services;
    const serviceData = t.items.map((item, index) => ({ ...item, icon: serviceIcons[index] }));
    const servicesRef = useRef(null);
    const cardRefs = useRef([]);
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const [revealedCards, setRevealedCards] = useState(() => serviceIcons.map(() => false));

    useEffect(() => {
        if (!servicesRef.current || revealedCards.every(Boolean)) {
            return undefined;
        }

        let animationFrameId = 0;
        const observers = [];

        setShouldAnimate(true);

        const revealCard = (index) => {
            setRevealedCards((current) => {
                if (current[index]) {
                    return current;
                }

                const next = [...current];
                next[index] = true;
                return next;
            });
        };

        const checkVisibility = () => {
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

            cardRefs.current.forEach((card, index) => {
                if (!card || revealedCards[index]) {
                    return;
                }

                const rect = card.getBoundingClientRect();

                if (rect.top <= viewportHeight * 0.88 && rect.bottom >= viewportHeight * 0.18) {
                    revealCard(index);
                }
            });
        };

        if ("IntersectionObserver" in window) {
            cardRefs.current.forEach((card, index) => {
                if (!card || revealedCards[index]) {
                    return;
                }

                const observer = new IntersectionObserver(
                    ([entry]) => {
                        if (entry.isIntersecting) {
                            revealCard(index);
                            observer.unobserve(entry.target);
                        }
                    },
                    {
                        threshold: 0.2,
                        rootMargin: "0px 0px -8% 0px",
                    }
                );

                observer.observe(card);
                observers.push(observer);
            });
        } else {
            const requestVisibilityCheck = () => {
                if (animationFrameId) {
                    return;
                }

                animationFrameId = window.requestAnimationFrame(() => {
                    animationFrameId = 0;
                    checkVisibility();
                });
            };

            checkVisibility();
            window.addEventListener("scroll", requestVisibilityCheck, { passive: true });
            window.addEventListener("resize", requestVisibilityCheck);

            return () => {
                if (animationFrameId) {
                    window.cancelAnimationFrame(animationFrameId);
                }

                window.removeEventListener("scroll", requestVisibilityCheck);
                window.removeEventListener("resize", requestVisibilityCheck);
            };
        }

        return () => {
            observers.forEach((observer) => observer.disconnect());

            if (animationFrameId) {
                window.cancelAnimationFrame(animationFrameId);
            }
        };
    }, [revealedCards]);

    return (
        <div id="services" className="services-section">
        <h2 className="services-section-title">
            <span className="title-left">{t.titleLeft}</span>
            <span className="title-underline"></span>
            <span className="title-right">{t.titleRight}</span>
        </h2>
            <div
                ref={servicesRef}
                className={`services-container${shouldAnimate ? " services-container-animate" : ""}`}
            >
                {serviceData.map((service, index) => (
                    <ServicesCard
                        key={index}
                        cardRef={(element) => {
                            cardRefs.current[index] = element;
                        }}
                        index={index}
                        isVisible={revealedCards[index]}
                        icon={service.icon}
                        title={service.title}
                        description={service.description}
                    />
                ))}
            </div>
        </div>
    );
};

export default Services;
