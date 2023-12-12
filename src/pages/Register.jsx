import Header from "../components/Header";
import img from "../assets/SprinkleBg.webp";
import { useNavigate } from "react-router-dom";
const Register = () => {

  const navigate = useNavigate();

  const payloadData = async (name, password, dni , email) => {
    var data = {};
    data.correo = email;
    data.clave = password;
    data.nombre = name;
    data.dni = dni;
    
    const dataJson = data;
  
  
    try {
      const response = await fetch('http://localhost:8010/usuario', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(dataJson)
      });
  
      if (response.ok) {
        navigate('/login');

      }
      else showErrorAlert("Algo ha ocurrido mal");

    } catch (error) {
      console.log(error + 'errors');
    }

}


    function showErrorAlert(message) {
        
        const alertDiv = document.createElement("div");
        alertDiv.className = "alert alert-danger z-1 position-absolute w-100 alert-log";
        alertDiv.textContent = message;
        document.getElementById('container-card').appendChild(alertDiv);
      
        setTimeout(() => {
          document.getElementById('container-card').removeChild(alertDiv);
        }, 4000);
      }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let nombre = document.getElementById("nombre").value;
        let password = document.getElementById("clave").value;
        let correo = document.getElementById("correo").value;
        let dni = document.getElementById("dni").value;
        
        try {
          const response = await payloadData(nombre, password,dni,correo);
      
          if (response && response.ok) {
            navigate('/login');
          }
          else showErrorAlert("Algo ha ocurrido mal");
          
        } catch (error) {
          showErrorAlert("Algo ha ocurrido mal");
          console.log(error);
        }
      };

  return (
    <>
      <Header />

      <section className="background-filter vw-100 vh-100 d-flex justify-content-center align-items-center">
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
              <div className="card-body d-flex justify-content-center my-2 align-items-center">
                <form className="d-flex flex-column col-sm-9 col-md-9" >
                <center><h1>Register</h1></center>
                <label className="my-2">Ingrese su Nombres</label>
                <input id="nombre" pattern="/[A-Za-z0-9]/" className="border-0 border-bottom" name="txtNombre" placeholder="Ej: Pedro"></input>
                <label className="my-2">Ingrese su DNI</label>
                <input id="dni" pattern="^\d{8}$" title="Ingresa un DNI válido (8 dígitos numéricos)"  className="border-0 border-bottom" name="txtApellido" placeholder="Ej: 111111111"></input>
                <label className="my-2">Ingrese su Correo</label>
                <input id="correo" className="border-0 border-bottom" type="email" name="txtEmail" placeholder="Ej: user@gmail.com"></input>
                <label className="my-2">Ingrese su clave</label>
                <input id="clave" className="border-0 border-bottom" type="password" autoComplete="true" placeholder="Ej. ******"></input>
                <button onClick={handleSubmit} type="submit" className="my-4 btn btn-primary">Ingresar</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
