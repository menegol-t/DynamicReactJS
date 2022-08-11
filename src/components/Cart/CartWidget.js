import CartWidgetIMG from "./CartWidget.png"
/* usa boostrap y css de que saca de NavBar.css */
const CartWidget = () =>{
    return(
        <img src={CartWidgetIMG} className="d-flex width4 img__margin" alt="Carrito de compras."/>
    )
}

export default CartWidget