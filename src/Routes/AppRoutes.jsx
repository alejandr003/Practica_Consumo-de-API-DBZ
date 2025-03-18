import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home/Home";
import DragonBallCarousel from "../Components/DragonBallCarousel/DragonBallCarousel";
import About from "../Components/About/About";
import DetallesDePersonaje from "../Components/Buscador/DetallesDePersonaje";

export default function AppRoutes() {
    
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                
                <Route path="/personajes">
                <Route index element={<DragonBallCarousel />} />
                <Route path=":id" element={<DetallesDePersonaje />} />
                </Route>
                <Route path="/about" element={<About />} />
            </Routes>
        </div>
    );
}