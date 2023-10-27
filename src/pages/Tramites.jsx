import { isDark } from "../mock/constFunction";
import { DARKMODE } from "../mock/constVariable";

const Tramites = () => {
  const isDarkModeStored = localStorage.getItem("dark") === DARKMODE.TRUE;
  const isClassNameDark = isDark(isDarkModeStored);

  return (
    <>
      <div>
        <h1>Tramites</h1>
        <div
          className={
            " my-4 container d-flex justify-content-center align-items-center w-75 border-4 border-light " +
            isClassNameDark
          }
          style={{ height: "75vh", borderRadius: "50px 10px",border: '3px solid' }}
        >
          <section className="w-100 h-100">
            <span className="mt-3 d-block text-center h4">
              {" "}
              Selecciona tu Tramite a Realizar
            </span>
            <ul className="list-unstyled p-3">
              <li style={{maxHeight:'70px'}}>
                <span className="link-info">Record de notas</span>
                <p className="text-nowrap procedures" >Ingresar tu dni y el correo al cual quieres que el texto sea enviado</p>
              </li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
};
export default Tramites;
