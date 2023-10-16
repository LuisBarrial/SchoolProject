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
import { DARKMODE } from "../mock/constVariable";
import AlumnosAdm from "./Admin/AlumnosAdmin";
import PreguntasAdm from "./Admin/PreguntasAdmin";
import NotasAdm from "./Admin/NotasAdmin";

const Dashboard = () => {
  const isDarkModeStored = localStorage.getItem("dark") === DARKMODE.TRUE;
  const [isDarkMode, setIsDarkMode] = useState(isDarkModeStored);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("dark", newDarkMode.toString());
  };


  const [adm, setAdm] = useState(true);  


  const DashboardContent = () => {
    return (
      <>
        <div>
          <h1>Bienvenido Usuario</h1>
        </div>
      </>
    );
  };

  const DashboardContentAdm = () => {
    return (
      <>
        <div>
          <h1>Bienvenido Administrador</h1>
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
            {adm ? <> 
            <Route exact path="*" element={<DashboardContentAdm />} />
            <Route exact path="notas" element={<NotasAdm />} />
            <Route exact path="perfil" element={<Perfil />} />
            <Route exact path="tramites" element={<Tramites />} />
            <Route exact path="cursos" element={<Cursos />} />
            <Route exact path="alumnos" element={<AlumnosAdm />} />
            <Route exact path="horarios" element={<Horarios />} />
            <Route exact path="preguntas" element={<PreguntasAdm />} />
            </> 
            :
            <>
            <Route exact path="*" element={<DashboardContent />} />
            <Route exact path="notas" element={<Notas />} />
            <Route exact path="perfil" element={<Perfil />} />
            <Route exact path="tramites" element={<Tramites />} />
            <Route exact path="cursos" element={<Cursos />} />
            <Route exact path="alumnos" element={<Alumnos />} />
            <Route exact path="horarios" element={<Horarios />} />
            <Route exact path="preguntas" element={<Preguntas/>} />
            </>
            }


          </Routes>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
