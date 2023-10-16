import { useState } from "react";
import { funcNormalize, isDark } from "../../mock/constFunction";
import { DARKMODE } from "../../mock/constVariable";
import { mockPreguntas } from "../../mock/Mock";


const PreguntasAdm = () => {
  const dataQ = mockPreguntas;
  const isDarkModeStored = localStorage.getItem("dark") === DARKMODE.TRUE;
  const isClassNameDark = isDark(isDarkModeStored);
  const [question, setQuestion] = useState(dataQ);
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
    const newQuestion = dataQ.filter((questionD) => {
      const normalizeAlumnos = normalizeText(questionD.question);
      return normalizeAlumnos.includes(normalizeValue);
    });
    setQuestion(newQuestion);
    if (value === "") {
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

  const RenderCard = (props) =>{
    console.log('as')
    return (
      <form  className={"position-absolute d-block flex-column justify-content-center col-8 col-md-4 pt-4  top-50 start-50 z-2" + isClassNameDark} style={{backgroundColor: '#e0dada',transform: "translate(-50%,-50%)", borderRadius: '10px 10px'}}>
          <h2 className="text-center">Preguntas</h2>
            <div className="d-flex justify-content-around mb-3">
                  <label  className="col-sm-2 col-form-label">{props.pregunta}</label>
                <div className="col-4 me-2">
                <textarea style={{height:'30vh',width:'100%'}} type="email" className="form-control" defaultValue={props.respuesta}/>
              </div>
            </div>
          <div className="d-flex">
          <button type="button" onClick={()=>{setCardModal(null)}} className="d-block m-auto btn bg-info mb-3">Guardar</button>
          <button type="button" onClick={()=>{setCardModal(null)}} className="d-block m-auto btn bg-info mb-3">Cerrar</button>
  
          </div>
      </form>
    );
    }
  

  return (
    <>
      <div>
        <h1>Preguntas Frecuentes / Adm</h1>
        <div className="d-flex align-items-center">
          <input
            className={"form-control my-4 w-50" + isClassNameDark}
            type="search"
            onChange={(e) => {
              handleChangeText(e.target.value)
            }}
            placeholder="Busca una palabra clave"
          />
                  <button className="ms-3 btn h-50 d-block btn-info"> Agregar</button>

        </div>

        <section id="preguntas">
          <p>Preguntas Sugeridas</p>
          <ul>
            {records.map((questionData, idx) => {
              return (
                
                <li key={idx}>
                  <h4>{questionData.question}</h4>
                  <p className="m-0">{questionData.response}</p>
                  <div className="d-flex">
                  <div onClick={()=>{

setCardModal(idx); // Establece el índice en el estado para mostrar la tarjeta modal

}} className="p-2" style={{cursor: 'pointer'}}>
                    <svg width={20} height={20}  color="#89a9d6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
</svg></div>    <div className="p-2"  style={{cursor: 'pointer'}}>   <svg width={20} height={20} color="red" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg></div>
</div>
                </li>
              );
            })}
          </ul>
          {cardModal !== null && (
          <RenderCard
            pregunta={question[cardModal].question}
            respuesta={question[cardModal].response}
          />
        )}


          {question.length>2 && <button type="button" className="btn btn-info d-block m-auto w-50" style={{filter: 'drop-shadow(5px 5px 1px skyblue)'}} onClick={nextPage}>  Ver mas</button>}
    
        </section>
      </div>
    </>
  );
};

export default PreguntasAdm;

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
