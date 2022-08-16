import React from 'react';
import { useContext } from 'react';
import { CartContext } from "../../context/CartContext"

const CartItems = ({itemCarrito}) => {
    const {removeFromCart} = useContext(CartContext);

    return (
        <tr>
        <th scope="row">
            <div className="d-flex align-items-center">
            <img src={itemCarrito.src} className="img-fluid rounded-3 width6"
                alt={itemCarrito.alt}/>
            <div className="flex-column ms-4">
                <p className="mb-2 txtSmall2">{itemCarrito.nombre}</p>
            </div>
            </div>
        </th>
        <td  className="align-middle ">
            <div>
                <button type="button" className="btn btn-dark btn-lg" onClick={()=> removeFromCart(itemCarrito)}>Eliminar</button>
            </div>
        </td>
        <td className="align-middle">
            <p className="mb-0 txtMed2 txtCenter">{itemCarrito.cantidadAlCarrito}</p>
        </td>
        <td className="align-middle">
            <div className="d-flex flex-row">
            <p className="mb-0 txtMed txtCenter" >{itemCarrito.precio}</p>
            </div>
        </td>
        </tr>
    );
}  

export default CartItems;
