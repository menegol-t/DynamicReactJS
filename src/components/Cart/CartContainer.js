import React from 'react';
import { CartContext } from "../../context/CartContext"
import { useContext } from "react";
import CartItems from './CartItems';
import { addDoc, collection, getFirestore } from "firebase/firestore";
import Swal from "sweetalert2"

const CartContainer = () => {
    const user = {
      name: "Coder",
      phone: 112233,
      email: "coderHouse@mail.com"
    }

    const {cart} = useContext(CartContext)
    
    const {finalPrice} = useContext(CartContext);

    const {cleanCart} = useContext(CartContext)

    const impuestoIva = finalPrice * 0.21

    const precioFinal = impuestoIva + finalPrice

    const sendOrder = () => {
      const newOrder = {
        buyer: user, 
        items: cart, 
        date: new Date().toString(),
        total: precioFinal,
      }
      const db = getFirestore()
      const orderCollection = collection(db, "order")
      addDoc(orderCollection, newOrder).then(({id}) => 
      {console.log({id})
      Swal.fire({
        icon: 'success',
        title: `Se registro tu compra! Id: ${id}`,
        showConfirmButton: true,
      })
      }).catch((error) => console.error(error))
      console.log(newOrder);
    }

    return (
    <section className="h-100 h-custom mb-5 mt-5">
      <div className="container h-100 py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-10 ">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="h5 txtMed2">Carrito de compras</th>
                    <th scope="col" className='txtMed txtCenter'>Quitar</th>
                    <th scope="col" className='txtMed txtCenter'>Cantidad</th>
                    <th scope="col" className='txtMed txtCenter'>Precio</th>
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
                <p className="mb-2">Subtotal</p>
                <p className="mb-2">${finalPrice}</p>
              </div>
              <hr className="my-4"/>
              <div className="d-flex justify-content-between mb-4" >
                <p className="mb-2">Impuestos (IVA)</p>
                <p className="mb-2">${impuestoIva}</p>
              </div>
              <button type="button" className="btn bgBrown btn-block btn-lg" onClick={sendOrder}>
                <div className="d-flex justify-content-between">
                  <span className='txtSmall2'>Terminar la compra</span>
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

/*function toast(){
    Toastify({
        text: "Te avisaremos cuando se habiliten las compras!",
        duration: 3000,
        gravity: "bottom",
        style: {
            background: "#E0A367",
          }
    }).showToast();
} */