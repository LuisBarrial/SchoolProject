import { useContext } from "react";
import { isDark } from "../mock/constFunction";
import { DARKMODE } from "../mock/constVariable";
import { DataContext } from "../Hook/Context";
import imagebg from "../assets/sl_043021_42650_01.webp";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Clave = () =>{

    const isDarkModeStored = localStorage.getItem("dark") === DARKMODE.TRUE;
    const isClassNameDark = isDark(isDarkModeStored);
    const navigate=useNavigate();

    const {contextData} = useContext(DataContext);
    function validatePassword(e){
        e.preventDefault();
      const clave1 =  document.getElementById("clave1").value;
      const clave2 =  document.getElementById("clave2").value;
        if(clave1==clave2) {setclave(contextData.id,clave1); 
            Swal.fire("Felicidades","la clave se ha modificado correctamente","success")
            .then((e)=>{ if (e.isConfirmed) navigate("/login")});
        }
        else Swal.fire('Error',"Las claves no son iguales","error")
    }
    
    
    const setclave = async (id,clave)=>{
        const response = await fetch(`http://localhost:8010/usuario?id=${id}&clave=${clave}`,{
            method: 'PUT'})
        if(response.ok && response){
            return response.text();
        }
        else return "NO HAY CONEXION";
    }

    return(<>
    <div className="vw-100 vh-100" style={{background: `url(${imagebg})`,backgroundSize: 'cover'}}>
        <div
        className={
          "position-absolute d-block flex-column justify-content-center col-9 col-md-6 col-lg-6 col-xl-4 pt-2  top-50 start-50 z-3 " +
          isClassNameDark
        }
        style={{
          backgroundColor: "#dedede",
          transform: "translate(-50%,-50%)",
          borderRadius: "10px 10px",
        }}
      >
        <div className="text-center">
            <h4>Usuario {contextData.correo}</h4>
            <form>
                <label>
                    <input type="password" id="clave1" className="my-3 p-1 rounded-2" placeholder="Ingrese nueva clave"></input>
                    <br/>
                    <input type="password" id="clave2" className="my-3 p-1 rounded-2" placeholder="vuelve a escribir la nueva clave"></input>
                </label>
                <br/>
                <span className={isClassNameDark} style={{userSelect:'none'}}>*Recuerda utilizar una clave que puedas recordar</span>
                <br/>
                <button className="my-3 btn btn-primary" onClick={(e)=>{validatePassword(e)}}>Guardar</button>
            </form>
        </div>

      </div>
      </div>
    </>)
}
export default Clave;