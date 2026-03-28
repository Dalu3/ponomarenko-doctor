import React, { useEffect, useRef, useState } from "react";
import photo from "../images/photo.jpg";
import subtract from "../images/Subtract.png";
import image from "../images/image-book.jpg";
import subtract2 from "../images/Subtract2.png";

export default function About() {
  const instagramUrl = "https://www.instagram.com/pediatr.a?igsh=ZXI5NzhjcmE4eDg5";
  const experienceListRef = useRef(null);
  const [isPhoneViewport, setIsPhoneViewport] = useState(false);
  const [isExperienceRevealed, setIsExperienceRevealed] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 649px)");
    const updateViewportState = () => {
      setIsPhoneViewport(mediaQuery.matches);
    };

    updateViewportState();
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateViewportState);
    } else {
      mediaQuery.addListener(updateViewportState);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", updateViewportState);
      } else {
        mediaQuery.removeListener(updateViewportState);
      }
    };
  }, []);

  useEffect(() => {
    if (!isPhoneViewport || isExperienceRevealed || !experienceListRef.current) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsExperienceRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(experienceListRef.current);
    return () => observer.disconnect();
  }, [isPhoneViewport, isExperienceRevealed]);
  return (
    <section id="about" className="about-section" lang="uk">
      <div className="about-container">
        <div className="about-text">
                    <h2 className="about-title section-heading">
                        Мене звати <span className="about-title-name">Анастасія</span>
                    </h2>
          <p className="about-description section-copy">
            Я лікар-педіатр та лікар загальної практики сімейної медицини із
            5-річним досвідом.
          </p>
          <p className="about-description section-copy">
              Закінчила Дніпропетровську державну медичну академію у 2018 році, завершила інтернатуру зі спеціальності «Педіатрія» та пройшла курси спеціалізації «Загальна практика сімейної медицини».    </p>
          <p className="about-subtitle section-copy">
            Працюю з дітьми та дорослими і завжди знаходжу індивідуальний підхід. Буду рада допомогти вам і стати вашим лікарем.
          </p>
        </div>
        <a
          className="about-image"
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram лікаря"
        >
          <img src={subtract} alt="Background Shape" className="subtract-image"
           />
           
          <img src={photo} alt="Анастасія" className="about-photo" />
        </a>
        
      </div>
    <div id="experience" className="experience-section">
      <div className="experience-container">
        <a
          className="experience-image"
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram лікаря"
        >
          <img src={subtract2} alt="Decorative Shape" className="subtract2-image" />
          <img src={image} alt="Medical Equipment" className="experience-photo" />
        </a>
        <div className="experience-text">
          <h2 className="experience-title section-heading">
            Професійний <span className="experience-title-word">досвід</span>
          </h2>
          <ul
            ref={experienceListRef}
            className={`experience-list${isPhoneViewport ? " experience-list-animate" : ""}${
              isExperienceRevealed ? " revealed" : ""
            }`}
          >
            <li className="experience-item">
              <span className="experience-item-title section-copy section-copy-strong">КНП «МДКЛ 6» ДМР</span>
              <span className="experience-item-role section-copy">
                Посада: Сестра медична дитячого інфекційного відділення
              </span>
            </li>
            <li className="experience-item">
              <span className="experience-item-title section-copy section-copy-strong">КНП «ДЦПМСД 7» ДМР</span>
              <span className="experience-item-role section-copy">
                Посада: Лікар-педіатр дільничий, сімейний лікар
              </span>
            </li>
            <li className="experience-item">
              <span className="experience-item-title section-copy section-copy-strong">КЗ «Дніпропетровський ДБІ» ДОР</span>
              <span className="experience-item-role section-copy">Посада: Лікар-педіатр</span>
            </li>
            <li className="experience-item">
              <span className="experience-item-title section-copy section-copy-strong">ТОВ «Валеолайф»</span>
              <span className="experience-item-role section-copy">
                Посада: Лікар загальної практики — сімейний лікар
              </span>
            </li>
          </ul>
        </div>
      </div>
      </div>
    </section>
  );
}
