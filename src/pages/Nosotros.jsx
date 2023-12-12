import Header from "../components/Header";
import img from '../assets/NosotrosBg.webp'
import Footer from "../components/Footer";

const Nosotros = () => {

return(
    <>
    <Header/>

    <section className="d-block position-relative">
        <img className="w-100" height={400} src={img}/>
        <h1 className="position-absolute top-50 ms-4 text-light">Nosotros</h1>
    </section>
        <section className="w-50 d-block m-auto my-3 h5 text-center card">
            <div className="p-2 my-2">
        Bienvenidos a la Institución Educativa San Luis Gonzaga de Ica, donde la excelencia académica se une con 
        valores arraigados en nuestra historia y comunidad. Nuestro colegio de secundaria es un espacio vibrante 
        y acogedor que va más allá de la enseñanza tradicional. Aquí, cultivamos el crecimiento integral de
         nuestros estudiantes, promoviendo no solo el conocimiento, sino también el desarrollo personal y social.
         </div>
        <br></br>
        <div className="p-2 my-2">
        En San Luis Gonzaga de Ica, nos esforzamos por formar ciudadanos comprometidos con valores como la solidaridad, 
        el compañerismo y la responsabilidad social. Nuestros alumnos participan activamente en proyectos comunitarios, 
        entendiendo el impacto positivo que pueden tener en su entorno y preparándose para ser agentes de cambio en la sociedad.
        </div>
<br></br>

<div className="p-2 my-2">

Únete a nuestra comunidad educativa, donde la tradición se encuentra con la innovación, y donde cada alumno es impulsado a alcanzar sus metas académicas y personales, desarrollando las habilidades necesarias para enfrentar los desafíos del mundo con confianza y determinación. En San Luis Gonzaga de Ica, el futuro comienza hoy. ¡Te damos la bienvenida a una experiencia educativa transformadora!
        </div>
        </section>

    <Footer/>

    </>
)

}

export default Nosotros;