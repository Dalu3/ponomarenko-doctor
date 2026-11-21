import React, { useState } from "react";
import faqPhoto from "../images/likar-chytaie-knyhu.jpg";

// Чернетка відповідей: перед публікацією їх має переглянути лікарка.
const faqItems = [
    {
        question: "Як підписати декларацію з педіатром у Дніпрі?",
        answer: "Прийдіть до медичного центру «Валео» на вул. Робочій, 148 у робочі години або попередньо запишіться через Helsi. Візьміть із собою паспорт і РНОКПП. Для дитини потрібні свідоцтво про народження та документи одного з батьків.",
    },
    {
        question: "Чи можна отримати консультацію без декларації?",
        answer: "Так. Якщо ви не хочете укладати декларацію, можна записатися на приватну консультацію.",
    },
    {
        question: "Ви приймаєте тільки дітей чи дорослих також?",
        answer: "Я педіатр і лікар загальної практики сімейної медицини, тому приймаю і дітей, і дорослих. Можна обслуговуватися всією родиною в одного лікаря.",
    },
    {
        question: "Як проходить онлайн-консультація?",
        answer: "Онлайн-консультації доступні з 9:00 до 20:00. Залиште повідомлення через форму на сайті або запишіться через Helsi, і ми домовимося про зручний час.",
    },
    {
        question: "Чи можна викликати лікаря додому?",
        answer: "Так, консультації вдома проводяться в межах Дніпра за попередньою домовленістю.",
    },
    {
        question: "Який графік прийому в медичному центрі?",
        answer: "Понеділок, середа, п’ятниця: 9:00–13:00. Вівторок, четвер: 14:00–18:00.",
    },
];

export default function Faq() {
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
                        alt="Лікар читає медичну книгу в кріслі"
                        loading="lazy"
                        width="600"
                        height="600"
                    />
                </div>

                <div className="faq-content">
                    <h2 className="faq-title section-heading">
                        Поширені запитання
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
