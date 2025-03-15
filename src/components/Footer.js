import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import inst from "../images/instagram.svg";
import linkedin from "../images/linkedin.svg";


const Footer = () => {
    const form = useRef();
    
    // Form state
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        user_email: "",
        message: "",
    });

    // Notification state for popup
    const [showPopup, setShowPopup] = useState(false);
    const [notification, setNotification] = useState("");

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Function to show the popup message
    const showPopupMessage = (message) => {
        setNotification(message);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 1900); // Hide after 3 seconds
    };

    // Function to send email
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            "service_tr9e4iv",
            "template_l0n6zzl",
            form.current,
            "kHqBl_kyMBasLhFa-"
        )
        .then(() => {
            showPopupMessage("Ваше повідомлення успішно надіслано!"); // Success message

            // Clear form data
            setFormData({ first_name: "", last_name: "", user_email: "", message: "" });
            form.current.reset();
        })
        .catch(() => {
            showPopupMessage("Помилка відправлення. Будь ласка, спробуйте ще раз."); // Error message
        });
        
    };

    return (
        <footer id="footer" className="footer">
            {/* Popup Notification */}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <p>{notification}</p>
                    </div>
                </div>
            )}

            <div className="footer-content">
                <div className="working-hours">
                    <h2 className="footer-title">Робочі години</h2>
                    <p><span className="day">Понеділок, середа, п’ятниця:</span> <span className="time">9:00 – 13:00</span></p>
                    <p><span className="day">Вівторок, четвер:</span> <span className="time">14:00 – 18:00</span></p>
                    <p><span className="day">Онлайн-консультації:</span> <span className="time">9:00 – 20:00</span></p>
                    <p className="note">Консультації на дому проводяться за попередньою домовленістю.</p>

                    <div className="footer-icons-div">
                        <a href="https://www.instagram.com/pediatr.a?igsh=ZXI5NzhjcmE4eDg5" target="_blank" rel="noopener noreferrer">
                            <img className="instagram" src={inst} alt="Instagram" />
                        </a>
                        <a href="https://www.linkedin.com/in/%D0%B0%D0%BD%D0%B0%D1%81%D1%82%D0%B0%D1%81%D1%96%D1%8F-%D0%BF%D0%BE%D0%BD%D0%BE%D0%BC%D0%B0%D1%80%D0%B5%D0%BD%D0%BA%D0%BE-46260234b/" target="_blank" rel="noopener noreferrer">
                            <img className="linkedin" src={linkedin} alt="LinkedIn" />
                        </a>
                    </div>

                    <a href="https://darialysunets.com/" className="copywrite-link" target="_blank" rel="noopener noreferrer">
                        <div className="copywrite">© 2025 by Daria Lysunets</div>
                    </a>
                </div>

                <div className="contact-form-container">
                    <h2>Залиште мені повідомлення</h2>
                    <form ref={form} onSubmit={sendEmail} className="contact-form">
                        <div className="input-group">
                            <div className="input-wrapper">
                                <label htmlFor="first_name">Ім’я *</label>
                                <input 
                                    type="text" 
                                    id="first_name" 
                                    name="first_name" 
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="last_name">Прізвище *</label>
                                <input 
                                    type="text" 
                                    id="last_name" 
                                    name="last_name" 
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="user_email">Пошта *</label>
                            <input 
                                type="email" 
                                id="user_email" 
                                name="user_email" 
                                value={formData.user_email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="message">Повідомлення *</label>
                            <textarea 
                                id="message" 
                                name="message" 
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <button type="submit">Надіслати</button>
                    </form>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
