import React from "react";
import photo from "../images/photo.jpg";
import subtract from "../images/Subtract.png";
import image from  "../images/image-book.jpg"
import subtract2 from '../images/Subtract2.png'

export default function About() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if(section){
        section.scrollIntoView({behavior:"smooth"})
    }
};
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-text">
          <h2 className="about-title">Мене звати Анастасія</h2>
          <p className="about-subtitle">
            Я лікар-педіатр та лікар загальної практики сімейної медицини із
            5-річним досвідом.
          </p>
          <p className="about-description">
            Закінчила Дніпропетровську державну медичну академію у 2018 році,
            завершила інтернатуру зі спеціальності “Педіатрія” та пройшла курси
            спеціалізації “Загальної практики сімейної медицини”.
          </p>
          <button onClick={() => scrollToSection('footer')} className="about-button">Залишити повідомлення</button>
        </div>
        <div className="about-image">
          <img src={subtract} alt="Background Shape" className="subtract-image"
           />
           
          <img src={photo} alt="Анастасія" className="about-photo" />
        </div>
      </div>
    <div id="experience" className="experience-section">
      <div className="experience-container">
        <div className="experience-image">
          <img src={subtract2} alt="Decorative Shape" className="subtract2-image" />
          <img src={image} alt="Medical Equipment" className="experience-photo" />
        </div>
        <div className="experience-text">
          <h2 className="experience-title">Професійний досвід</h2>
          <ul className="experience-list">
          <li>
            <span className="experience-item-title">КНП «МДКЛ 6» ДМР</span>
            <br /> Посада: Сестра медична дитячого інфекційного відділення
          </li>
          <li>
            <span className="experience-item-title">КНП «ДЦПМСД 7» ДМР</span>
            <br /> Посада: Лікар-педіатр дільничий, сімейний лікар
          </li>
          <li>
            <span className="experience-item-title">КЗ «Дніпропетровський ДБІ» ДОР</span>
            <br /> Посада: Лікар-педіатр
          </li>
          <li>
            <span className="experience-item-title">ТОВ «Валеолайф»</span>
            <br /> Посада: Лікар загальної практики — сімейний лікар
          </li>
        </ul>
        </div>
      </div>
      </div>
    </section>
  );
}
