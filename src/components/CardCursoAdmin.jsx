import PropTypes from "prop-types";
import { useState } from "react";

const CardCursosAdmin = ({isClassNameDark, handlerSubmit, dataUpload,disableAddElement}) => {

    const [nombre,setNombre] = useState(dataUpload.nombre);
    const [horas,setHoras] = useState(dataUpload.horas);
    const [tipoEvaluacion,setTipoEvaluacion] = useState(dataUpload.tipoEvaluacion);


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
              onSubmit={(e)=>{dataUpload.id==undefined? handlerSubmit(e) : handlerSubmit(dataUpload.id,nombre,horas,tipoEvaluacion,e)}}
            >
              <fieldset className=" d-flex flex-column justify-content-center">
                <legend>{ dataUpload.nombre==undefined? "Agregar Nuevo Curso": "Modificar Curso"}</legend>
                <label className="m-2" >
                  Ingrese nuevo nombre de Curso
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
                  Ingrese nuevas horas
                  <br />
                  <input
                    type="number"
                    required 
                    pattern="^\d{2}$"
                    title="Ingresa un DNI válido (8 dígitos numéricos)"
                    name="horas"
                    defaultValue={dataUpload.horas}
                    onChange={(e)=>setHoras(e.target.value)}
                    className="text-center input-group m-auto w-75"
                  ></input>
                </label>
                <label className="m-2" >
                  Ingrese nueva forma de Evaluacion
                  <br />
                  <input
                    type="text"
                    name="tipoEvaluacion"
                    defaultValue={dataUpload.tipoEvaluacion}
                    onChange={(e)=>setTipoEvaluacion(e.target.value)}
                    className="text-center input-group m-auto w-75"
                  ></input>
                </label>
              </fieldset>
              <button
                type="submit"
                className=" d-block m-auto mt-3 btn btn-info w-50"
              >
                Agregar
              </button>
            </form>
          </div>
    </>)
}

export default CardCursosAdmin;

CardCursosAdmin.propTypes = {
    handlerSubmit: PropTypes.func,
    isClassNameDark: PropTypes.string,
    dataUpload: PropTypes.object,
    disableAddElement: PropTypes.func
}