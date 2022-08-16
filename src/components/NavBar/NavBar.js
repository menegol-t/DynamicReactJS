import CartWidget from "../Cart/CartWidget"
import { Link } from "react-router-dom"
import { CartContext } from "../../context/CartContext"
import { useContext } from "react";

const NavBar = ()=> {
    const {cart} = useContext(CartContext)
    let condition
    cart.length === 0 ? condition = false : condition = true

    return (
    <>
        <div className="div__header" id="cartel">
            <p className="txtCenter txtSmall txtWhite"> <span className="txtWhite ">Premium designer eyewear.</span></p>
        </div>
        
        <nav className="navbar navbar-expand-lg navbar-light bgBrown nav_sitcky" id="nav__sticky">

            <div className="container-fluid">

                <Link to="/" className="navbar-brand">
                    <h1 className="txtLeft fontSpecial animate__pulse ms-3">AUBIER</h1>
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav m-auto mb-2 mb-lg-0 txtMed">
                            <li className="nav-item">
                                <Link to="/" className="nav-link active" aria-current="page">Productos</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/category/dijon" className="nav-link active">Dijon</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/category/nantes" className="nav-link active">Nantes</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/category/lemans" className="nav-link active">Le Mans</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/category/lyon" className="nav-link active">Lyon</Link>
                            </li>
                        </ul>
                </div>
                {condition ? <Link to="/cart" className="nav-link active"><CartWidget/></Link> : <></>}
            </div>
        </nav>
    </>
    )
}
export default NavBar

/**/