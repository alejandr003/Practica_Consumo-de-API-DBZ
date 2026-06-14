import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home/Home";
import DragonBallCarousel from "../Components/DragonBallCarousel/DragonBallCarousel";
import About from "../Components/About/About";
import DetallesDePersonaje from "../Components/Buscador/DetallesDePersonaje";
import NotFound from "../Components/NotFound";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/personajes">
                <Route index element={<DragonBallCarousel />} />
                <Route path=":id" element={<DetallesDePersonaje />} />
            </Route>
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
