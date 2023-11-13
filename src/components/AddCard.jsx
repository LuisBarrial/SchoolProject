import PropTypes from "prop-types";
import { isDark } from "../mock/constFunction";
import { DARKMODE } from "../mock/constVariable";

const AddCard = ({headers}) => {

    const headers2 = headers.filter((e)=>e !="Id") 
    console.log(headers2)

    const isDarkModeStored = localStorage.getItem("dark") === DARKMODE.TRUE;
    const isClassNameDark = isDark(isDarkModeStored);

    

    return(
        <>
        <div className="position-absolute top-50 start-50 p-2 card p-3 col-8 col-md-4 d-flex justify-content-center " style={{transform: "translate(-50%, -50%)"}}>

            <form className="p-3 d-flex justify-content-center text-center flex-column ">
                <fieldset className=" d-flex flex-column justify-content-center" >
                <legend>Agregar Data</legend>
                {headers2.map((e,i)=>{return(<label className="m-2" key={i}>Ingrese el nuevo {e}<br/><input className="text-center input-group m-auto w-75"></input></label>)})}
                
                </fieldset>
                <button type="submit" className=" d-block m-auto mt-3 btn btn-info w-25">Agregar</button>
            </form>

        </div>
        
        </>
    )

}

export default AddCard;

AddCard.propTypes = {
    headers: PropTypes.array
}