import { useState } from "react";
import { mockNotas } from "../mock/Mock";
import { funcNormalize, isDark } from "../mock/constFunction";
import { DARKMODE } from "../mock/constVariable";

const Notas = () => {
  const data = mockNotas;
  const isDarkModeStored = localStorage.getItem("dark") === DARKMODE.TRUE;
  const isClassNameDark = isDark(isDarkModeStored);

  const [notas,setNotas]=useState(data);

  const normalizeString = funcNormalize;

  const handleChangeText = (value) => {
    const normalizedValue = normalizeString(value);
    const newNotas = notas.filter(nota => {
      const normalizedCurso = normalizeString(nota.curso);
      return normalizedCurso.includes(normalizedValue);
      })
      setNotas(newNotas)
      if (value===''){
      setNotas(data)
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
        <table className={"w-100 table text-center overflow-scroll " + isClassNameDark }>
          <thead>
            <tr>
              <th>Id</th>
              <th>Curso</th>
              <th>Nota</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {notas.map((datax) => {
            return(
              <tr key={datax.id}>
                <td>{datax.id}</td>
                <td>{datax.curso}</td>
                <td>{datax.nota}</td>
                <td>{datax.nota>=12? 'APROBADO': 'DESAPROBADO'}</td>
              </tr>)
            })}
          </tbody>
        </table>
        </div>
      </div>
    </>
  );
};
export default Notas;
