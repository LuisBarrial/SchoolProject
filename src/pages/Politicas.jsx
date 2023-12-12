import Header from "../components/Header";
import img from '../assets/NosotrosBg.webp'
import Footer from "../components/Footer";

const Politicas = () => {

return(
    <>
    <Header/>

    <section className="d-block position-relative">
        <img className="w-100" height={400} src={img}/>
        <h1 className="position-absolute top-50 ms-4 text-light">Politicas</h1>
    </section>
    <section className="w-50 d-block m-auto h5 text-center card my-3">

    <div className="p-2 my-2">

    En la Institución Educativa San Luis Gonzaga de Ica, nos comprometemos a mantener un entorno seguro y respetuoso 
    
    para todos los miembros de nuestra comunidad. Promovemos la igualdad de oportunidades y rechazamos cualquier 
    forma de discriminación o acoso.
    </div>
    <br></br>

    <div className="p-2 my-2">

    Valoramos la honestidad, la ética y el respeto mutuo entre estudiantes, profesores y personal administrativo. 
    
    Fomentamos la responsabilidad y la puntualidad en el cumplimiento de tareas académicas y compromisos establecidos.

    Priorizamos la comunicación abierta y efectiva entre todos los involucrados en el proceso educativo. 
    </div>
    <br></br>

    <div className="p-2 my-2">

    
    Respetamos la diversidad de opiniones y fomentamos el diálogo constructivo como herramienta para resolver conflictos.

    Nuestro compromiso incluye el cuidado del medio ambiente. 
    </div>
</section>
    <Footer/>
    </>
)

}

export default Politicas;