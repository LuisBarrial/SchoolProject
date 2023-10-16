import { useState } from "react";
import { funcNormalize, isDark } from "../../mock/constFunction";
import { DARKMODE } from "../../mock/constVariable";
import { mockAlumno, mockNotas } from "../../mock/Mock";

const NotasAdm = () => {
  console.log("render")

  const data = mockAlumno;
  const notas = mockNotas;
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
    console.log("estoy buscando "+ value)
    const normalizeValue = normalizeText(value);
    const newAlumnos = data.filter((alumnos) => {
      const normalizeAlumnos = normalizeText(alumnos.nombre);
      return normalizeAlumnos.includes(normalizeValue);
    });
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

  const [cardModal, setCardModal] = useState(false)

 const RenderCard = () =>{

  return (
    <form  className={"position-absolute d-block flex-column justify-content-center col-8 col-md-4 pt-4  top-50 start-50 z-2" + isClassNameDark} style={{backgroundColor: '#e0dada',transform: "translate(-50%,-50%)", borderRadius: '10px 10px'}}>
               <h3 className="text-center">Notas</h3>

       <div className="bg-light table-responsive">
        
<select className="form-select form-select-sm" aria-label=".form-select-sm example">
  <option selected value="1">Primero</option>
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
                    {notas.map((value)=>{
                        return(<>
                        <tr>
                            <th>{value.curso}</th>
                            <td>12</td>
                            <td>11</td>
                            <td>12</td>
                            <td>19</td>
                            <td>12</td>
                            <td>16</td>
                            </tr>
                            </>
                        )
                    })}


            </tbody>
        </table>
        <button type="button" className="d-block m-auto btn bg-info" onClick={()=>{setCardModal(false)}}>cerrar</button>
        </div>
       { /*<h2 className="text-center">Calificaciones</h2>
        {notas.map((nota, index) => (
          <div key={index} className="d-flex justify-content-around mb-3">
                <label  className="col-sm-2 col-form-label">{nota.curso}</label>
              <div className="col-4">
              <input disabled type="email" className="form-control" defaultValue={nota.nota}/>
            </div>
          </div>
        ))}
        <div className="d-flex">
        <button type="button" onClick={()=>{setCardModal(false)}} className="d-block m-auto btn bg-info mb-3">Guardar</button>
        <button type="button" onClick={()=>{setCardModal(false)}} className="d-block m-auto btn bg-info mb-3">Cerrar</button>

        </div>*/}
    </form>
  );
  }


  return (
    <>
            {cardModal && <RenderCard/>}
      <div>
        <h1>Notas Admin</h1>
        <div className="d-flex align-items-center flex-wrap">
          <input className={"form-control my-4 w-50" + isClassNameDark } type="search" onChange={(e)=>{handleChangeText(e.target.value)}} placeholder="Busca un alumno"/>
          <div className="d-flex align-items-center">
          <input
            className={"form-control my-2 w-50" + isClassNameDark}
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
             {records.map((datax) => {
               return (
                 <tr key={datax.id}>
                   <td>{datax.id}</td>
                   <td>{datax.nombre}</td>
                   <td><div className="d-flex justify-content-evenly">
                   <div className="" onClick={()=>setCardModal(true)} style={{cursor: 'pointer'}}>
                   <svg width={20} height={20}  color="#89a9d6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
 <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
</svg></div>

   <div className="" style={{cursor: 'pointer'}}>   <svg height={20} width={20} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>
</div>
</div></td>
                 </tr>
               );
             })}
           </tbody>
         </table>
        </div>
        <nav className="z-1" >
            <ul className="pagination">
              <li className="page-item">
                <a href="#" className={"page-link "+ isClassNameDark} onClick={prevPage}>Prev</a>
              </li>
              {
                numbers.map((n,i)=>{
                    return(
                    <li className={`z-1 page-item ${currentPage == n? ' active' : ''}` }key={i}>
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
export default NotasAdm;
