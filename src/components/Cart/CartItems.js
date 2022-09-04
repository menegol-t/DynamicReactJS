import React from 'react';
import { useContext } from 'react';
import { CartContext } from "../../context/CartContext"

const CartItems = ({cartItem}) => {
    const {removeFromCart} = useContext(CartContext);

    return (
        <tr>
        <th scope="row">
            <div className="d-flex align-items-center">
            <img src={cartItem.src} className="img-fluid rounded-3 width6"
                alt={cartItem.alt}/>
            <div className="flex-column ms-4">
                <p className="mb-2 txtSmall2">{cartItem.nombre}</p>
            </div>
            </div>
        </th>
        <td  className="align-middle ">
            <div>
                <button type="button" className="btn btn-dark btn-lg" onClick={()=> removeFromCart(cartItem)}>Eliminar</button>
            </div>
        </td>
        <td className="align-middle">
            <p className="mb-0 txtMed2 txtCenter">{cartItem.amountToCart}</p>
        </td>
        <td className="align-middle">
            <div className="d-flex flex-row">
                <p className="mb-0 txtMed txtCenter" >{cartItem.precio}</p>
            </div>
        </td>
        <td className="align-middle">
            <div className="d-flex flex-row">
                <p className="mb-0 txtMed txtCenter" >{"$" + cartItem.precio2 * cartItem.amountToCart}</p>
            </div>
        </td>
        </tr>
    );
}  

export default CartItems;
