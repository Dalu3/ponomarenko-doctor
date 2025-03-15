import React from "react";

export default function Main(){
    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if(section){
            section.scrollIntoView({behavior:"smooth"})
        }
    };
    return(
        <main className="main-section">
            <div className="main-content">
            <p className="main-subtitle">Надійна та доступна допомога кожному.</p>
            <h1 className="main-title">Пономаренко Анастасія Олександрівна</h1>
            <p className="main-description">Лікар-педіатр та лікар загальної  <span className="responsive-break"><br></br></span> практики сімейної медицини</p>
            <button className="main-button" onClick={() => scrollToSection('footer')} >Зв’язатися зі мною</button>
            </div>
        </main>
    )
}