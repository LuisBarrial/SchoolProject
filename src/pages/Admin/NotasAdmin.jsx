import { useCallback, useEffect, useState } from "react";
import { funcNormalize, isDark } from "../../mock/constFunction";
import { DARKMODE } from "../../mock/constVariable";
import PropTypes from "prop-types";
import RenderCard from "../../components/RenderCard";


const NotasAdm = () => {
  console.log("render");

  const isDarkModeStored = localStorage.getItem("dark") === DARKMODE.TRUE;
  const isClassNameDark = isDark(isDarkModeStored);
  const [alumno, setAlumno] = useState([]);
  const [auxAlumno, setAuxAlumno] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;
  const lasIndex = currentPage * recordsPerPage;
  const firstIndex = lasIndex - recordsPerPage;
  const records = alumno.slice(firstIndex, lasIndex);
  const npage = Math.ceil(alumno.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const [notas,setNotas] = useState([]);

  const getColumns = async () => {
    const response = await fetch("http://localhost:8010/estudiante", {
      method: "GET",
    });
    const data = await response.json();
    return data;
  };
  const fetchDataAndSetAlumno = useCallback(async () => {
    const data = await getColumns();
    setAlumno(data);
    setAuxAlumno(data);
  }, []); // No tienes dependencias, ya que no usas ninguna variable externa dentro de la función

  useEffect(() => {
    const fetchData = async () => {
      await fetchDataAndSetAlumno();
    };

    fetchData();
  }, [fetchDataAndSetAlumno]);

  const normalizeText = funcNormalize;

  const handleChangeText = (value) => {
    console.log("estoy buscando " + value);
    const normalizeValue = normalizeText(value);
    const newAlumnos = alumno.filter((alumnos) => {
      const normalizeAlumnos = normalizeText(alumnos.nombre);
      return normalizeAlumnos.includes(normalizeValue);
    });
    setAlumno(newAlumnos);
    if (value === "") {
      setAlumno(auxAlumno);
    }
    setCurrentPage(1);
  };

  function prevPage() {
    console.log("last" + lasIndex);
    console.log(firstIndex);
    console.log(records);

    console.log("current" + currentPage);
    console.log("npage" + npage);
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

  const getColumnsNotas = async (id) => {
    const response = await fetch("http://localhost:8010/notas?idEstudiante="+id, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  };


  const [cardModal, setCardModal] = useState(false);




  const RenderCard = ({notas}) => {
    console.log(notas)
      
RenderCard.propTypes={
  notas: PropTypes.array
}
    return (
      <form
        className={
          "position-absolute d-block flex-column justify-content-center col-8 col-md-4 pt-4 pb-4 top-50 start-50 z-2" +
          isClassNameDark
        }
        style={{
          backgroundColor: "#e0dada !important",
          transform: "translate(-50%,-50%)",
          borderRadius: "10px 10px",
          border: '3px solid black'

        }}
      >
        <h3 className="text-center">Notas</h3>

        <div className="bg-light table-responsive">
          <select
            className="form-select form-select-sm"
            aria-label=".form-select-sm example"
          >
            <option selected value="1">
              Primero
            </option>
            <option value="2">Segundo</option>
            <option value="3">Tercer</option>
            <option value="4">Cuarto</option>
          </select>
          <table className="table text-center">
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
              {notas.map((value,idx) => {
                return (
                    <tr key={idx}>
                      <th>{value.curso.nombre}</th>
                      <td><input style={{"width":'30px'}} defaultValue={value.e1}/></td>
                      <td><input style={{"width":'30px'}} defaultValue={value.e2}/></td>
                      <td><input style={{"width":'30px'}} defaultValue={value.r1}/></td>
                      <td><input style={{"width":'30px'}} defaultValue={value.e3}/></td>
                      <td><input style={{"width":'30px'}} defaultValue={value.ef}/></td>
                      <td><input style={{"width":'30px'}} defaultValue={value.rf}/></td>
                    </tr>
                );
              })}
            </tbody>
          </table>
          <button
            type="button"
            className="d-block m-auto btn bg-info"
            onClick={() => {
              setCardModal(false);
            }}
          >
            cerrar
          </button>
        </div>
      </form>
    );
  };

  
  return (
    <>
      {cardModal && <RenderCard notas={notas} />}
      <div>
        <h1>Notas Admin</h1>
        <div className="d-flex align-items-center justify-content-around flex-wrap col-12">
          <input
            className={"form-control my-4 w-50" + isClassNameDark}
            type="search"
            onChange={(e) => {
              handleChangeText(e.target.value);
            }}
            placeholder="Busca un alumno"
          />
          <div className="d-flex align-items-center col-6 ">
            <input
              className={"form-control my-2 w-50  col-6 " + isClassNameDark}
              type="search"
              placeholder="Busca Por salon"
            />
            <button className="mx-1 btn h-50 d-block btn-info"> Buscar</button>
          </div>
        </div>
        <div className="table-responsive">
          <table
            className={
              "w-100 table text-center overflow-scroll " + isClassNameDark
            }
          >
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {records.map((datax,idx) => {
                return (
                  <tr key={idx}>
                    <td>{idx+1}</td>
                    <td>{datax.nombre}</td>
                    <td>
                      <div className="d-flex justify-content-evenly">
                        <div
                          className=""
                          onClick={async () => {  const infoNota = await getColumnsNotas(datax.id); setNotas(infoNota);    setCardModal(true); } }
                          style={{ cursor: "pointer" }}
                        >
                          <svg
                            width={20}
                            height={20}
                            color="#89a9d6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                            />
                          </svg>
                        </div>

                        <div className="" style={{ cursor: "pointer" }}>
                          {" "}
                          <svg
                            height={20}
                            width={20}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <nav className="z-1">
          <ul className="pagination mb-0">
            <li className="page-item">
              <a
                href="#4"
                className={"page-link " + isClassNameDark}
                onClick={prevPage}
              >
                Prev
              </a>
            </li>
            {numbers.map((n, i) => {
              return (
                <li
                  className={`z-1 page-item ${
                    currentPage == n ? " active" : ""
                  }`}
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
      <section className="">
        <div className="card-container d-flex justify-content-center align-items-center flex-wrap">
          <div
            className={"card m-2 col-5 col-md-3 text-center" + isClassNameDark}
            style={{ minWidth: "2rem" }}
          >
            <div className="card-body">
              <h5 className="card-title">Total de Alumnos</h5>
              <h1>{alumno.length}</h1>
            </div>
          </div>
          <div
            className={"card m-2 col-5 col-md-3 text-center" + isClassNameDark}
            style={{ minWidth: "2rem" }}
          >
            <div className="card-body ">
              <h5 className="card-title">Alumnos Existentes</h5>
              <h1>{alumno.length}</h1>
            </div>
          </div>
          <div
            className={"card m-2 col-5 col-md-3 text-center" + isClassNameDark}
            style={{ minWidth: "2rem" }}
          >
            <div className="card-body">
              <h5 className="card-title">Alumnos Desaprobados</h5>
              <h1>9</h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default NotasAdm;

