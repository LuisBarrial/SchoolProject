import { useState } from "react";
import { mockProfesores } from "../mock/Mock";
import { funcNormalize, isDark } from "../mock/constFunction";
import { DARKMODE } from "../mock/constVariable";

const Profesores = () => {

    const data = mockProfesores;
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
  
     console.log(data[1].horarios.map(x=>{return x.horario}).toString())
  
    return (
      <>
        <div>
          <h1>Profesor Admin</h1>
          <div className="d-flex align-items-center flex-wrap">
          <button className="mx-1 btn h-50 d-block btn-info">Nuevo</button>
            <input
              className={"form-control my-2 mx-1 w-50" + isClassNameDark}
              type="search"
              onChange={(e) => {
                handleChangeText(e.target.value);
              
                console.log(e.target.value)
              }}
  
  
              placeholder="Busca un profesor"
            />
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
                  <th>Edad</th>
                  <th>Correo</th>
                  <th>HORARIOS</th>
                  <th>Acciones</th>

                </tr>
              </thead>
              <tbody>
                {records.map((datax,idx) => {
                  return (
                    <tr key={datax.id}>
                      <td>{datax.id}</td>
                      <td>{datax.nombre}</td>
                      <td>{datax.area}</td>
                      <td>{datax.edad}</td>
                      <td>{datax.correo}</td>
                      <td>{data[idx].horarios.map(x=>{return x.horario+" "}).toString()}</td>
                      <td><div className="d-flex justify-content-evenly">
                      <div className="" style={{cursor: 'pointer'}}>
                      <svg width={20} height={20}  color="#89a9d6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
  </svg></div>
  
      <div className="" style={{cursor: 'pointer'}}>   <svg width={20} height={20} color="red" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg></div>
   </div></td>
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