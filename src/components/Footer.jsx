import { Link } from "react-router-dom";

const Footer = () => {

    const fecha = new Date();

  

  return (
    <>
      <footer role="article" className="bg-dark w-100" style={{}}>
        <ul data-region="footer" className="d-flex justify-content-center flex-md-row h-100 align-items-center m-0 p-4 px-0 w-100 flex-column">
          <li className="mx-2">
            <Link
              to="/"
              title="Colegio San luis Gonzaga de Ica"
              className="nav-link text-light text-decoration-underline "
            >
              San Luis Gonzaga
            </Link>
          </li>
          <li className="mx-2">

            <Link
              to="/politicas"
              className="nav-link text-decoration-underline text-light"
            >
           Politica
            </Link>
          </li>
          <li className="mx-2">
          <Link
              to="/nosotros"
              className="nav-link text-decoration-underline text-light"
            >
           Nosotros
            </Link>
          </li>
          <li className="mx-2">
            <p className="text-light my-0">
              SanLuisgonzagadeIca@gmail.com
            </p>
          </li>
          <li className="mx-2"> 
            <p className="text-light my-0">Ica {  fecha.getFullYear() }</p>
          </li>
        </ul>
      </footer>
    </>
  );
};

export default Footer;
