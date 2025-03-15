import React, { useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import About from "./components/About";
import Services from "./components/Services";
import Footer from "./components/Footer";
import "./styles/header.css";
import "./styles/main.css";
import "./styles/about.css";
import "./styles/experience.css";
import "./styles/footer.css";
import "./styles/services.css";

function App() {
    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);
    }, []);

    return (
        <div>
            <Header />
            <Main />
            <About />
            <Services />
            <Footer />
        </div>
    );
}

export default App;
