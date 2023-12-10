import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { isDark } from "../mock/constFunction";
import { DARKMODE } from "../mock/constVariable";
import { useState } from "react";
import { useModal } from "../Hook/useModal";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const Pago = () => {

    const isDarkModeStored = localStorage.getItem("dark") === DARKMODE.TRUE;
    const isClassNameDark = isDark(isDarkModeStored);
    const [isOpenModal1,openModal1,closeModal1]=useModal(false);
    const stripePromise = loadStripe("pk_test_51MOBvyG2gKdepiJhBcX1hAqTy9VdFr2Q9a6bwIOIxLZM97xPf4iBF6soFQmhLuftXQWeVIJEehrkuFT9en54kFsI00pVL98EO7");


    const CheckoutForm = (props)=>{
        // eslint-disable-next-line react/prop-types
        const pago=props.pago;
    
        const [loading,setLoading]=useState(false);
        const stripe = useStripe();
        const elements = useElements();
    
        const handleSubmit = async (e)=>{
            e.preventDefault();
            const {error,paymentMethod}= await stripe.createPaymentMethod({
                type:'card',
                card: elements.getElement(CardElement)
            })
    
            setLoading(true);   
    
    
    
    
            if(!error){
                const {id} = paymentMethod;

                var datos = {}
                const nombre = "alumno";
                const cantidad = 250;
                datos.nombre = nombre;
                datos.cantidad = cantidad;

        
               try {
                const {data}= await axios.post('http://localhost:3001/api/checkout',{
                    id,
                    amount: 5000,
                    datos: JSON.stringify(datos)
                 })
    
               console.log(data);  
    
               elements.getElement(CardElement).clear();
    
               } catch (error) {
    
                console.log(error);
                
               }
    
    
              setLoading(false);
    
              
            }
    
    
        }
        
    
    
    
        return(
            <form onSubmit={handleSubmit} className="card card-body">
                 <h3 className="text-center my-2">Por favor ingresa tu targeta</h3>
                    <div className="form-group">
                    
                        <div className="targetadecredito">
                            <div className="circuloTg"></div>
                            <div className="circuloTg2"></div>
                            <span id="txtTargeta" className="txtTg">**********{4242}</span>
                            <br></br>
                            <span className='txtTgUser'>userName</span>
                        </div >
                    
                   
                    <CardElement className="my-3 form-control"/>
                    </div>
                <button className="btn btn-success" disabled={!stripe}>
                {loading?  (<div className="spinner-border text-light" role="status">
                </div>)
                : 
                ("Buy")
            }
                </button>
    
    
            </form>
        )
    }

    const handleModalContainerClick = e=>e.stopPropagation();


    return(<>
            <Elements stripe={stripePromise}>
            <div className={`p-4 contenedorModal ${isOpenModal1 && "is-Open"}`} onClick={closeModal1}>
                <div className="row">
                    <div className="sizeModal col-xs-8 col-md-9 mx-md-auto mx-lg-auto col-lg-7" onClick={handleModalContainerClick}>
                    <CheckoutForm isOpen={isOpenModal1} closeModal={closeModal1} pago={400}></CheckoutForm>
                    </div>
                </div>
            </div>
            
            </Elements>
    
    <div>
        <h1>Matricula</h1>
        <div className={"mt-5 bg-light w-75 container p-5 rounded-4 border border-light " + isClassNameDark} >
            <div className="position-relative w-100 top-50">
                <section className="position-relative">
                    <h2 className="matricula_title ">Estado Matricula</h2>
                    <span className="h1 d-block w-100 overflow-hidden" style={{height:'20px', letterSpacing: '0.3rem', lineHeight: '0.1'}}>.....................................................................</span>
                    <div className="d-flex w-100 justify-content-center justify-content-md-between align-items-center mx-auto flex-wrap flex-md-nowrap">
                    <div className="d-flex flex-column align-items-center text-center">
                        <span className="h5 my-4 mx-3" >Monto a pagar : 400</span>
                        <span className="h5 my-4 mx-3">Estado: PAGADO</span>

                    </div>
                    <button className="btn btn-info px-4 py-2 rounded-4" onClick={()=>{openModal1()}}> <span className="h6">Pagar</span></button>
                    </div>
                    <div className="table-responsive">
                    <table className={"table w-100 text-center my-3" + isClassNameDark }>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Descripcion</th>
                                <th>Monto</th>
                                <th>Estado</th>

                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                                <td>MD01201201</td>
                                <td>MatriculaSLG-1</td>
                                <td>300</td>
                                <td>Pagado</td>

                            </tr>
                        </tbody>
                    </table>
                    </div>
                </section> 
            </div>
        </div>
    </div>
    </>)

}
export default Pago;