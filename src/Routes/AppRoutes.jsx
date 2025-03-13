import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home/Home";

export default function AppRoutes() {

    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    );
}