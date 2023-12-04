import { useCallback, useEffect, useState } from "react";
import { funcNormalize, isDark } from "../../mock/constFunction";
import { DARKMODE } from "../../mock/constVariable";
import PropTypes from "prop-types";
import RenderCard from "../../components/RenderCard";
import { showAlertDelete } from "../../components/AlertDelete";
import CenterCard from "../../components/CenterCard";

const PreguntasAdm = () => {
  const Payload = (pregunta, respuesta) => {
    var data = {};
    data.pregunta = pregunta;
    data.respuesta = respuesta;
    data.estado = "Espera";
    data.id = 17;
    console.log(data);
    fetch("http://localhost:8010/consulta", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          fetchData();
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
  async function handlerSubmit(e) {
    e.preventDefault();
    const pregunta = document.getElementsByName("pregunta")[0].value;
    const respuesta = document.getElementsByName("respuesta")[0].value;
    Payload(pregunta,respuesta);
    setAddElement(false);
  }
  const deleteData = (id) => {  
  fetch("http://localhost:8010/consulta/" + id, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        response.text();
        fetchData();
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error);
    });
  }

  const [dataQ,setDataQ] = useState([]);

  const isDarkModeStored = localStorage.getItem("dark") === DARKMODE.TRUE;
  const isClassNameDark = isDark(isDarkModeStored);
  const [question, setQuestion] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 2;
  const lasIndex = currentPage * recordsPerPage;
  const firstIndex = 0;
  const records = question.slice(firstIndex, lasIndex);
  const npage = Math.ceil(question.length / recordsPerPage);

  const getColumns = async () => {
    const response = await fetch("http://localhost:8010/consulta", {
      method: "GET",
    });
    const data = await response.json();
    return data;
  };

  const fetchData = useCallback(async () => {
    const data = await getColumns();
    setDataQ(data);
    setQuestion(data)

  }, []);

  useEffect(()=>{
    const getDataAndSet= async () => {

      fetchData();


    }
    getDataAndSet();
  },[fetchData]);


  const updateData =async (id, pregunta, respuesta, event) => {
    event.preventDefault();
    var data = {};
    data.id = id;
    data.pregunta = pregunta;
    data.respuesta = respuesta;
    console.log(data); 
    const response = await fetch("http://localhost:8010/consulta",{headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }, method: 'PUT', body: JSON.stringify(data) });
    const info = await response.json();
    fetchData();
    console.log(info);
  }

  const normalizeText = funcNormalize;

  const handleChangeText = (value) => {
    console.log("estoy buscando " + value);
    const normalizeValue = normalizeText(value);
    const newQuestion = question.filter((questionD) => {
      const normalizeAlumnos = normalizeText(questionD.pregunta);
      return normalizeAlumnos.includes(normalizeValue);
    });
    setQuestion(newQuestion);
    if (value === "" ) {
      setQuestion(dataQ);
    }
  };


  function nextPage() {
    if (currentPage !== lasIndex && currentPage < npage) {
      setCurrentPage(currentPage + 1);
      console.log("asas");
    }
  }

  const [cardModal, setCardModal] = useState(null);

  const [addElement, setAddElement] = useState(false);

  
  return (
    <>
      <div>
        <h1>Preguntas Frecuentes / Adm</h1>
        <div className="d-flex align-items-center">
          <input
            className={"form-control my-4 w-75" + isClassNameDark}
            type="search"
            onChange={(e) => {
              handleChangeText(e.target.value);
            }}
            placeholder="Busca una palabra clave"
          />
          <button className="ms-3 btn h-50 d-block btn-info z-3" type="button" onClick={()=>{setCardModal(null); setAddElement(true);}}> Agregar</button>
        </div>

            {addElement && (<><CenterCard>
                <div className={"card " +isClassNameDark} onClick={(e)=>{e.stopPropagation()}}>
                <div className="card-header">
                  <h1>Agregar Pregunta <span className="me-auto float-end" style={{cursor:'pointer'}} onClick={()=>setAddElement(false)}>X</span></h1>
                </div>
                  <div className={"card-body "+isClassNameDark}>
                  <form className={"form-control "+isClassNameDark} onSubmit={(e)=>{handlerSubmit(e)}}>
                    <fieldset className="d-flex justify-content-center">
                  <label className="w-100">
                    Agregar Pregunta
                    <br></br>
                    <textarea id="pregunta" name="pregunta" className="mt-2" type="text"/>
                  </label>
                  <label>
                    Agregar Respuesta
                    <br></br>
                    <textarea id="respuesta" name="respuesta" className="mt-2"  type="text"/>
                  </label>
                  </fieldset>
                  <button className="m-auto d-block mt-4 btn btn-info" type="submit">Agregar</button>
                  
                  </form>

                  </div>

                </div>
              
              </CenterCard></>)}

        <section id="preguntas">
          <p>Preguntas Sugeridas</p>
          <ul>
            {records.map((questionData, idx) => {
              return (
                <li key={idx}>
                  <p className="m-0">Estado : {questionData.estado}</p>
                  <h4>{questionData.pregunta}</h4>
                  <p className="m-0">{questionData.respuesta}</p>
                  <div className="d-flex">
                    
                    <div id="editItem"
                      onClick={() => {
                        setCardModal(idx);
                         console.log(question);

                      }}
                      className="p-2"
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
                    <div id="deleteItem" className="p-2" style={{ cursor: "pointer" }} onClick={()=>{showAlertDelete(questionData.id,deleteData,isClassNameDark)
                        }}>
                      <svg
                        width={20}
                        height={20}
                        color="red"
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
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          {cardModal !== null && (
            <RenderCard
              id={question[cardModal].id}
              pregunta={question[cardModal].pregunta}
              respuesta={question[cardModal].respuesta}
              isClassNameDark={isClassNameDark}
              setCardModal={setCardModal}
              updateData={updateData}
            />
          )}

          {(question.length > 2 && lasIndex<dataQ.length) && (
            <button
              type="button"
              className="btn btn-info d-block m-auto w-50"
              style={{ filter: "drop-shadow(5px 5px 1px skyblue)" }}
              onClick={nextPage}
            >
              Ver mas
            </button>
          )}
        </section>
      </div>
    </>
  );
};

export default PreguntasAdm;

PreguntasAdm.propTypes = {
  pregunta: PropTypes.string,
  respuesta: PropTypes.string,
};