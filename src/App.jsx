import React from "react";
import Menubar from "./Components/Menubar/Menubar";
import AppRoutes from "./Routes/AppRoutes";

export default function App() {
  return (
    <div>
      <Menubar />
      <AppRoutes />
    </div>
  );
}