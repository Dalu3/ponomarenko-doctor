import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import inst from "../images/instagram.svg";
import linkedin from "../images/linkedin.svg";

const initialFormData = {
    first_name: "",
    last_name: "",
    user_email: "",
    message: "",
};

const allFieldsTouched = Object.keys(initialFormData).reduce((acc, field) => {
    acc[field] = true;
    return acc;
}, {});

const Footer = () => {
    const form = useRef();
    const currentYear = new Date().getFullYear();
    
    // Form state
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});

    // Notification state for popup
    const [showPopup, setShowPopup] = useState(false);
    const [notification, setNotification] = useState("");

    const validateField = (name, value) => {
        const trimmedValue = value.trim();

        switch (name) {
            case "first_name":
                return Boolean(trimmedValue);
            case "last_name":
                return Boolean(trimmedValue);
            case "user_email":
                return Boolean(trimmedValue) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue);
            case "message":
                return Boolean(trimmedValue);
            default:
                return true;
        }
    };

    const validateForm = (values) =>
        Object.entries(values).reduce((acc, [fieldName, fieldValue]) => {
            if (!validateField(fieldName, fieldValue)) {
                acc[fieldName] = true;
            }

            return acc;
        }, {});

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

        if (touchedFields[name] || errors[name]) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: !validateField(name, value),
            }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;

        setTouchedFields((prevTouchedFields) => ({
            ...prevTouchedFields,
            [name]: true,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: !validateField(name, value),
        }));
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

        const validationErrors = validateForm(formData);

        setErrors(validationErrors);
        setTouchedFields(allFieldsTouched);

        if (Object.values(validationErrors).some(Boolean)) {
            return;
        }

        emailjs.sendForm(
            "service_tr9e4iv",
            "template_l0n6zzl",
            form.current,
            "kHqBl_kyMBasLhFa-"
        )
        .then(() => {
            showPopupMessage("Ваше повідомлення успішно надіслано!"); // Success message

            // Clear form data
            setFormData(initialFormData);
            setErrors({});
            setTouchedFields({});
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
                </div>

                <div className="contact-form-container">
                    <h2>
                        <span className="contact-form-title-default">Залиште повідомлення</span>
                        <span className="contact-form-title-mobile">Залиште повідомлення</span>
                    </h2>
                    <form ref={form} onSubmit={sendEmail} className="contact-form" noValidate>
                        <div className="input-group">
                            <div className={`input-wrapper${errors.first_name ? " has-error" : ""}`}>
                                <label htmlFor="first_name">Ім’я *</label>
                                <input 
                                    type="text" 
                                    id="first_name" 
                                    name="first_name" 
                                    placeholder="Вкажіть ім’я"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    aria-invalid={Boolean(errors.first_name)}
                                    required
                                />
                            </div>
                            <div className={`input-wrapper${errors.last_name ? " has-error" : ""}`}>
                                <label htmlFor="last_name">Прізвище *</label>
                                <input 
                                    type="text" 
                                    id="last_name" 
                                    name="last_name" 
                                    placeholder="Вкажіть прізвище"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    aria-invalid={Boolean(errors.last_name)}
                                    required
                                />
                            </div>
                        </div>

                        <div className={`input-wrapper${errors.user_email ? " has-error" : ""}`}>
                            <label htmlFor="user_email">Пошта *</label>
                            <input 
                                type="email" 
                                id="user_email" 
                                name="user_email" 
                                placeholder="Вкажіть email"
                                value={formData.user_email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                aria-invalid={Boolean(errors.user_email)}
                                required
                            />
                        </div>

                        <div className={`input-wrapper${errors.message ? " has-error" : ""}`}>
                            <label htmlFor="message">Повідомлення *</label>
                            <textarea 
                                id="message" 
                                name="message" 
                                placeholder="Напишіть повідомлення"
                                value={formData.message}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                aria-invalid={Boolean(errors.message)}
                                required
                            ></textarea>
                        </div>

                        <button type="submit">Надіслати</button>
                    </form>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="copywrite copywrite--studio">
                    <span className="copywrite-line">© {currentYear} Anastasiia Ponomarenko</span>
                    <span className="copywrite-line">
                        Built by{" "}
                        <a
                            href="https://dashly.studio/"
                            className="copywrite-link copywrite-brand-link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="copywrite-brand">Dashly Studio</span>
                        </a>
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
