import { useCallback, useContext, useEffect, useState } from "react";
import { funcNormalize, isDark } from "../mock/constFunction";
import { DARKMODE } from "../mock/constVariable";
import { DataContext } from "../Hook/Context";

const Alumnos = () => {
  const isDarkModeStored = localStorage.getItem("dark") === DARKMODE.TRUE;
  const isClassNameDark = isDark(isDarkModeStored);
  const [alumno, setAlumno] = useState([]);
  const [auxalumno, setAuxAlumno] = useState([]);
  const [currentPage,setCurrentPage] = useState(1)
  const recordsPerPage = 8;
  const lasIndex = currentPage * recordsPerPage;
  const firstIndex = lasIndex - recordsPerPage;
  const records = alumno.slice(firstIndex, lasIndex);
  const npage = Math.ceil(alumno.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
    

  const {contextData} = useContext(DataContext);


  const fetchDataAndSetAlumno = useCallback(async () => {
    const getColumns = async () => {
      const response = await fetch("http://localhost:8010/estudiante/grado?grado="+contextData.grado, {
        method: "GET",
      });
      const data = await response.json();
      return data;
    };
  
    const data = await getColumns();
    setAlumno(data);
    setAuxAlumno(data);
    return data;
  }, [contextData.grado]);
  
  useEffect(() => {
    const fetchData = async () => {
      await fetchDataAndSetAlumno();
    };

    fetchData();
  }, [fetchDataAndSetAlumno]);


  
  const normalizeText = funcNormalize;

  const handleChangeText = (value) => {
    const normalizeValue = normalizeText(value);
    const newAlumnos = alumno.filter((alumnos) => {
      const normalizeAlumnos = normalizeText(alumnos.nombre);
      return normalizeAlumnos.includes(normalizeValue);
    });
    setAlumno(newAlumnos);
    if (value === "") {
      setAlumno(auxalumno);
    }
  };
  function prevPage(){

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
              "w-100 table text-center overflow-scroll "+ isClassNameDark
            }
          >
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Grado</th>
                <th>Correo</th>
              </tr>
            </thead>
            <tbody>
              {records.map((datax,idx) => {
                return (
                  <tr key={datax.id}>
                    <td>{idx+1}</td>
                    <td>{datax.nombre}</td>
                    <td>{datax.grado}</td>
                    <td>{datax.correo}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
        </div>
        <nav >
            <ul className="pagination z-1">
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
