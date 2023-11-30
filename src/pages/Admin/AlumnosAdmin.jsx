import { useCallback, useEffect, useState } from "react";
import { funcNormalize, isDark } from "../../mock/constFunction";
import { DARKMODE } from "../../mock/constVariable";
import CardAlumnoAdmin from "../../components/CardAlumnoAdmin";
import TableAlumnoAdmmin from "../../components/TableAlumnoAdmin";

const AlumnosAdm = () => {
  const Payload = (correo, dni, nombre, grado) => {
    var data = {};
    data.correo = correo;
    data.dni = dni;
    data.nombre = nombre;
    data.grado = grado;
    console.log(data);
    fetch("http://localhost:8010/estudiante", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          fetchDataAndSetAlumno();
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

  const uploadData = (id, nombre, grado,event) => {
    event.preventDefault();
    var data = {};
    data.id = id;
    data.nombre = nombre;
    data.grado = grado;
    console.log(data);
    fetch("http://localhost:8010/estudiante", {
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
          fetchDataAndSetAlumno();
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

  const deleteData = (id) => {
    fetch("http://localhost:8010/estudiante/" + id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          response.text();
          fetchDataAndSetAlumno();
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  };

  const isDarkModeStored = localStorage.getItem("dark") === DARKMODE.TRUE;
  const isClassNameDark = isDark(isDarkModeStored);
  const [alumno, setAlumno] = useState([]);
  const [auxalumno, setAuxAlumno] = useState([]);
  const [dataUpload, setDataUpload] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;

  const lasIndex = currentPage * recordsPerPage;
  const firstIndex = lasIndex - recordsPerPage;
  const records = alumno.slice(firstIndex, lasIndex);
  const npage = Math.ceil(alumno.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

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

  const [addElement, setAddElement] = useState(false);

  async function handlerSubmit(e) {
    e.preventDefault();
    const correo = document.getElementsByName("correo")[0].value;
    const dni = document.getElementsByName("dni")[0].value;
    const nombre = document.getElementsByName("nombre")[0].value;
    const grado = document.getElementsByName("grado")[0].value;
    await Payload(correo, dni, nombre, grado);
    setAddElement(false);
  }
  return (
    <>
      <div>
        <h1>Alumnos Admin</h1>
        {addElement && (
          <CardAlumnoAdmin

            handlerSubmit={dataUpload.id==undefined?handlerSubmit: uploadData}
            isClassNameDark={isClassNameDark}
            dataUpload={dataUpload}
            disableAddElement={function disable(){setAddElement(false)}}
          ></CardAlumnoAdmin>
        )}
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="mx-1 btn h-50 d-block btn-info"
            onClick={() => {
              setDataUpload({})
              setAddElement(true);
            }}
          >
            Nuevo
          </button>
          <input
            className={"form-control my-2 mx-1 w-50" + isClassNameDark}
            type="search"
            onChange={(e) => {
              handleChangeText(e.target.value);
            }}
            placeholder="Busca un alumno"
          />
          <div className="d-flex align-items-center">
            <input
              className={"form-control my-2 w-50" + isClassNameDark}
              type="search"
              placeholder="Busca Por salon"
            />
            <button className="mx-1 btn h-50 d-block btn-info"> Buscar</button>
          </div>
        </div>
        <div
          className="table-responsive"
          aria-valuetext="tablaAlumnos"
          style={{ height: "53vh" }}
        >
          <TableAlumnoAdmmin
            isClassNameDark={isClassNameDark}
            records={records}
            deleteData={deleteData}
            toggleAddElement={function toggleAddElement(
              id,
              nombre,
              dni,
              grado,
              correo
            ) {
              const data = {
                id: id,
                nombre: nombre,
                dni: dni,
                grado: grado,
                correo: correo,
              };
              setAddElement(true);
              setDataUpload(data);
              console.log(dataUpload);
            }}
          />
        </div>
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
    </>
  );
};

export default AlumnosAdm;
