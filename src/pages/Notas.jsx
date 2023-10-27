import { useState } from "react";
import { mockNotas } from "../mock/Mock";
import { funcNormalize, isDark } from "../mock/constFunction";
import { DARKMODE } from "../mock/constVariable";

const Notas = () => {
  console.log("render")
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
                    {notas.map((value)=>{
                        return(<>
                        <tr>
                            <th>{value.curso}</th>
                            <td>12</td>
                            <td>11</td>
                            <td>12</td>
                            <td>19</td>
                            <td>12</td>
                            <td>16</td>
                            </tr>
                            </>
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
