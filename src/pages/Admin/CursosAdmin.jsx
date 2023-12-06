import { useCallback, useEffect, useState } from "react";
import { DARKMODE } from "../../mock/constVariable";
import { isDark } from "../../mock/constFunction";
import CardCursosAdmin from "../../components/CardCursoAdmin";
import { showAlertDelete } from "../../components/AlertDelete";

const CursosAdm = () => {
  const uploadData = (id, nombre, horas, tipoEvaluacion, event) => {
    event.preventDefault();
    var data = {};
    data.id = id;
    data.nombre = nombre;
    data.horas = horas;
    data.tipoEvaluacion = tipoEvaluacion;
    console.log(data);
    fetch("http://localhost:8010/curso", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          setAddElement(false)
          fetchDataAndSetCurso();
          return response.text();
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  };

  const Payload = (nombre, horas, tipoEvaluacion) => {
    var data = {};
    data.horas = horas;
    data.tipoEvaluacion = tipoEvaluacion;
    data.nombre = nombre;
    console.log(data);
    fetch("http://localhost:8010/curso", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          fetchDataAndSetCurso();
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  };

  const deleteData = (id) => {
    fetch("http://localhost:8010/curso/" + id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          response.text();
          fetchDataAndSetCurso();
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  };
  async function handlerSubmit(e) {
    e.preventDefault();
    const tipoEvaluacion = document.getElementsByName("tipoEvaluacion")[0].value;
    const horas = document.getElementsByName("horas")[0].value;
    const nombre = document.getElementsByName("nombre")[0].value;
    Payload(nombre, horas, tipoEvaluacion);
    setAddElement(false);
  }

  const isDarkModeStored = localStorage.getItem("dark") === DARKMODE.TRUE;
  const isClassNameDark = isDark(isDarkModeStored);
    const [curso,setCurso]=useState([]);
    const [addElement,setAddElement] = useState(false);
    const [dataUpload,setDataUpload] = useState({});

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
    
    <div>
        <h1>Cursos</h1>
        {addElement && (<>
        
        <CardCursosAdmin
        
        handlerSubmit={dataUpload.id==undefined?handlerSubmit: uploadData}
        isClassNameDark={isClassNameDark}
        dataUpload={dataUpload}
        disableAddElement={function disable(){setAddElement(false)}}


        
        />
        
        </>)}
        <button
            className="mx-1 my-2 btn h-50 d-block btn-info"
            onClick={() => {
              setDataUpload({})
              setAddElement(true);
            }}
          >
            Nuevo
          </button>
        <table className={"table text-center"+ isClassNameDark }>
        <thead>
              <tr>
                <th>Id</th>
                <th>Curso</th>
                <th>Horas</th>
                <th>Tipo Evaluacion</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
            {curso.map((data,idx)=>{return(

<tr key={idx}>
                <td>{idx+1}</td>
                <td>{data.nombre}</td>
                <td>{data.horas}</td>
                <td>{data.tipoEvaluacion}</td>
                <td><div className="d-flex justify-content-evenly">
                      <div className="" id="upload" style={{cursor: 'pointer'}} onClick={()=>{setDataUpload(data);  setAddElement(true);}}>
                      <svg width={20} height={20}  color="#89a9d6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
  </svg></div>
  
      <div className="" id="delete" style={{cursor: 'pointer'}}
      onClick={()=>{showAlertDelete(data.id,deleteData,isClassNameDark)}}
      >   <svg width={20} height={20} color="red" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg></div>
   </div></td>
              </tr>

            )})}
            </tbody>
            </table>
    </div>
    </>)

}
export default CursosAdm;