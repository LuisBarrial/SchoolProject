import { Route, Routes } from "react-router-dom";
import SlideBar from "../components/Slidebar";
import Notas from "./Notas";
import Perfil from "./Perfil";
import Tramites from "./Tramites";
import Cursos from "./Cursos";
import Horarios from "./Horarios";
import Alumnos from "./Alumnos";
import Preguntas from "./Preguntas";
import { DARKMODE } from "../mock/constVariable";
import AlumnosAdm from "./Admin/AlumnosAdmin";
import PreguntasAdm from "./Admin/PreguntasAdmin";
import NotasAdm from "./Admin/NotasAdmin";
import Pago from "./Pago";
import Profesores from "./Profesores";
import imgadmincontent from "../assets/imageadministratorcontent.webp";
import imgusercontent from "../assets/BetterImageCollege.webp";
import CursosAdm from "./Admin/CursosAdmin";
import TramiteAdmin from "./Admin/TramiteAdmin";
import ProfesoresAdmin from "./Admin/ProfesoresAdmin";
import { useContext, useEffect, useState } from "react";
import MatriculaAdmin from "./Admin/MatriculaAdmin";
import { DataContext } from "../Hook/Context";
import { jwtDecode } from "jwt-decode";
import HorariosAdmin from "./Admin/HorariosAdmin";
import Clave from "./Clave";

const Dashboard = () => {
  const isDarkModeStored = localStorage.getItem("dark") === DARKMODE.TRUE;
  const [isDarkMode, setIsDarkMode] = useState(isDarkModeStored);
  const toggleDarkMode = () => {            
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("dark", newDarkMode.toString());
  };

  const [about, setAbout] = useState(false);

  const {setContextData} = useContext(DataContext);




  useEffect(()=>{
    const token = localStorage.getItem("jwt");
    if(token){
        const decoded = jwtDecode(token);
        setContextData(decoded)
        if(decoded.rol=="ADMIN") setAdm(true);
        else {
          fetch("http://localhost:8010/estudiante/find?id="+decoded.id)
          .then((response)=>{return response.json()}).then(data => decoded.grado=data.grado)
          setContextData(decoded)
          console.log(decoded); 
        }
      
    }
    
  
},[setContextData])


  const [adm, setAdm] = useState(false);

  const DashboardContent = () => {
    return (
      <>
        <div>
          <h1>Bienvenido</h1>
        </div>
        <div
            className="w-95 h-100 rounded-2 p-5 m-3 d-flex align-items-center text-center flex-wrap-reverse flex-md-nowrap  flex-md-row"
            style={
              isDarkMode ? { background: "#2f3236" } : { background: "white" }
            }
          >
          <div  className="mt-4 d-flex align-items-center" style={{width: "100%", height: "70vh"}}>
          <h2>Realiza un seguimiento a tus notas y muchas cosas más!</h2>

          <img
                      

                rel="preload"
                className="h-100 w-50 position-relative d-block ms-auto rounded-3"
                src={imgusercontent}
              ></img>
          </div>
        </div>

      </>
    );
  };

  const DashboardContentAdm = () => {
    return (
      <>
        <div className="flex-column">
          {about && (
            <div
              className="position-absolute z-1 w-100 h-100 end-0 top-0"
              style={{ backgroundColor: "#36433e85" }}
              onClick={()=>{setAbout(false)}}
            >
              <div className="card col-7 col-md-4 z-4 position-absolute" onClick={(e)=>{e.stopPropagation()}} style={{top:'100px',left:'120px'}}> 
                <div className="card-body">
                <h5 className="card-title text-dark">Utiliza la barra de navegacion</h5>
                <p className="card-text text-dark">
                  Puedes Seleccionar los modulos que quieres visualizar Para obtener mayor informacion del modulo haga click en el icono {">"} 
                </p>
                </div>
                <button type="button" className="btn p-2" onClick={()=>{setAbout(false)}} style={{ background: "#F19C79" }}>Cerrar</button>
              </div>
            </div>
          )}

          <h1>Bienvenido</h1>
          <div
            className="w-95 h-100 rounded-2 p-5 m-3 d-flex align-items-center text-center flex-wrap-reverse flex-md-nowrap  flex-md-row"
            style={
              isDarkMode ? { background: "#2f3236" } : { background: "white" }
            }
          >
            <div>
              <h2>Ahora podra administrar su colegio desde la pagina web!</h2>
              <a
                href="#elemento"
                onClick={() => {
                  setAbout(true);
                }}
                className="btn p-2 mt-3"
                style={{ background: "#F19C79" }}
              >
                Conozca más
              </a>
            </div>
            <img
              rel="preload"
              className="img-admin position-relative d-block ms-auto"
              src={imgadmincontent}
            ></img>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div
        className={` d-flex flex-column flex-md-row ${isDarkMode && "bg-dark"}`}
        style={{
          backgroundColor: "#e4e9f7",
        }} /** codigo del background del contenido **/
      >
        <SlideBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <div
          className={`w-100 h-100 min-vh-100 overflow-hidden dashboardcontent ${
            isDarkMode ? "text-light" : ""
          }`}
        >
          <Routes>
            {adm ? (
              <>
                <Route exact path="*" element={<DashboardContentAdm />} />
                <Route exact path="notas" element={<NotasAdm />} />
                <Route exact path="perfil" element={<Perfil />} />
                <Route exact path="tramites" element={<TramiteAdmin/>} />
                <Route exact path="cursos" element={<CursosAdm/>} />
                <Route exact path="alumnos" element={<AlumnosAdm />} />
                <Route exact path="horarios" element={<HorariosAdmin/>} />
                <Route exact path="preguntas" element={<PreguntasAdm />} />
                <Route exact path="matricula" element={<MatriculaAdmin />} />
                <Route exact path="profesor" element={<ProfesoresAdmin />} />
              </>
            ) : (
              <>
                <Route exact path="*" element={<DashboardContent />} />
                <Route exact path="notas" element={<Notas />} />
                <Route exact path="profesor" element={<Profesores />} />
                <Route exact path="perfil" element={<Perfil />} />
                <Route exact path="tramites" element={<Tramites />} />
                <Route exact path="cursos" element={<Cursos />} />
                <Route exact path="matricula" element={<Pago />} />
                <Route exact path="alumnos" element={<Alumnos />} />
                <Route exact path="horarios" element={<Horarios />} />
                <Route exact path="preguntas" element={<Preguntas />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
