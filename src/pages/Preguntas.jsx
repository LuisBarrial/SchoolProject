import { useCallback, useEffect, useState } from "react";
import { funcNormalize, isDark } from "../mock/constFunction";
import { DARKMODE } from "../mock/constVariable";

const Preguntas = () => {

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

  return (
    <>
      <div>
        <h1>Preguntas Frecuentes</h1>
        <div>
          <input
            className={"form-control my-4" + isClassNameDark}
            type="search"
            onChange={(e) => {
              handleChangeText(e.target.value)
            }}
            placeholder="Busca una palabra clave"
          />
        </div>
        <section id="preguntas">
          <p>Aquí hay algunas preguntas que pueden surgir:</p>
          <ul>
            {records.map((questionData, idx) => {
              return (
                <li key={idx}>
                  <h4>{questionData.pregunta}</h4>
                  <p>{questionData.respuesta}</p>
                </li>
              );
            })}
          </ul>

          {question.length>2 && <button type="button" className="btn btn-info d-block m-auto w-50" style={{filter: 'drop-shadow(5px 5px 1px skyblue)'}} onClick={nextPage}>  Ver mas</button>}
    
        </section>
      </div>
    </>
  );
};

export default Preguntas;

/*  <li>
<h4>¿Cómo funciona el sitio?</h4>
<p>
  El sitio funciona mediante un sistema de preguntas y respuestas.
  Los usuarios pueden publicar preguntas y responder a las
  preguntas de otros usuarios.
</p>
</li>
<li>
<h4>¿Cuál es el propósito del sitio?</h4>
<p>
  El propósito del sitio es proporcionar un foro para que los
  usuarios puedan compartir información y aprender unos de otros.
</p>
</li>
<li>
<h4>¿Quiénes son los creadores del sitio?</h4>
<p>
  El sitio fue creado por un equipo de desarrolladores de
  software.
</p>
</li> **/
