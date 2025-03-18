import React from "react";
import "./About.css";
import BannerBackground from "../../Assets/home-banner-background.png";
import ProfilePic from "../../Assets/yisus-image.png";
import { AiFillStar } from "react-icons/ai";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();

    const handleSubmit = () => {
        Swal.fire({
            title: "Enviado!",
            icon: "success",
            draggable: true
        }).then(() => {
            navigate('/');
        });
    };

    return (
        <div>
            <div className="work-section-wrapper">
                <div className="work-section-top">
                    <h1 className="primary-heading">¿Quién está detras?</h1>
                    <p className="primary-text">
                        Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et
                        elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.
                    </p>
                </div>
                <div className="testimonial-section-bottom">
                    <img src={ProfilePic} alt="" />
                    <p>
                        Desarrollador en aprendizaje continuo y amante de la tecnología.
                        Aplicando conocimientos de React y Node.js para crear aplicaciones
                        web.
                    </p>
                    <div className="testimonials-stars-container">
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                    </div>
                    <h2>Alejandro Chan</h2>
                </div>
            </div>
            <div className="contact-page-wrapper">
                <div className="home-bannerImage-container">
                    <img src={BannerBackground} alt="" />
                </div>
                <h1 className="primary-heading">¿Tienes alguna duda sobre el uso de la API?</h1> <br />
                <h1 className="primary-heading">Dejame ayudarte</h1>
                <div className="contact-form-container">
                    <input type="email" placeholder="yisusDbz@gmail.com" />
                    <button className="secondary-button" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default About;