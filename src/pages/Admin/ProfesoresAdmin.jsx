import { useCallback, useEffect, useState } from "react";
import { DARKMODE } from "../../mock/constVariable";
import { funcNormalize, isDark } from "../../mock/constFunction";
import CardProfesorAdmin from "../../components/CardProfesorAdmin";

const ProfesoresAdmin = () => {

  const Payload = (correo, dni, nombre, area) => {
    var data = {};
    data.correo = correo.trim();
    data.dni = dni;
    data.nombre = nombre;
    data.area = area;
    console.log(data);
    fetch("http://localhost:8010/profesor", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          fetchDataAndSetProfesor();
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
  
  const uploadData = (id, nombre, area,event) => {
    event.preventDefault();
    var data = {};
    data.id = id;
    data.nombre = nombre;
    data.area = area;
    console.log(data);
    fetch("http://localhost:8010/profesor", {
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
          fetchDataAndSetProfesor();
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

  async function handlerSubmit(e) {
    e.preventDefault();
    const correo = document.getElementsByName("correo")[0].value;
    const dni = document.getElementsByName("dni")[0].value;
    const nombre = document.getElementsByName("nombre")[0].value;
    const grado = document.getElementsByName("area")[0].value;
    Payload(correo, dni, nombre, grado);
    setAddElement(false);
  }

  const deleteData = (id) => {
    fetch("http://localhost:8010/profesor/" + id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          response.text();
          fetchDataAndSetProfesor();
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  };

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
    const [addElement, setAddElement] = useState(false);
    const [dataUpload, setDataUpload] = useState({});


  
  
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
          <h1>Profesor Admin</h1>
          {addElement && (
          <CardProfesorAdmin

            handlerSubmit={dataUpload.id==undefined?handlerSubmit: uploadData}
            isClassNameDark={isClassNameDark}
            dataUpload={dataUpload}
            disableAddElement={function disable(){setAddElement(false)}}
          ></CardProfesorAdmin>
        )}
          <div className="d-flex align-items-center flex-wrap ">
          <button className="mx-1 btn h-50 d-block btn-info" onClick={()=>{setDataUpload({}); setAddElement(true);}}>Nuevo</button>
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
                  <th>DNI</th>
                  <th>Area</th>
                  <th>Correo</th>
                  <th>Acciones</th>

                </tr>
              </thead>
              <tbody>
                {records.map((datax,idx) => {
                  return (
                    <tr key={datax.id}>
                      <td>{idx+1}</td>
                      <td>{datax.nombre}</td>
                      <td>{datax.dni}</td>
                      <td>{datax.area}</td>
                      <td>{datax.correo}</td>
                      <td><div className="d-flex justify-content-evenly">
                      <div className="" id="upload" style={{cursor: 'pointer'}} onClick={()=>{ setDataUpload(datax); setAddElement(true);}}>
                      <svg width={20} height={20}  color="#89a9d6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
  </svg></div>
  
      <div className="" id="delete" style={{cursor: 'pointer'}} onClick={()=>{showAlertDelete(datax.id,deleteData,isClassNameDark)}}>   <svg width={20} height={20} color="red" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
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
export default ProfesoresAdmin;