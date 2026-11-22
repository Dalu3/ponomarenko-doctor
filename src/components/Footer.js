import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import inst from "../images/instagram.svg";
import linkedin from "../images/linkedin.svg";
import { useTranslations } from "../i18n";

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
    const translations = useTranslations();
    const t = translations.footer;
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

        const firstName = formData.first_name.trim();
        const lastName = formData.last_name.trim();
        const email = formData.user_email.trim();

        // Змінні для шаблону EmailJS (див. email-template/contact-request.html)
        const templateParams = {
            first_name: firstName,
            last_name: lastName,
            from_name: `${firstName} ${lastName}`,
            user_email: email,
            from_email: email,
            reply_to: email,
            message: formData.message.trim(),
            sent_at: new Date().toLocaleString("uk-UA", {
                timeZone: "Europe/Kyiv",
                dateStyle: "long",
                timeStyle: "short",
            }),
        };

        emailjs.send(
            "service_tr9e4iv",
            "template_l0n6zzl",
            templateParams,
            "kHqBl_kyMBasLhFa-"
        )
        .then(() => {
            showPopupMessage(t.success); // Success message

            // Clear form data
            setFormData(initialFormData);
            setErrors({});
            setTouchedFields({});
        })
        .catch(() => {
            showPopupMessage(t.error); // Error message
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
                <div className="footer-info">
                    <section className="footer-block">
                        <h2 className="footer-title">{t.hoursTitle}</h2>
                        <ul className="footer-schedule">
                            <li>
                                <span className="day">{t.scheduleWeekdaysA}</span>
                                <span className="time">9:00 – 13:00</span>
                            </li>
                            <li>
                                <span className="day">{t.scheduleWeekdaysB}</span>
                                <span className="time">14:00 – 18:00</span>
                            </li>
                            <li>
                                <span className="day">{t.scheduleOnline}</span>
                                <span className="time">9:00 – 20:00</span>
                            </li>
                        </ul>
                        <p className="footer-note">{t.homeNote}</p>
                    </section>

                    <section className="footer-block">
                        <h2 className="footer-title">{t.addressTitle}</h2>
                        <address className="footer-address-body">
                            <p className="footer-address-name">{t.clinicName}</p>
                            <p>{t.street}</p>
                            <p>
                                <a className="footer-phone" href="tel:+380970078936">+38 (097) 007-89-36</a>
                            </p>
                        </address>
                        <div className="footer-links">
                            <a
                                href="https://www.google.com/maps?cid=12961065560228267002"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {t.openMap}
                            </a>
                            <a
                                href="https://helsi.me/doctor/78c465a1-8408-4997-bb04-3588bcfa2087"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {t.bookHelsi}
                            </a>
                        </div>
                    </section>

                    <div className="footer-icons-div">
                        <a href="https://www.instagram.com/pediatr.a?igsh=ZXI5NzhjcmE4eDg5" target="_blank" rel="noopener noreferrer" aria-label={t.instagramLabel}>
                            <img className="instagram" src={inst} alt={t.instagramLabel} />
                        </a>
                        <a href="https://www.linkedin.com/in/%D0%B0%D0%BD%D0%B0%D1%81%D1%82%D0%B0%D1%81%D1%96%D1%8F-%D0%BF%D0%BE%D0%BD%D0%BE%D0%BC%D0%B0%D1%80%D0%B5%D0%BD%D0%BA%D0%BE-46260234b/" target="_blank" rel="noopener noreferrer" aria-label={t.linkedinLabel}>
                            <img className="linkedin" src={linkedin} alt={t.linkedinLabel} />
                        </a>
                    </div>
                </div>

                <div id="contact-form" className="contact-form-container">
                    <h2>{t.formTitle}</h2>
                    <form ref={form} onSubmit={sendEmail} className="contact-form" noValidate>
                        <div className="input-group">
                            <div className={`input-wrapper${errors.first_name ? " has-error" : ""}`}>
                                <label htmlFor="first_name">{t.firstNameLabel}</label>
                                <input 
                                    type="text" 
                                    id="first_name" 
                                    name="first_name" 
                                    placeholder={t.firstNamePlaceholder}
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    aria-invalid={Boolean(errors.first_name)}
                                    required
                                />
                            </div>
                            <div className={`input-wrapper${errors.last_name ? " has-error" : ""}`}>
                                <label htmlFor="last_name">{t.lastNameLabel}</label>
                                <input 
                                    type="text" 
                                    id="last_name" 
                                    name="last_name" 
                                    placeholder={t.lastNamePlaceholder}
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    aria-invalid={Boolean(errors.last_name)}
                                    required
                                />
                            </div>
                        </div>

                        <div className={`input-wrapper${errors.user_email ? " has-error" : ""}`}>
                            <label htmlFor="user_email">{t.emailLabel}</label>
                            <input 
                                type="email" 
                                id="user_email" 
                                name="user_email" 
                                placeholder={t.emailPlaceholder}
                                value={formData.user_email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                aria-invalid={Boolean(errors.user_email)}
                                required
                            />
                        </div>

                        <div className={`input-wrapper${errors.message ? " has-error" : ""}`}>
                            <label htmlFor="message">{t.messageLabel}</label>
                            <textarea 
                                id="message" 
                                name="message" 
                                placeholder={t.messagePlaceholder}
                                value={formData.message}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                aria-invalid={Boolean(errors.message)}
                                required
                            ></textarea>
                        </div>

                        <button type="submit">{t.submit}</button>
                        <p className="contact-form-consent">
                            {t.consent}{" "}
                            <a href={translations.privacyPolicyUrl}>
                                {t.consentLink}
                            </a>
                        </p>
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
