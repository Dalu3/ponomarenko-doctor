import React, { useEffect, useRef, useState } from "react";
import photo from "../images/ponomarenko-pediatr-portret.jpg";
import subtract from "../images/Subtract.png";
import image from "../images/medychnyi-dovidnyk-rentgen.jpg";
import subtract2 from "../images/Subtract2.png";
import { useTranslations } from "../i18n";

export default function About() {
  const translations = useTranslations();
  const t = translations.about;
  const instagramUrl = "https://www.instagram.com/pediatr.a?igsh=ZXI5NzhjcmE4eDg5";
  const experienceListRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    const list = experienceListRef.current;
    if (!list) {
      return undefined;
    }

    const items = Array.from(list.querySelectorAll(".experience-item"));
    const showAll = () => setVisibleItems(items.map((_, index) => index));

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      showAll();
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          const index = items.indexOf(entry.target);
          setVisibleItems((prev) => (prev.includes(index) ? prev : [...prev, index]));
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const itemClass = (index) =>
    `experience-item experience-item-reveal${visibleItems.includes(index) ? " is-visible" : ""}`;

  return (
    <section id="about" className="about-section" lang={translations.htmlLang}>
      <div className="about-container">
        <div className="about-text">
                    <h2 className="about-title section-heading">
                        {t.titleStart}<span className="about-title-name">{t.titleName}</span>
                    </h2>
          <p className="about-description section-copy">
            {t.description}
          </p>
          <p className="about-subtitle section-copy">
            {t.subtitle}
          </p>
        </div>
        <div className="about-image">
          <img src={subtract} alt="" aria-hidden="true" className="subtract-image"
           />

          <a
            className="about-photo-link"
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.instagramLabel}
          >
            <img src={photo} alt={t.photoAlt} className="about-photo" />
          </a>
        </div>
        
      </div>
    <div id="experience" className="experience-section">
      <div className="experience-container">
        <div className="experience-image">
          <img src={subtract2} alt="" aria-hidden="true" className="subtract2-image" />
          <a
            className="experience-photo-link"
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.instagramLabel}
          >
            <img src={image} alt={t.experienceImageAlt} className="experience-photo" />
          </a>
        </div>
        <div className="experience-text">
          <h2 className="experience-title section-heading">
            {t.experienceTitleStart}<span className="experience-title-word">{t.experienceTitleWord}</span>
          </h2>
          <ul ref={experienceListRef} className="experience-list">
            {t.experience.map((item, index) => (
              <li key={item.title} className={itemClass(index)}>
                <span className="experience-item-title section-copy section-copy-strong">{item.title}</span>
                <span className="experience-item-role section-copy">{item.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
    </section>
  );
}
