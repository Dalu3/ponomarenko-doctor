import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import About from "./components/About";
import Services from "./components/Services";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";
import "./styles/header.css";
import "./styles/main.css";
import "./styles/about.css";
import "./styles/experience.css";
import "./styles/footer.css";
import "./styles/services.css";
import "./styles/cookie-banner.css";

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }

        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        document.body.classList.add("app-loading");

        const loaderTimer = window.setTimeout(() => {
            setIsLoading(false);
            document.body.classList.remove("app-loading");
        }, 1000);

        return () => {
            window.clearTimeout(loaderTimer);
            document.body.classList.remove("app-loading");
        };
    }, []);

    return (
        <div>
            {isLoading && (
                <div className="app-loader" aria-hidden="true">
                    <div className="app-loader__inner">
                        <div className="app-loader__ring"></div>
                    </div>
                </div>
            )}
            <Header />
            <Main />
            <About />
            <Services />
            <Footer />
            <CookieBanner />
        </div>
    );
}

export default App;
