import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import imglogo from "../assets/ImageFondoSLG_Ica.webp";
import PropTypes from "prop-types";

const SlideBar = ({ isDarkMode, toggleDarkMode }) => {
  const [isActive, setIsActive] = useState(false);

  function toogle() {
    if (!isActive) {
      setIsActive(true);
      console.log("activao");
    } else {
      setIsActive(false);
      console.log("desactivao");
    }
  }

  const links = ["Notas", "Perfil", "Cursos", "Tramites", "Horarios"];
  const icons = [
    <svg
      key={1}
      width={20}
      height={20}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>,
    <svg
      key={2}
      width={20}
      height={20}
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
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      />
    </svg>,
    <svg
      key={3}
      width={20}
      height={20}
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
        d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
      />
    </svg>,
    <svg
      key={4}
      width={20}
      height={20}
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
        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
      />
    </svg>,
    <svg
      key={5}
      width={20}
      height={20}
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
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>,
  ];

  return (
    <>
      <div
        className={` min-vh-100 h-auto darkmode slider position-relative top-0 start-0 h-100 p-3 ${
          isDarkMode ? "is-dark" : "bg-light"
        } ${isActive ? "active-slide" : ""}`}
        style={{ width: "250px" }}
      >
        <div
          className="position-relative d-flex align-items-center w-100 mb-4"
          style={{ maxHeight: "50px" }}
        >
          <Link to={"/"}>
            <img
              className=" user-select-none ps-1"
              width={60}
              rel="preload"
              height={50}
              src={imglogo}
              alt="logoSLG"
            ></img>
          </Link>
          <span
            className={`text-slide mx-3 my-0 fw-bolder text-center  ${
              isActive && "active-slide"
            }`}
          >
            SAN LUIS GONZAGA
          </span>
          <span
            onClick={toogle}
            className={`position-absolute d-flex justify-content-center
             element-active align-items-center  ${
               isActive && "button-active-slide"
             } ${isDarkMode ? "bg-primary" : "bg-danger"} `}
            style={{
              border: "0px solid black",
              right: "-25px",
              transform: "translateY(-50%)",
              top: "50%",
              height: "25px",
              width: "25px!important",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          >
            <svg
              style={{ margin: "0", padding: "0", color: "white" }}
              width={20}
              height={20}
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
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </span>
        </div>
        <div
          className="d-flex flex-column justify-content-between"
          style={{ height: "calc(100% - 60px)" }}
        >
          <div>
            <ul className="list-unstyled w-100">
              {links.map((name, idx) => {
                return (
                  <li key={idx}>
                    <NavLink
                      className={`d-flex align-items-center w-100 h-100  my-2 py-2 btn btn-light 
                    text-dark text-decoration-none fw-medium  ${
                      isActive && "active-slide"
                    } ${isDarkMode && "is-dark"}`}
                      style={{ textAlign: "initial" }}
                      to={name.toLowerCase()}
                    >
                      <span
                        className="d-flex align-items-center"
                        style={{ transform: "translateX(50%)" }}
                      >
                        {icons[idx]}
                      </span>
                      <span className="mx-4"> {name} </span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="list-unstyled">
            <li>
              <NavLink
                className={`d-flex align-items-center w-100 h-100 my-1 py-2 btn btn-light 
                    text-dark text-decoration-none fw-medium  ${
                      isActive && "active-slide"
                    } ${isDarkMode && "is-dark"}`}
                style={{ textAlign: "initial" }}
                to={"/#"}
              >
                <span
                  className="d-flex align-items-center"
                  style={{ transform: "translateX(50%)" }}
                >
                  <svg
                    height={20}
                    width={20}
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
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </span>
                <span className="mx-4"> USER</span>
              </NavLink>
            </li>
            <li>
              <div
                className={`darkmodebtn d-flex align-items-center w-100 h-100  my-1 py-2 btn btn-light 
                    text-dark text-decoration-none fw-medium  ${
                      isActive && "active"
                    } ${isDarkMode && "is-dark"}`}
                style={{ textAlign: "initial", minHeight: "37.6px", userSelect: 'none' }}
                to={"#"}
                onClick={toggleDarkMode}
              >
                <span
                  className="d-flex align-items-center"
                  style={{ transform: "translateX(50%)" }}
                >
                  <svg
                    width={20}
                    height={20}
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
                      d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                    />
                  </svg>
                </span>
                <span className="mx-4">Darkmode</span>
                <div
                  className="d-flex"
                  style={{ height: "24px", minWidth: "54px" }}
                >
                  <span
                    className={`d-block switch position-relative ${
                      isDarkMode && "dark-switch"
                    } `}
                    style={{
                      height: "100%",
                      width: "54px",
                      borderRadius: "15px",
                      backgroundColor: "gray",
                    }}
                  ></span>
                </div>
              </div>
            </li>
            <li>
              <NavLink
                className={`d-flex align-items-center w-100 h-100 my-1 py-2 btn btn-light 
                    text-dark text-decoration-none fw-medium  ${
                      isActive && "active-slide"
                    } ${isDarkMode && "is-dark"}`}
                style={{ textAlign: "initial" }}
                to={"/logout"}
              >
                <span
                  className="d-flex align-items-center"
                  style={{ transform: "translateX(50%)" }}
                >
                  <svg
                    width={20}
                    height={20}
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
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
                </span>
                <span className="mx-4"> Logout</span>
              </NavLink>
            </li>
          </div>
        </div>
      </div>
    </>
  );
};
SlideBar.propTypes = {
  isDarkMode: PropTypes.bool,
  toggleDarkMode: PropTypes.func,
};

export default SlideBar;
