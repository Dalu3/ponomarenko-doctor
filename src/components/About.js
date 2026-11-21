import React, { useEffect, useRef, useState } from "react";
import photo from "../images/ponomarenko-pediatr-portret.jpg";
import subtract from "../images/Subtract.png";
import image from "../images/medychnyi-dovidnyk-rentgen.jpg";
import subtract2 from "../images/Subtract2.png";

export default function About() {
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
    <section id="about" className="about-section" lang="uk">
      <div className="about-container">
        <div className="about-text">
                    <h2 className="about-title section-heading">
                        Мене звати <span className="about-title-name">Анастасія</span>
                    </h2>
          <p className="about-description section-copy">
            Я лікар-педіатр і лікар загальної практики сімейної медицини. У 2018 році закінчила Дніпропетровську державну медичну академію, пройшла інтернатуру з педіатрії та спеціалізацію із загальної практики сімейної медицини.
          </p>
          <p className="about-subtitle section-copy">
            Веду прийом у медичному центрі «Валео» на вул. Робочій, 148 у Дніпрі. Спостерігаю дітей від народження, лікую дорослих і до кожного пацієнта шукаю індивідуальний підхід. Буду рада стати лікарем для всієї вашої родини.
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
            aria-label="Instagram лікаря"
          >
            <img src={photo} alt="Пономаренко Анастасія лікар Дніпро" className="about-photo" />
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
            aria-label="Instagram лікаря"
          >
            <img src={image} alt="Лікар гортає медичний довідник із рентгенівськими знімками" className="experience-photo" />
          </a>
        </div>
        <div className="experience-text">
          <h2 className="experience-title section-heading">
            Професійний <span className="experience-title-word">досвід</span>
          </h2>
          <ul ref={experienceListRef} className="experience-list">
            <li className={itemClass(0)}>
              <span className="experience-item-title section-copy section-copy-strong">КНП «МДКЛ 6» ДМР</span>
              <span className="experience-item-role section-copy">
                Посада: Сестра медична дитячого інфекційного відділення
              </span>
            </li>
            <li className={itemClass(1)}>
              <span className="experience-item-title section-copy section-copy-strong">КНП «ДЦПМСД 7» ДМР</span>
              <span className="experience-item-role section-copy">
                Посада: Лікар-педіатр дільничий, сімейний лікар
              </span>
            </li>
            <li className={itemClass(2)}>
              <span className="experience-item-title section-copy section-copy-strong">КЗ «Дніпропетровський ДБІ» ДОР</span>
              <span className="experience-item-role section-copy">Посада: Лікар-педіатр</span>
            </li>
            <li className={itemClass(3)}>
              <span className="experience-item-title section-copy section-copy-strong">ТОВ «Валеолайф»</span>
              <span className="experience-item-role section-copy">
                Посада: Лікар загальної практики сімейної медицини
              </span>
            </li>
          </ul>
        </div>
      </div>
      </div>
    </section>
  );
}
