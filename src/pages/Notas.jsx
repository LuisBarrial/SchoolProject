import { mockNotas } from "../mock/Mock";
import { isDark } from "../mock/const";

const Notas = () => {
  const data = mockNotas;
  const isDarkModeStored = localStorage.getItem("dark") === "true";
  const isClassNameDark = isDark(isDarkModeStored);

  return (
    <>
      <div>
        <h1>Notas</h1>
        <div className="table-responsive">
        <table className={"w-100 table text-center overflow-scroll " + isClassNameDark }>
          <thead>
            <tr>
              <th>Id</th>
              <th>Curso</th>
              <th>Nota</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {data.map((datax) => {
            return(
              <tr key={datax.id}>
                <td>{datax.id}</td>
                <td>{datax.curso}</td>
                <td>{datax.nota}</td>
                <td>{datax.nota>=12? 'APROBADO': 'DESAPROBADO'}</td>
              </tr>)
            })}
          </tbody>
        </table>
        </div>
      </div>
    </>
  );
};
export default Notas;
