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

        const MIN_LOADER_MS = 1000; // loader is shown at least this long
        const MAX_LOADER_MS = 10000; // safety cap if some resource hangs

        let cancelled = false;
        let maxTimer;

        const minDelay = new Promise((resolve) =>
            window.setTimeout(resolve, MIN_LOADER_MS)
        );

        // Resolves when all images, styles and scripts have loaded
        const pageLoaded = new Promise((resolve) => {
            if (document.readyState === "complete") {
                resolve();
            } else {
                window.addEventListener("load", resolve, { once: true });
            }
        });

        const fontsLoaded =
            document.fonts && document.fonts.ready
                ? document.fonts.ready.catch(() => {})
                : Promise.resolve();

        const ready = Promise.all([minDelay, pageLoaded, fontsLoaded]);
        const safetyCap = new Promise((resolve) => {
            maxTimer = window.setTimeout(resolve, MAX_LOADER_MS);
        });

        Promise.race([ready, safetyCap]).then(() => {
            if (cancelled) return;
            window.clearTimeout(maxTimer);
            setIsLoading(false);
            document.body.classList.remove("app-loading");
        });

        return () => {
            cancelled = true;
            window.clearTimeout(maxTimer);
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
