import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { getLocaleFromPath, getTranslations } from "./i18n";

const rootElement = document.getElementById("root");
const locale = getLocaleFromPath(window.location.pathname);
document.documentElement.lang = getTranslations(locale).htmlLang;

const app = (
    <React.StrictMode>
        <App locale={locale} />
    </React.StrictMode>
);

if (rootElement.hasChildNodes()) {
    hydrateRoot(rootElement, app);
} else {
    createRoot(rootElement).render(app);
}
