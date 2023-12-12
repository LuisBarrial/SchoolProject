import { useCallback, useContext, useEffect, useState } from "react";
import { funcNormalize, isDark } from "../mock/constFunction";
import { DARKMODE } from "../mock/constVariable";
import { DataContext } from "../Hook/Context";

const Notas = () => {
  console.log("render")
  const isDarkModeStored = localStorage.getItem("dark") === DARKMODE.TRUE;
  const isClassNameDark = isDark(isDarkModeStored);

  const [notas,setNotas]=useState([]);
  const [auxNotas,setAuxNotas]=useState([]);
  const {contextData} = useContext(DataContext);


  const getColumns = async () => {
    const response = await fetch("http://localhost:8010/notas?idEstudiante="+contextData.id, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  };
  const fetchDataAndSetNotas = useCallback(async () => {
    const data = await getColumns();
    setNotas(data);
    setAuxNotas(data);
  }, []); // No tienes dependencias, ya que no usas ninguna variable externa dentro de la función

  useEffect(() => {
    const fetchData = async () => {
      await fetchDataAndSetNotas();
    };

    fetchData();
  }, [fetchDataAndSetNotas]);


  const normalizeString = funcNormalize;

  const handleChangeText = (value) => {
    const normalizedValue = normalizeString(value);
    const newNotas = notas.filter(nota => {
      const normalizedCurso = normalizeString(nota.curso);
      return normalizedCurso.includes(normalizedValue);
      })
      setNotas(newNotas)
      if (value===''){
      setNotas(auxNotas)
      }

  }

  return (
    <>
      <div>
        <h1>Notas</h1>
        <div>
          <input className={"form-control my-4" + isClassNameDark } type="search" onChange={(e)=>{handleChangeText(e.target.value)}} placeholder="Busca un curso"/>
        </div>
        <div className="table-responsive">
        <table className={"table text-center"+ isClassNameDark }>
            <thead>
                <tr>
                    <th>Curso</th>
                    <th>E1</th>
                    <th>E2</th>
                    <th>R1</th>
                    <th>E3</th>
                    <th>EF</th>
                    <th>RF</th>

                </tr>
            </thead>
            <tbody>
                    {notas.map((value,idx)=>{
                        return(
                        <tr key={idx+1}>
                            <th >{value.curso.nombre}</th>
                            <td>12</td>
                            <td>11</td>
                            <td>12</td>
                            <td>19</td>
                            <td>12</td>
                            <td>16</td>
                            </tr>
                            
                        )
                    })}


            </tbody>
        </table>
        </div>
      </div>
    </>
  );
};
export default Notas;
