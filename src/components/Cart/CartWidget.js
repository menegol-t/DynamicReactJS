import { CartContext } from "../../context/CartContext";
import CartWidgetIMG from "./CartWidget.png"
import { useContext } from "react";

const CartWidget = () =>{
    const {cantInCart} = useContext(CartContext);

    return(
        <div className="">
            <img src={CartWidgetIMG} className="d-flex width3 " alt="Carrito de compras."/>
            <h2 className="txtMed">{cantInCart}</h2>
        </div>
    )
}

export default CartWidget