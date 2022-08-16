import { CartContext } from "../../context/CartContext";
import CartWidgetIMG from "./CartWidget.png"
import { useContext } from "react";

const CartWidget = () =>{
    const {cantInCart} = useContext(CartContext);

    return(
        <div className="">
            <img src={CartWidgetIMG} className="d-flex width4 " alt="Carrito de compras."/>
            <h2 className="txtMed2">{cantInCart}</h2>
        </div>
    )
}

export default CartWidget