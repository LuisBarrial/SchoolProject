import Header from "../components/Header";
import img from "../assets/img-classrom.webp";
const Login = () => {

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
        showErrorAlert("Algo ha ocurrido mal");
        //var name = document.getElementById("login").value;
        //var password = document.getElementById("clave").value;
        /*
        try {
          const response = await auth(name, password);
      
          if (response && response.ok) {
            navigate('/');
          }
        } catch (error) {
          console.log(error);
        }*/
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
              height: '90%'
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
                <span  className="user-select-none" >No tienes cuenta? <span className="text-info user-select-none" style={{cursor: 'pointer'}}>Ingrese aqui</span></span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
