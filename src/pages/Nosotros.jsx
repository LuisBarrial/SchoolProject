import Header from "../components/Header";
import img from '../assets/NosotrosBg.webp'

const Nosotros = () => {

return(
    <>
    <Header/>

    <section className="d-block position-relative">
        <img className="w-100" height={400} src={img}/>
        <h1 className="position-absolute top-50 ms-4 text-light">Nosotros</h1>
    </section>

    
    </>
)

}

export default Nosotros;