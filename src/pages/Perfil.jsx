
const Perfil = () => {


    return(<>
    <div className="d-flex align-items-center flex-wrap">
        <button className="mx-1 btn h-50 d-block btn-info">Nuevo</button>
        <div className="w-100 d-flex flex-wrap">
            <input
                className="form-control my-2 mx-1 w-100"
                type="search"
                onChange={(e) => {
                    console.log(e.target.value)
                }}
                placeholder="Busca un profesor por área"
            />
            <input
                className="form-control my-2 mx-1 w-100"
                type="search"
                onChange={(e) => {
                    console.log(e.target.value)
                }}
                placeholder="Busca un profesor"
            />
        </div>
    </div>
    </>)

}
export default Perfil;