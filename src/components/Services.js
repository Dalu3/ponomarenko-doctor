import React, { useEffect, useRef, useState } from "react";
import ServicesCard from "./ServicesCard";
import check from "../images/check.png";
import heart from "../images/heart.png";
import wifi from "../images/wifi.png";
import home from "../images/home.png";
import circle from "../images/circle.png"; // Import the circle icon

const serviceData = [
    {
        icon: check,
        circleIcon: circle,
        title: "Безкоштовний прийом",
        description:
            'Декларація НСЗУ. Прийом пацієнтів за декларацією НСЗУ в медичному центрі "Валео" за адресою: вул. Робоча, 148.',
    },
    {
        icon: heart,
        circleIcon: circle,
        title: "Приватні консультації",
        description:
            "Без декларації. Можливість отримати приватну консультацію без укладення декларації.",
    },
    {
        icon: wifi,
        circleIcon: circle,
        title: "Онлайн консультації",
        description:
            "Зручний формат. Консультації для пацієнтів, які не можуть прийти на особисту зустріч.",
    },
    {
        icon: home,
        circleIcon: circle,
        title: "Консультації на дому",
        description:
            "Комфорт та професіоналізм. Надання професійної допомоги вдома для вашого комфорту та зручності.",
    },
];

const Services = () => {
    const servicesRef = useRef(null);
    const cardRefs = useRef([]);
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const [revealedCards, setRevealedCards] = useState(() => serviceData.map(() => false));

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
        <div id="services" className="services-section" data-nosnippet>
        <h2 className="services-section-title">
            <span className="title-left">Як я можу допомогти </span>
            <span className="title-underline"></span>
            <span className="title-right"> вам і вашій родині?</span>
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
