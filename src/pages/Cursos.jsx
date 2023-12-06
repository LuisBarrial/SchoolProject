import { useCallback, useEffect, useState } from "react";
import { isDark } from "../mock/constFunction";
import { DARKMODE } from "../mock/constVariable";

const Cursos = () => {
    const isDarkModeStored = localStorage.getItem("dark") === DARKMODE.TRUE;
    const isClassNameDark = isDark(isDarkModeStored);
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
    
    <div>
        <h1>Cursos</h1>
        <table className={"table text-center"+ isClassNameDark }>
        <thead>
              <tr>
                <th>Id</th>
                <th>Curso</th>
                <th>Horas</th>
                <th>Tipo Evaluacion</th>
              </tr>
            </thead>
            <tbody>
            {curso.map((data,idx)=>{return(

<tr key={idx}>
                <td>{idx+1}</td>
                <td>{data.nombre}</td>
                <td>{data.horas}</td>
                <td>{data.tipoEvaluacion}</td>
              </tr>

            )})}
            </tbody>
            </table>
    </div>
    </>)

}
export default Cursos;