import Header from "../components/Header";
import img from "../assets/cool-background_1.webp";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useContext } from "react";
import { DataContext } from "../Hook/Context";
const Login = () => {


    const navigate = useNavigate();
    const {contextData,setContextData} = useContext(DataContext);

    function showErrorAlert(message) {
        
        const alertDiv = document.createElement("div");
        alertDiv.className = "alert alert-danger z-1 position-absolute w-100 alert-log";
        alertDiv.textContent = message;
        document.getElementById('container-card').appendChild(alertDiv);
      
        setTimeout(() => {
          document.getElementById('container-card').removeChild(alertDiv);
        }, 5000);
      }

     const auth = async (name, password) => {
        var data = {};
        data.correo = name;
        data.clave = password;
        
        const dataJson = data;
      
      
        try {
          const response = await fetch('http://localhost:8010/login', {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(dataJson)
          });
      
          if (response.ok) {
            const jwt = await response.json();
            let data = {}
            data.correo=jwt.correo;
            data.id=jwt.id;
            data.nombre=jwt.nombre;
            data.rol=jwt.rol;
            setContextData(data);
            localStorage.setItem("jwt",jwt.token);
          }

        
          return response;
        } catch (error) {
          console.log(error + 'errors');
          
        }
      };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        var name = document.getElementById("login").value;
        var password = document.getElementById("clave").value;
        
        try {
          const response = await auth(name, password);
          if (response && response.ok) {
            navigate('/dashboard');
            
          }
          else showErrorAlert("Algo ha ocurrido mal");

        } catch (error) {
          console.log(error, "eerorororor");
          showErrorAlert("Algo ha ocurrido mal");

        }
      };

  return (
    <>
      <Header />

      <section className="background-filter vh-100 d-flex justify-content-center align-items-center">
        <div id="container-card" className="z-0 w-75  " style={{ position: "relative",height: "60%" }}>

          <div
            className="position-absolute top-0 w-100 col-3 my-4"
            style={{
              backgroundImage: `url(${img})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",

              borderRadius: '0.5rem',
              height: '100%'
            }}
          >
            <div className="card col-md-7 col-lg-6 h-100 my-0 shadow" style={{}}>
              <div className="card-body d-flex justify-content-center my-4 align-items-center">
                <form className="d-flex flex-column col-sm-9 col-md-9" >
                <center><h1>Login</h1></center>
                <label className="my-2">Ingrese su usuario</label>
                <input id="login" className="border-0 border-bottom" name="txtuser" placeholder="ej: usuario123"></input>
                <label className="my-2">Ingrese su Clave</label>
                <input id="clave" className="border-0 border-bottom" type="password" autoComplete="true" placeholder="ej. 12345"></input>
                <button onClick={handleSubmit} type="submit" className="my-4 btn btn-primary">Ingresar</button>
                <span  className="user-select-none" >No tienes cuenta? <span className="text-info user-select-none" style={{cursor: 'pointer'}}><Link to={"/register"}>Ingrese aqui</Link></span></span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default Login;
