import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";

const CardProfesorAdmin = ({isClassNameDark, handlerSubmit, dataUpload,disableAddElement}) => {

    const [nombre,setNombre] = useState(dataUpload.nombre);
    const [area,setArea] = useState(dataUpload.area)
    const [curso,setCurso]=useState([]);
    
    const getColumns = async () => {
        const response = await fetch("http://localhost:8010/curso", {
          method: "GET",
        });
        const data = await response.json();
        return data;
      };
      const fetchDataAndSetCurso = useCallback(async () => {
        const data = await getColumns();
        setCurso(data);
      }, []); // No tienes dependencias, ya que no usas ninguna variable externa dentro de la función
    
      useEffect(() => {
        const fetchData = async () => {
          await fetchDataAndSetCurso();
        };
    
        fetchData();
      }, [fetchDataAndSetCurso]);


    return(<>
    <div
            className={
              "z-3 position-absolute top-50 start-50 p-2 card intentdarkmode p-3 col-8 col-md-4 d-flex justify-content-center " +
              isClassNameDark
            }
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <span className="h1 position-absolute top-0" style={{cursor:'pointer'}} onClick={()=>{disableAddElement()}}>X</span>
            <form
              id="formElement"
              className="p-3 d-flex justify-content-center text-center flex-column "
              onSubmit={(e)=>{dataUpload.id==undefined? handlerSubmit(e) : handlerSubmit(dataUpload.id,nombre,area,e)}}
            >
              <fieldset className=" d-flex flex-column justify-content-center">
                <legend>{ dataUpload.dni==undefined? "Agregar Nuevo Profesor": "Modificar Profesor"}</legend>
                <label className="m-2" >
                  Ingrese nuevo nombre
                  <br />
                  <input
                    type="text"
                    name="nombre"
                    defaultValue={dataUpload.nombre}
                    onChange={(e)=>{setNombre(e.target.value)}}
                    className="text-center input-group m-auto w-75"
                  ></input>
                </label>
                <label className="m-2" >
                  Ingrese nuevo DNI
                  <br />
                  <input
                    type="text"
                    required 
                    pattern="^\d{8}$"
                    title="Ingresa un DNI válido (8 dígitos numéricos)"
                    name="dni"
                    disabled={dataUpload.dni==undefined? false: true}
                    value={dataUpload.dni}
                    className="text-center input-group m-auto w-75"
                  ></input>
                </label>
                <label className="m-2" >
                  Ingrese nuevo Area
                  <br />
                  <select
                    type=""
                    name="area"
                    className="text-center input-group m-auto w-75"
                    onChange={(e)=>{setArea(e.target.value)}}
                    defaultValue={dataUpload.area}
                  
                  >
                    {curso.map((data,idx)=>{return(<option key={idx}>{data.nombre}</option>)})}

                  </select>
                </label>
                <label className="m-2" >
                  Ingrese nuevo correo
                  <br />
                  <input
                    type="email"
                    name="correo"
                    disabled={dataUpload.correo==undefined? false: true}
                    value={dataUpload.correo}
                    className="text-center input-group m-auto w-75"
                  ></input>
                </label>
              </fieldset>
              <button
                type="submit"
                className=" d-block m-auto mt-3 btn btn-info w-50"
                onClick={console.log(nombre,area)}
              >
                Agregar
              </button>
            </form>
          </div>
    </>)
}

export default CardProfesorAdmin;

CardProfesorAdmin.propTypes = {
    handlerSubmit: PropTypes.func,
    isClassNameDark: PropTypes.string,
    dataUpload: PropTypes.object,
    disableAddElement: PropTypes.func
}