import { CartContext } from "../../context/CartContext";
import CartWidgetIMG from "./CartWidget.png"
import { useContext } from "react";

const CartWidget = () =>{
    const {cantInCart} = useContext(CartContext);

    return(
        <div className="d-flex">
            <h2 className="txtMed">{cantInCart}</h2>
            <img src={CartWidgetIMG} className=" width3 " alt="Carrito de compras."/>
        </div>
    )
}

export default CartWidget