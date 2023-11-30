import PropTypes from "prop-types";
import { useState } from "react";

const CardAlumnoAdmin = ({isClassNameDark, handlerSubmit, dataUpload,disableAddElement}) => {

    const [nombre,setNombre] = useState(dataUpload.nombre);
    const [grado,setGrado] = useState(dataUpload.grado)

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
              onSubmit={(e)=>{dataUpload.id==undefined? handlerSubmit(e) : handlerSubmit(dataUpload.id,nombre,grado,e)}}
            >
              <fieldset className=" d-flex flex-column justify-content-center">
                <legend>{ dataUpload.dni==undefined? "Agregar Nuevo Alumno": "Modificar Alumno"}</legend>
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
                  Ingrese nuevo Grado
                  <br />
                  <input
                    type="text"
                    name="grado"
                    className="text-center input-group m-auto w-75"
                    onChange={(e)=>{setGrado(e.target.value)}}
                    defaultValue={dataUpload.grado}
                  ></input>
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
                onClick={console.log(nombre,grado)}
              >
                Agregar
              </button>
            </form>
          </div>
    </>)
}

export default CardAlumnoAdmin;

CardAlumnoAdmin.propTypes = {
    handlerSubmit: PropTypes.func,
    isClassNameDark: PropTypes.string,
    dataUpload: PropTypes.object,
    disableAddElement: PropTypes.func
}