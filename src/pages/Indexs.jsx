import { useEffect } from "react";
import Header from "../components/Header";
import img from "../assets/BetterImageCollege3.webp";
import imgicon1 from "../assets/peruicon.png";
import imgicon2 from "../assets/educacion.png" ;
import imgicon3 from "../assets/universidad.png";
import Footer from "../components/Footer";


const Index = () => {
  useEffect(() => {
    let textoMain = document.getElementById("txt-main");
    let icons = document.querySelectorAll(".icon");

    function verificarObserver(entries) { /*usando los observers para que los iconos
     aparezcan al saber que estan en el vierport*/
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          textoMain.classList.add("animation-observers");
          icons.forEach((icon) => {
            icon.classList.add("animation-observers");
          });
        } else {
          console.log("elemento no visible");
        }
      });
    }

    let observer = new IntersectionObserver(verificarObserver, {});

    if (textoMain) {
      observer.observe(textoMain);
    }

    if (icons.length > 0) {
      // Observar todos los elementos .icon
      icons.forEach((icon) => {
        observer.observe(icon);
      });
    }
  }, []);

  return (
    <>
      <Header />
      <main className="position-relative" style={{zIndex: "-1"}}>
        <span
          id="txt-main"
          className="text-light position-absolute h1 top-50 z-2"
          style={{
            transform: "translate(-50%,-50%)",
            left: "50%",
            textAlign: "center",
          }}
        >
          Institucion Educativa San Luis Gonzaga de Ica
        </span>
        <img
          rel="preload"
          className="overflow-hidden user-select-none "
          style={{
            width: "100%",
            height: "100svh",
            filter: "brightness(0.6)",
            zIndex: "1",
          }}
          src={img}
          alt="colegio-san-luis-gonzaga-ica"
        />
        <div
          className="position-absolute d-flex justify-content-around w-100 top-100 user-select-none"
          style={{ transform: "translateY(-200%)" }}
        >
          <img
            rel="preload"
            className="icon"
            src={imgicon1}
            alt="icono-peru"
          />
          <img className="icon" rel="preload" src={imgicon2} alt="icono-2" />

          <img className="icon" rel="preload" src={imgicon3} alt="icono-3" />
        </div>
      </main>
      <Footer/>
    </>
  );
};

export default Index;
