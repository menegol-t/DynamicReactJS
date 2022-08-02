import "./NavBar.css"
import CartWidget from "../CartWidget"

const NavBar = ()=> {
    return (
    <>
        <div className="div__header" id="cartel">
            <p className="txtCenter txtSmall txtWhite"> <span className="txtWhite ">Premium designer eyewear.</span></p>
        </div>
        
        <nav className="navbar navbar-expand-lg navbar-light bgBrown nav_sitcky" id="nav__sticky">

            <div className="container-fluid">

                <a className="navbar-brand" href="index.html">
                    <h1 className="txtLeft fontSpecial animate__pulse ms-3">AUBIER</h1>
                </a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav m-auto mb-2 mb-lg-0 txtMed">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="index.html">Inicio</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="pages/productos.html">Productos</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="pages/novedades.html">Novedades</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="pages/nosotros.html">Nosotros</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="pages/faq.html">FAQ</a>
                            </li>
                        </ul>
                </div>
                <CartWidget/>
            </div>
        </nav>
    </>
    )
}
export default NavBar

/*<div id="formBusqueda" className="d-flex me-3 form__width">
<input id="inputBusqueda" className="me-2 txtSmall" type="text" placeholder="Haga click en busqueda..." aria-label="Search" />
<button id="inputBoton" className="btn btn-outline-light btn-lg" type="button"> <span className="txtSmall">Búqueda</span></button>
</div> */