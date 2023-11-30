import PropTypes from "prop-types";

const RenderCard = ({pregunta,respuesta,isClassNameDark,setCardModal}) => {
    console.log("as");
    return (
      <form
        className={
          "position-absolute d-block flex-column justify-content-center col-8 col-md-4 pt-4  top-50 start-50 z-2" +
          isClassNameDark
        }
        style={{
          backgroundColor: "#e0dada",
          transform: "translate(-50%,-50%)",
          borderRadius: "10px 10px",
        }}
      >
        <h2 className="text-center">Preguntas</h2>
        <div  className="d-flex justify-content-around mb-3">
          <label className="col-sm-2 col-form-label">{pregunta}</label>
          <div className="col-4 me-2">
            <textarea
              style={{ height: "30vh", width: "100%" }}
              type="email"
              className="form-control"
              defaultValue={respuesta}
            />
          </div>
        </div>
        <div className="d-flex">
          <button
            type="button"
            onClick={() => {
              setCardModal(null);
            }}
            className="d-block m-auto btn bg-info mb-3"
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={() => {
              setCardModal(null);
            }}
            className="d-block m-auto btn bg-info mb-3"
          >
            Cerrar
          </button>
        </div>
      </form>
    );
  };

  export default RenderCard;

  RenderCard.propTypes = {
  
    pregunta: PropTypes.string,
    respuesta: PropTypes.string,
    isClassNameDark: PropTypes.string,
    setCardModal: PropTypes.func,

}