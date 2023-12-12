import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";


export const DataContext = createContext(); /*Estableciendo contexto para poder acceder desde todos los componentes 
del dashboaard*/

export function DataContextProvider(props){
    const token = localStorage.getItem("jwt");
    let deco = {};
    if(token){
        const decoded = jwtDecode(token);
        deco = decoded;
        console.log(deco);
    }
    const [contextData,setContextData]=useState(deco);
    const valor = {contextData,setContextData};
    return(
        <DataContext.Provider value={valor}>
        
            {props.children}
        </DataContext.Provider>
    );
}

DataContextProvider.propTypes = {
    children: PropTypes.node
}
