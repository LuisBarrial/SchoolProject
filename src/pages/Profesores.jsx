import { useCallback, useEffect, useState } from "react";
import { funcNormalize, isDark } from "../mock/constFunction";
import { DARKMODE } from "../mock/constVariable";
import CardProfesorAdmin from "../components/CardProfesorAdmin";
import { showAlertDelete } from "../components/AlertDelete";

const Profesores = () => {

  const getColumns = async () => {
    const response = await fetch("http://localhost:8010/profesor", {
      method: "GET",
    });
    const data = await response.json();
    return data;
  };
  const fetchDataAndSetProfesor = useCallback(async () => {
    const data = await getColumns();
    setProfesor(data);
    setAuxProfeso(data);
  }, []); // No tienes dependencias, ya que no usas ninguna variable externa dentro de la función

  useEffect(() => {
    const fetchData = async () => {
      await fetchDataAndSetProfesor();
    };

    fetchData();
  }, [fetchDataAndSetProfesor]);

    const isDarkModeStored = localStorage.getItem("dark") === DARKMODE.TRUE;
    const isClassNameDark = isDark(isDarkModeStored);
    const [profesor, setProfesor] = useState([]);
    const [auxProfesor, setAuxProfeso] = useState([]);
    const [currentPage,setCurrentPage] = useState(1)
    const recordsPerPage = 8;
    const lasIndex = currentPage * recordsPerPage;
    const firstIndex = lasIndex - recordsPerPage;
    const records = profesor.slice(firstIndex, lasIndex);
    const npage = Math.ceil(profesor.length / recordsPerPage );
    const numbers = [...Array(npage + 1).keys()].slice(1);
  


  
  
    const normalizeText = funcNormalize;
  
    const handleChangeText = (value) => {
      const normalizeValue = normalizeText(value);
      const newAlumnos = profesor.filter((profesor) => {
        const normalizeAlumnos = normalizeText(profesor.nombre);
        return normalizeAlumnos.includes(normalizeValue);
      });
      setProfesor(newAlumnos);
      if (value === "") {
        setProfesor(auxProfesor);
      }
    };

    const handleChangeTextArea = (value) => {
      const normalizeValue = normalizeText(value);
      const newAlumnos = profesor.filter((profesor) => {
        const normalizeAlumnos = normalizeText(profesor.area);
        return normalizeAlumnos.includes(normalizeValue);
      });
      setProfesor(newAlumnos);
      if (value === "") {
        setProfesor(auxProfesor);
      }
    };
    function prevPage(){
        //funciones de paginacion
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
          <h1>Profesores</h1>
        
          <div className="d-flex align-items-center flex-wrap ">

          <div className="w-75 d-flex flex-md-nowrap flex-wrap ">
            <input
              className={"form-control my-2 mx-1" + isClassNameDark}
              type="search"
              onChange={(e) => {
                handleChangeTextArea(e.target.value);
              
                console.log(e.target.value)
              }}
  
  
              placeholder="Busca un profesor por area"
            />
                        <input
              className={"form-control my-2 mx-1" + isClassNameDark}
              type="search"
              onChange={(e) => {
                handleChangeText(e.target.value);
              
                console.log(e.target.value)
              }}
  
  
              placeholder="Busca un profesor por nombre"
            />
            </div>
            <div className="d-flex align-items-center">
           </div>
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
                  <th>Area</th>
                  <th>Correo</th>

                </tr>
              </thead>
              <tbody>
                {records.map((datax,idx) => {
                  return (
                    <tr key={datax.id}>
                      <td>{idx+1}</td>
                      <td>{datax.nombre}</td>
                      <td>{datax.area}</td>
                      <td>{datax.correo}</td>
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
export default Profesores;