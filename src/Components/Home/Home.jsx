import React from "react";
import "./Home.css";
import BannerBackground from "../../Assets/home-banner-background.png";
import GokuVolando from "../../Assets/goku-volando.png";
import { FiArrowRight } from "react-icons/fi";

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-banner-container">
                <div className="home-bannerImage-container">
                    <img src={BannerBackground} alt="" />
                </div>
                <div className="home-text-section">
                    <h1 className="primary-heading">
                        Conoce a los personajes del mundo <br /> de Dragon Ball
                    </h1>
                    <p className="primary-text">
                        Busca tus personajes favoritos de Dragon Ball y descubre toda la información sobre ellos.
                    </p>
                    <button className="secondary-button" onClick={() => window.location.href = "/personajes"}>
                        Buscar personajes <FiArrowRight />{" "}
                    </button>
                </div>
                <div className="home-image-section">
                    <img src={GokuVolando} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Home;
