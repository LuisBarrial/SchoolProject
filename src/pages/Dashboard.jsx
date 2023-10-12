import { Route, Routes } from "react-router-dom";
import SlideBar from "../components/Slidebar";
import Notas from "./Notas";
import Perfil from "./Perfil";
import Tramites from "./Tramites";
import Cursos from "./Cursos";
import Horarios from "./Horarios";
import { useState } from "react";
import Alumnos from "./Alumnos";
import Preguntas from "./Preguntas";

const Dashboard = () => {
  const isDarkModeStored = localStorage.getItem("dark") === "true";
  const [isDarkMode, setIsDarkMode] = useState(isDarkModeStored);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("dark", newDarkMode.toString());
  };



  const DashboardContent = () => {
    return (
      <>
        <div>
          <h1>Bienvenido Usuario</h1>
        </div>
      </>
    );
  };

  return (
    <>
      <div
        className={` d-flex ${isDarkMode && "bg-dark"}`}
        style={{ backgroundColor: "#e4e9f7" }} /** codigo del background del contenido **/
      >
        <SlideBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <div className={`m-3 w-100 overflow-hidden ${isDarkMode ? "text-light" : ""}`}>
          <Routes>
            <Route exact path="*" element={<DashboardContent />} />
            <Route exact path="notas" element={<Notas />} />
            <Route exact path="perfil" element={<Perfil />} />
            <Route exact path="tramites" element={<Tramites />} />
            <Route exact path="cursos" element={<Cursos />} />
            <Route exact path="alumnos" element={<Alumnos />} />
            <Route exact path="horarios" element={<Horarios />} />
            <Route exact path="preguntas" element={<Preguntas />} />

          </Routes>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
