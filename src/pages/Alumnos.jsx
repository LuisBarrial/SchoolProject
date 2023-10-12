import { useState } from "react";
import { funcNormalize, isDark } from "../mock/constFunction";
import { mockAlumno } from "../mock/Mock";
import { DARKMODE } from "../mock/constVariable";

const Alumnos = () => {
  const data = mockAlumno;
  const isDarkModeStored = localStorage.getItem("dark") === DARKMODE.TRUE;
  const isClassNameDark = isDark(isDarkModeStored);
  const [alumno, setAlumno] = useState(data);
  const [currentPage,setCurrentPage] = useState(1)
  const recordsPerPage = 8;
  const lasIndex = currentPage * recordsPerPage;
  const firstIndex = lasIndex - recordsPerPage;
  const records = alumno.slice(firstIndex, lasIndex);
  const npage = Math.ceil(alumno.length / recordsPerPage )
  const numbers = [...Array(npage + 1).keys()].slice(1)
    


  const normalizeText = funcNormalize;

  const handleChangeText = (value) => {
    var start = Date.now();
    console.log("estoy buscando "+ value)
    const normalizeValue = normalizeText(value);
    const newAlumnos = data.filter((alumnos) => {
      const normalizeAlumnos = normalizeText(alumnos.nombre);
      return normalizeAlumnos.includes(normalizeValue);
    });
    var end = Date.now();
    console.log(end - start);
    setAlumno(newAlumnos);
    if (value === "") {
      setAlumno(data);
    }
  };

  function prevPage(){
    console.log("last" + lasIndex)
    console.log(firstIndex)
    console.log(records)

    console.log("current" +currentPage)
    console.log("npage" +npage)
    if (currentPage !== firstIndex && currentPage>1){
        setCurrentPage(currentPage - 1)
    }

  }

  function nextPage(){

    if (currentPage !== lasIndex && currentPage<npage){
        setCurrentPage(currentPage + 1)

    }


  }
  function changeCPage(id){

    setCurrentPage(id)

  }


  return (
    <>
      <div>
        <h1>Alumnos</h1>
        <div>
          <input
            className={"form-control my-4" + isClassNameDark}
            type="search"
            onChange={(e) => {
              handleChangeText(e.target.value);
            
              console.log(e.target.value)
            }}


            placeholder="Busca un alumno"
          />
        </div>
        <div className="table-responsive" aria-valuetext="tablaAlumnos"  style={{height: "53vh"}}>
          <table
           
            className={
              "w-100 table text-center overflow-scroll " + isClassNameDark
            }
          >
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Genero</th>
                <th>Edad</th>
                <th>Correo</th>
              </tr>
            </thead>
            <tbody>
              {records.map((datax) => {
                return (
                  <tr key={datax.id}>
                    <td>{datax.id}</td>
                    <td>{datax.nombre}</td>
                    <td>{datax.genero}</td>
                    <td>{datax.edad}</td>
                    <td>{datax.correoElectronico}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
        </div>
        <nav >
            <ul className="pagination">
              <li className="page-item">
                <a href="#" className={"page-link "+ isClassNameDark} onClick={prevPage}>Prev</a>
              </li>
              {
                numbers.map((n,i)=>{
                    return(
                    <li className={`page-item ${currentPage == n? ' active' : ''}` }key={i}>
                        <a href="#" className={"page-link "+ isClassNameDark}
                        onClick={()=>changeCPage(n)}
                        >{n}</a>
                        <h1></h1>
                    </li>
                    )
                })
              }
            <li className="page-item">
                <a href="#" className={"page-link "+ isClassNameDark} onClick={nextPage}>Next</a>
              </li>
            </ul>
          </nav>
      </div>
    </>
  );
};

export default Alumnos;
