import React, { useState } from "react";
import faqPhoto from "../images/likar-chytaie-knyhu.jpg";
import { useTranslations } from "../i18n";


export default function Faq() {
    const t = useTranslations().faq;
    const faqItems = t.items;
    const [openIndex, setOpenIndex] = useState(0);

    const toggle = (index) => {
        setOpenIndex((current) => (current === index ? null : index));
    };

    return (
        <section
            id="faq"
            className="faq-section"
            itemScope
            itemType="https://schema.org/FAQPage"
        >
            <div className="faq-container">
                <div className="faq-media">
                    <img
                        className="faq-image"
                        src={faqPhoto}
                        alt={t.imageAlt}
                        loading="lazy"
                        width="600"
                        height="600"
                    />
                </div>

                <div className="faq-content">
                    <h2 className="faq-title section-heading">
                        {t.title}
                    </h2>
                    <div className="faq-list">
                        {faqItems.map((item, index) => {
                            const isOpen = openIndex === index;
                            const answerId = `faq-answer-${index}`;
                            const buttonId = `faq-question-${index}`;
                            return (
                                <div
                                    key={item.question}
                                    className={`faq-item${isOpen ? " is-open" : ""}`}
                                    itemScope
                                    itemProp="mainEntity"
                                    itemType="https://schema.org/Question"
                                >
                                    <h3 className="faq-question-heading">
                                        <button
                                            type="button"
                                            id={buttonId}
                                            className="faq-question"
                                            aria-expanded={isOpen}
                                            aria-controls={answerId}
                                            onClick={() => toggle(index)}
                                        >
                                            <span itemProp="name">
                                                {item.question}
                                            </span>
                                            <span
                                                className="faq-icon"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </h3>
                                    <div
                                        id={answerId}
                                        className="faq-answer"
                                        role="region"
                                        aria-labelledby={buttonId}
                                        aria-hidden={!isOpen}
                                        itemScope
                                        itemProp="acceptedAnswer"
                                        itemType="https://schema.org/Answer"
                                    >
                                        <div className="faq-answer-inner">
                                            <p itemProp="text">{item.answer}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
