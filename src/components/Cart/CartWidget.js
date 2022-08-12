import { CartContext } from "../../context/CartContext";
import CartWidgetIMG from "./CartWidget.png"
import { useContext } from "react";

const CartWidget = () =>{
    const {cantInCart} = useContext(CartContext);

    return(
        <>
            <img src={CartWidgetIMG} className="d-flex width4 " alt="Carrito de compras."/>
            <h2 className="txtMed2">{cantInCart}</h2>
        </>
    )
}

export default CartWidget