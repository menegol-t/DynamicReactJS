import React from 'react';
import { CartContext } from "../../context/CartContext"
import { useContext, useEffect } from "react";
import CartItems from './CartItems';

const CartContainer = () => {

    const {cart} = useContext(CartContext)
    
    const {totalPrice} = useContext(CartContext)

    const {cleanCart} = useContext(CartContext)

    const {impuestoIva} = useContext(CartContext)

    const {precioFinal} = useContext(CartContext)

    const {userDataOrder} = useContext(CartContext)

    useEffect(() => {
      window.scrollTo({top: 0, behavior: 'auto'})
    }, []);

    return (
    <section className="h-100 h-custom mb-5 mt-auto">
      <div className="container h-100 py-3">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-10 ">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="h5 txtMed2">Carrito de compras</th>
                    <th scope="col" className='txtMed txtCenter'>Quitar</th>
                    <th scope="col" className='txtMed txtCenter'>Cantidad</th>
                    <th scope="col" className='txtMed txtCenter'>Unidad</th>
                    <th scope="col" className='txtMed txtCenter'>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  
                  {cart.map((itemCarrito) =><CartItems key={itemCarrito.id} itemCarrito={itemCarrito}/>)}   
                  
                </tbody>
              </table>
            </div>
            <div className="col-md-6  offset-md-3 mb-5 mt-5 txtCenter">
              <button type="button" className="btn btn-info btn-block btn-lg" onClick={()=> cleanCart()}>
                <div className="d-flex justify-content-between">
                  <span className='txtSmall2'>Limpiar carrito</span>
                </div>
              </button>
            </div>
            <div className="col-md-6 offset-md-3">
              <div className="d-flex justify-content-between" >
                <p className="mb-2">Total (sin IVA)</p>
                <p className="mb-2">${totalPrice}</p>
              </div>
              <hr className="my-4"/>
              <div className="d-flex justify-content-between mb-4" >
                <p className="mb-2">Impuestos (IVA)</p>
                <p className="mb-2">${impuestoIva}</p>
              </div>
              <button type="button" className="btn bgBrown btn-block btn-lg" onClick={userDataOrder}>
                <div className="d-flex justify-content-between">
                  <span className='txtSmall2'>Terminar la compra, total:</span>
                  <span className='txtSmall2'>${precioFinal}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>  
    ); 
}

export default CartContainer;