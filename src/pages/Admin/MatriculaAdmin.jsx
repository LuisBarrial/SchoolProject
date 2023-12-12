import { useCallback, useEffect, useState } from "react";
import { DARKMODE } from "../../mock/constVariable";
import { isDark } from "../../mock/constFunction";


const MatriculaAdmin = () => {

    const isDarkModeStored = localStorage.getItem("dark") === DARKMODE.TRUE;
    const isClassNameDark = isDark(isDarkModeStored);

    const [alumnos, setAlumnos] = useState([]);
    const [grado,setGrado] = useState("5A");
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 2;
    const lasIndex = currentPage * recordsPerPage;
    const firstIndex = 0;
    const records = alumnos.slice(firstIndex, lasIndex);
    const npage = Math.ceil(alumnos.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    function prevPage() {
        if (currentPage !== firstIndex && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      }
    
      function nextPage() {
        if (currentPage !== lasIndex && currentPage < npage) {
          setCurrentPage(currentPage + 1);
        }
      }
      function changeCPage(id) {
        setCurrentPage(id);
      }


    const getColumns = async () => {
        const response = await fetch("http://localhost:8010/matricula?grado="+grado, {
          method: "GET",
        });
        const data = await response.json();
        return data;
      };
      const fetchDataAndSetAlumno = useCallback(async () => {
        const data = await getColumns();
        setAlumnos(data);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [grado]); // No tienes dependencias, ya que no usas ninguna variable externa dentro de la función
    
      useEffect(() => {
        const fetchData = async () => {
          await fetchDataAndSetAlumno();
        };
    
        fetchData();
      }, [fetchDataAndSetAlumno]);

    return(<>
    
        <div>
            <h1>Matriculas</h1>
            <div className="d-flex align-items-center">
            <input id="salon" type="search" className={ "w-50 form-control my-2 " + isClassNameDark} placeholder="Busca por Salon" />
            <button
                className={"mx-1 my-2 btn h-50 d-block btn-info"}
                onClick={()=>{const salon = document.getElementById("salon").value; setGrado(salon)}}
              >
                Buscar
              </button>
              </div>
            <table className={"table text-center"+ isClassNameDark }>
            <thead>
                  <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Grado</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                {records.map((data,idx)=>{return(
    
    <tr key={idx}>
                    <td>{idx+1}</td>
                    <td>{data.nombre}</td>
                    <th>{grado}</th>
                    <td>{data.estado}</td>
                    <td>{data.fecha}</td>
       
                  </tr>
    
                )})}
                </tbody>
                </table>
                <nav className="z-1">
          <ul className="pagination">
            <li className="page-item">
              <a
                href="#"
                className={"page-link " + isClassNameDark}
                onClick={prevPage}
              >
                Prev
              </a>
            </li>
            {numbers.map((n, i) => {
              return (
                <li
                  className={`page-item ${currentPage == n ? " active" : ""}`}
                  key={i}
                >
                  <a
                    href="#"
                    className={"page-link " + isClassNameDark}
                    onClick={() => changeCPage(n)}
                  >
                    {n}
                  </a>
                  <h1></h1>
                </li>
              );
            })}
            <li className="page-item">
              <a
                href="#"
                className={"page-link " + isClassNameDark}
                onClick={nextPage}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
        </div>
        </>)
}

export default MatriculaAdmin;