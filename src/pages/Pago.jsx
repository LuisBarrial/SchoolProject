import { isDark } from "../mock/constFunction";
import { DARKMODE } from "../mock/constVariable";

const Pago = () => {

    const isDarkModeStored = localStorage.getItem("dark") === DARKMODE.TRUE;
    const isClassNameDark = isDark(isDarkModeStored);

    return(<>
    
    <div>
        <h1>Matricula</h1>
        <div className={"mt-5 bg-light w-75 container p-5 rounded-4 border border-light " + isClassNameDark} >
            <div className="position-relative w-100 top-50">
                <section className="position-relative">
                    <h2 className="matricula_title ">Estado Matricula</h2>
                    <span className="h1 d-block w-100 overflow-hidden" style={{height:'20px', letterSpacing: '0.3rem', lineHeight: '0.1'}}>.....................................................................</span>
                    <div className="d-flex w-100 justify-content-center justify-content-md-between align-items-center mx-auto flex-wrap flex-md-nowrap">
                    <div className="d-flex flex-column align-items-center text-center">
                        <span className="h5 my-4 mx-3">Monto a pagar : 400</span>
                        <span className="h5 my-4 mx-3">Estado: PAGADO</span>

                    </div>
                    <button className="btn btn-info px-4 py-2 rounded-4"> <span className="h6">Pagar</span></button>
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