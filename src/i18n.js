import { createContext, useContext } from "react";

export const DEFAULT_LOCALE = "uk";

export const getLocaleFromPath = (pathname = "/") =>
    /^\/en(\/|$)/.test(pathname) ? "en" : DEFAULT_LOCALE;

const translations = {
    uk: {
        htmlLang: "uk",
        privacyPolicyUrl: "/privacy-policy.html",
        header: {
            nav: {
                about: "Ваш лікар",
                experience: "Досвід",
                services: "Послуги",
            },
            booking: "Запишіться зараз",
            logoAlt: "Логотип лікаря Анастасії Олександрівни Пономаренко",
            openMenu: "Open navigation menu",
            closeMenu: "Close navigation menu",
        },
        main: {
            subtitle: "Педіатр і сімейний лікар у Дніпрі",
            titleFirst: "Пономаренко",
            titleSecond: "Анастасія Олександрівна",
            descriptionFull:
                "Допомагаю дітям і дорослим: прийом за декларацією НСЗУ, приватні й онлайн-консультації, візити додому.",
            descriptionShortFirst: "Приймаю дітей і дорослих:",
            descriptionShortSecond: "за декларацією, онлайн і вдома.",
            button: "Записатися на прийом",
        },
        about: {
            titleStart: "Мене звати ",
            titleName: "Анастасія",
            description:
                "Я лікар-педіатр і лікар загальної практики сімейної медицини. У 2018 році закінчила Дніпропетровську державну медичну академію, пройшла інтернатуру з педіатрії та спеціалізацію із загальної практики сімейної медицини.",
            subtitle:
                "Веду прийом у медичному центрі «Валео» на вул. Робочій, 148 у Дніпрі. Спостерігаю дітей від народження, лікую дорослих і до кожного пацієнта шукаю індивідуальний підхід. Буду рада стати лікарем для всієї вашої родини.",
            instagramLabel: "Instagram лікаря",
            photoAlt: "Пономаренко Анастасія лікар Дніпро",
            experienceImageAlt:
                "Лікар гортає медичний довідник із рентгенівськими знімками",
            experienceTitleStart: "Професійний ",
            experienceTitleWord: "досвід",
            experience: [
                {
                    title: "КНП «МДКЛ 6» ДМР",
                    role: "Посада: Сестра медична дитячого інфекційного відділення",
                },
                {
                    title: "КНП «ДЦПМСД 7» ДМР",
                    role: "Посада: Лікар-педіатр дільничий, сімейний лікар",
                },
                {
                    title: "КЗ «Дніпропетровський ДБІ» ДОР",
                    role: "Посада: Лікар-педіатр",
                },
                {
                    title: "ТОВ «Валеолайф»",
                    role: "Посада: Лікар загальної практики сімейної медицини",
                },
            ],
        },
        services: {
            titleLeft: "Як я можу допомогти ",
            titleRight: "вам і вашій родині?",
            items: [
                {
                    title: "Безкоштовний прийом за декларацією НСЗУ",
                    description:
                        'Прийом у медичному центрі "Валео" за адресою: вул. Робоча, 148.',
                },
                {
                    title: "Приватна консультація без декларації",
                    description:
                        "Можливість отримати консультацію без укладення декларації.",
                },
                {
                    title: "Онлайн-консультація лікаря",
                    description:
                        "Консультації для пацієнтів, які не можуть прийти на особисту зустріч.",
                },
                {
                    title: "Виклик лікаря додому у Дніпрі",
                    description:
                        "Надання професійної допомоги вдома для вашого комфорту та зручності.",
                },
            ],
        },
        faq: {
            title: "Поширені запитання",
            imageAlt: "Лікар читає медичну книгу в кріслі",
            // Чернетка відповідей: перед публікацією їх має переглянути лікарка.
            items: [
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
                    answer: "Онлайн-консультації доступні з 9:00 до 20:00. Напишіть нам через форму на сайті, і ми домовимося про зручний час.",
                },
                {
                    question: "Чи можна викликати лікаря додому?",
                    answer: "Так, консультації вдома проводяться в межах Дніпра за попередньою домовленістю.",
                },
                {
                    question: "Який графік прийому в медичному центрі?",
                    answer: "Понеділок, середа, п’ятниця: 9:00–13:00. Вівторок, четвер: 14:00–18:00.",
                },
            ],
        },
        footer: {
            hoursTitle: "Робочі години",
            scheduleWeekdaysA: "Понеділок, середа, п’ятниця",
            scheduleWeekdaysB: "Вівторок, четвер",
            scheduleOnline: "Онлайн-консультації",
            homeNote:
                "Консультації на дому проводяться за попередньою домовленістю.",
            addressTitle: "Адреса та запис",
            clinicName: "Медичний центр «Валео»",
            street: "вул. Робоча, 148, Дніпро",
            openMap: "Відкрити на карті",
            bookHelsi: "Записатися через Helsi",
            instagramLabel: "Instagram Анастасії Пономаренко",
            linkedinLabel: "LinkedIn Анастасії Пономаренко",
            formTitle: "Залиште повідомлення",
            firstNameLabel: "Ім’я *",
            firstNamePlaceholder: "Вкажіть ім’я",
            lastNameLabel: "Прізвище *",
            lastNamePlaceholder: "Вкажіть прізвище",
            emailLabel: "Пошта *",
            emailPlaceholder: "Вкажіть email",
            messageLabel: "Повідомлення *",
            messagePlaceholder: "Напишіть повідомлення",
            submit: "Надіслати",
            consent:
                "Натискаючи кнопку, ви надаєте згоду на обробку персональних даних згідно з",
            consentLink: "Політики конфіденційності",
            success: "Ваше повідомлення успішно надіслано!",
            error: "Помилка відправлення. Будь ласка, спробуйте ще раз.",
        },
        cookie: {
            label: "Повідомлення про cookies",
            eyebrow: "Файли cookie",
            text: "Ми використовуємо cookies, щоб сайт працював стабільно, запам’ятовував ваші налаштування та допомагав нам покращувати досвід користування.",
            reject: "Відхилити",
            accept: "Прийняти",
        },
    },
    en: {
        htmlLang: "en-GB",
        privacyPolicyUrl: "/en/privacy-policy.html",
        header: {
            nav: {
                about: "Your doctor",
                experience: "Experience",
                services: "Services",
            },
            booking: "Book now",
            logoAlt: "Logo of Dr Anastasiia Ponomarenko",
            openMenu: "Open navigation menu",
            closeMenu: "Close navigation menu",
        },
        main: {
            subtitle: "Paediatrician and family doctor in Dnipro",
            titleFirst: "Ponomarenko",
            titleSecond: "Anastasiia",
            descriptionFull:
                "I care for children and adults: appointments under an NHSU declaration, private and online consultations, and home visits.",
            descriptionShortFirst: "I see children and adults:",
            descriptionShortSecond: "with a declaration, online and at home.",
            button: "Book an appointment",
        },
        about: {
            titleStart: "My name is ",
            titleName: "Anastasiia",
            description:
                "I am a paediatrician and a general practitioner in family medicine. I graduated from Dnipropetrovsk State Medical Academy in 2018, then completed an internship in paediatrics and specialist training in general practice and family medicine.",
            subtitle:
                "I see patients at the Valeo Medical Centre, 148 Robocha Street, Dnipro. I look after children from birth, treat adults and take an individual approach with every patient. I would be delighted to become your whole family’s doctor.",
            instagramLabel: "Doctor’s Instagram",
            photoAlt: "Anastasiia Ponomarenko, doctor in Dnipro",
            experienceImageAlt:
                "Doctor leafing through a medical reference book with X-ray images",
            experienceTitleStart: "Professional ",
            experienceTitleWord: "experience",
            experience: [
                {
                    title: "City Children’s Clinical Hospital No. 6, Dnipro",
                    role: "Position: Nurse, Paediatric Infectious Diseases Department",
                },
                {
                    title: "Primary Health Care Centre No. 7, Dnipro",
                    role: "Position: District paediatrician, family doctor",
                },
                {
                    title: "Dnipropetrovsk Children’s Residential Care Home",
                    role: "Position: Paediatrician",
                },
                {
                    title: "Valeolife LLC",
                    role: "Position: General practitioner in family medicine",
                },
            ],
        },
        services: {
            titleLeft: "How can I help ",
            titleRight: "you and your family?",
            items: [
                {
                    title: "Free NHSU appointments with a signed declaration",
                    description:
                        "Appointments at the Valeo Medical Centre, 148 Robocha Street.",
                },
                {
                    title: "Private consultation without a declaration",
                    description:
                        "An opportunity to see the doctor without having to sign a declaration.",
                },
                {
                    title: "Online consultation with a doctor",
                    description:
                        "Consultations for patients who are unable to attend in person.",
                },
                {
                    title: "Home visits in Dnipro",
                    description:
                        "Professional medical care at home for your comfort and convenience.",
                },
            ],
        },
        faq: {
            title: "Frequently asked questions",
            imageAlt: "Doctor reading a medical book in an armchair",
            items: [
                {
                    question:
                        "Can I have a consultation without signing a declaration?",
                    answer: "Yes. If you would rather not sign a declaration, you can book a private consultation.",
                },
                {
                    question: "Do you see only children, or adults as well?",
                    answer: "I am a paediatrician and a general practitioner in family medicine, so I see both children and adults. Your whole family can be seen by the same doctor.",
                },
                {
                    question: "How does an online consultation work?",
                    answer: "Online consultations are available from 9:00 to 20:00. Write to us using the form on this website, and we will arrange a time that suits you.",
                },
                {
                    question: "Can I request a home visit?",
                    answer: "Yes, home visits are available within Dnipro by prior arrangement.",
                },
                {
                    question: "What are the surgery hours at the medical centre?",
                    answer: "Monday, Wednesday, Friday: 9:00–13:00. Tuesday, Thursday: 14:00–18:00.",
                },
            ],
        },
        footer: {
            hoursTitle: "Opening hours",
            scheduleWeekdaysA: "Monday, Wednesday, Friday",
            scheduleWeekdaysB: "Tuesday, Thursday",
            scheduleOnline: "Online consultations",
            homeNote: "Home visits are available by prior arrangement.",
            addressTitle: "Address and booking",
            clinicName: "Valeo Medical Centre",
            street: "148 Robocha Street, Dnipro",
            openMap: "View on the map",
            bookHelsi: "Book via Helsi",
            instagramLabel: "Anastasiia Ponomarenko on Instagram",
            linkedinLabel: "Anastasiia Ponomarenko on LinkedIn",
            formTitle: "Leave a message",
            firstNameLabel: "First name *",
            firstNamePlaceholder: "Enter your first name",
            lastNameLabel: "Surname *",
            lastNamePlaceholder: "Enter your surname",
            emailLabel: "Email *",
            emailPlaceholder: "Enter your email",
            messageLabel: "Message *",
            messagePlaceholder: "Write your message",
            submit: "Send",
            consent:
                "By clicking the button, you consent to the processing of your personal data in accordance with the",
            consentLink: "Privacy Policy",
            success: "Your message has been sent successfully!",
            error: "Your message could not be sent. Please try again.",
        },
        cookie: {
            label: "Cookie notice",
            eyebrow: "Cookies",
            text: "We use cookies to keep the website running smoothly, remember your preferences and help us improve your experience.",
            reject: "Reject",
            accept: "Accept",
        },
    },
};

export const getTranslations = (locale) =>
    translations[locale] || translations[DEFAULT_LOCALE];

export const LocaleContext = createContext(DEFAULT_LOCALE);

export const useTranslations = () => getTranslations(useContext(LocaleContext));
