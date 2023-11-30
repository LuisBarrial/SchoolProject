import { useState } from "react";

const CursosAdm = () => {

    const [addElement,setAddElement] = useState(false);
    const [headerCells,setHeaderCell] = useState([]);

    function getHeaders(){
    const table = document.querySelector('table');
    if (table) {
      let Cells = Array.from(table.querySelectorAll('thead th')).map(cell => cell.textContent);
      setHeaderCell(Cells);
      console.log('Encabezados:', headerCells);
    }}
    return(<>
    
    <div>
        <h1>Cursos</h1>
        <table>
        <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Genero</th>
                <th>Edad</th>
                <th>Correo</th>
              </tr>
            </thead>
            <tbody>
            <tr>
                <td>Id</td>
                <td><button onClick={()=>{getHeaders(); setAddElement(true);}}></button></td>
                <td>Genero</td>
                <td>Edad</td>
                <td>Correo</td>
              </tr>
            </tbody>
            </table>
    </div>
    </>)

}
export default CursosAdm;