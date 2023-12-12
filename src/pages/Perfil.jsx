import { useContext } from "react";
import CenterCard from "../components/CenterCard";
import { DataContext } from "../Hook/Context";
import { DARKMODE } from "../mock/constVariable";
import { isDark } from "../mock/constFunction";
import { useNavigate } from "react-router-dom";

const Perfil = () => {

    const isDarkModeStored = localStorage.getItem("dark") === DARKMODE.TRUE;
    const isClassNameDark = isDark(isDarkModeStored);
    const navigate = useNavigate();
    const {contextData} = useContext(DataContext);

    const token = localStorage.getItem("jwt");
    const enc = (window.btoa((encodeURIComponent(token))));

    return(<>   
    <h1>Perfil
    </h1>
    <div className="d-flex align-items-center flex-wrap">
       <CenterCard>
            <div className={" card text-center"+ isClassNameDark}>
                <div className=" card-title">
                    <h3>{contextData.nombre}</h3>
                </div>
                <div className="card-body">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-circle" width="100" height="100" viewBox="0 0 24 24" stroke-width="1" stroke="#00bfd8" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
  <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
  <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
</svg>
            <h4>{contextData.correo}</h4>
            <h4>{contextData.rol}</h4>
            {contextData.grado && <h4>{contextData.grado}</h4>}
            <button className="btn btn-info" onClick={()=>{navigate(`/password?inf=${enc}`)}}>Solicitud de Cambio de Clave</button>
                </div>
            </div>
       </CenterCard>
    </div>
    </>)

}
export default Perfil;