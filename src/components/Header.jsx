import { useState } from "react";
import { Link } from "react-router-dom";
import imagelogo from "../assets/ImageFondoSLG_Ica.webp";

const Header = () => {
  const [isActive, setIsActive] = useState(false);

  function toogle() {
    if (!isActive) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }

  return (
    <>
      <header id="nav-section" className="vw-100 position-fixed z-1">
        <nav className="navbar-principal">
          <div className="d-flex p-3 justify-content-between mx-1">
            <div>
            <Link to={"/index"} className="user-select-none">
            <img
              width={60}
              height={50}
              rel="prerender"
              src={imagelogo}
            />
            </Link>
            <span className="ms-2 text-light fw-bold">San Luis Gonzaga de Ica</span>
            </div>
            
            {isActive ? (
              <label
              className={`h-100 d-md-none user-select-all ${isActive && "slide-active"}`}
                onClick={() => {
                  toogle();
                }}
                style={{ cursor: "pointer" }}
              >
            
                <svg
                  style={{color:'white'}}
                  width={30}
                  height={50}
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </label>
            ) : (
              <label
                className="h-100 label-menu d-md-none user-select-all"
                onClick={() => {
                  toogle();
                }}
                style={{ cursor: "pointer" }}
              >
                <svg
                  style={{color:'white'}}
                  width={30}
                  height={50}
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
                    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                  />
                </svg>
              </label>
            )}

            <ul className="h-auto m-0 p-0 d-flex align-items-center d-md-flex d-none">
              <li className="d-inline px-2">
                <Link
                  className="btn btn-link text-light text-decoration-none"
                  to="/nosotros"
                >
                  Sobre nosotros
                </Link>
              </li>
              <li className="d-inline px-2">
                <Link
                  className="btn btn-link text-light text-decoration-none"
                  to="/login"
                >
                  Login
                </Link>
              </li>
              <li className="d-inline px-2">
                <Link
                  className="btn btn-link text-light text-decoration-none"
                  to="/Politicas"
                >
                  Politicas
                </Link>
              </li>
              <li className="d-inline px-2">
              <Link
                  className="btn btn-link text-light text-decoration-none"
                  to="/Dashboard"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        {isActive && (
          <ul className={`m-0 p-0 align-items-center d-md-none d-block ${isActive && 'active-menu-bar'} `}>
            <li className="list-unstyled">
              <Link
                className="btn btn-link text-light text-decoration-none d-block"
                to="/nosotros"
              >
                Sobre nosotros
              </Link>
            </li>
            <li className="list-unstyled">
              <Link
                className="btn btn-link text-light text-decoration-none d-block"
                to="/login"
              >
                Login
              </Link>
            </li>
            <li className="list-unstyled ">
              <Link
                className="btn btn-link text-light text-decoration-none d-block"
                to="/politicas"
              >
                Politicas
              </Link>
            </li>
            <li className="list-unstyled">
            <Link
                  className="btn btn-link text-light text-decoration-none d-block"
                  to="/Dashboard"
                >
                  Dashboard
                </Link>
            </li>

          </ul>
        )}
      </header>
    </>
  );
};
export default Header;
