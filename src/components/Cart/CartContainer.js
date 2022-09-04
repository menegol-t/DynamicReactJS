import React from 'react';
import { CartContext } from "../../context/CartContext"
import { useContext, useEffect } from "react";
import CartItems from './CartItems';
import { addDoc, collection, getFirestore } from "firebase/firestore";
import Swal from "sweetalert2"

const CartContainer = () => {

    const {cart} = useContext(CartContext)
    
    const {finalPrice} = useContext(CartContext);

    const {cleanCart} = useContext(CartContext)

    const impuestoIva = finalPrice * 0.21

    const precioFinal = impuestoIva + finalPrice

    const userWhoOrdered = async() => {
      const { value: formValues } = await Swal.fire({
        title: 'Ingresa tus datos para finalizar la compra!',
        html:
          '<input id="swal-input1" class="swal2-input" placeholder="Nombre" type="text" required>' +
          '<input id="swal-input2" class="swal2-input" placeholder="Apellido" type="text" required>' +
          '<input id="swal-input3" class="swal2-input -webkit-appearance: none; -moz-appearance: none; appearance: none;" placeholder="Telefono simplificado" type="number" min="0" onkeydown="javascript: return [`Backspace`,`Delete`,`ArrowLeft`,`ArrowRight`].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code!==`Space`">' +
          '<input id="swal-input4" class="swal2-input" placeholder="Email">' +
          '<input id="swal-input5" class="swal2-input" placeholder="Ingresa tu Email nuevamente" type="email">',
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value,
            document.getElementById('swal-input2').value,
            document.getElementById('swal-input3').value,
            document.getElementById('swal-input4').value,
            document.getElementById('swal-input5').value
          ]
        }
      })
      if (formValues.includes("")) {
        Swal.fire({
          icon: 'warning',
          title: 'Datos incompletos',
          text: "Asegurate de completar todos los campos."
        })
      }else if(formValues[3] !== formValues[4] || !formValues[3].includes("@")){
        Swal.fire({
          icon: 'warning',
          title: 'Email no valido',
          text: "Recuerda ingresalo las dos veces igual, y con '@'."
        })
      }else{
        let user = {
          name: formValues[0],
          surname: formValues[1],
          phone: formValues[2],
          email: formValues[3]
        }
        sendOrder(user)
      }}

    const sendOrder = (user) => {
      const newOrder = {
        buyer: user, 
        items: cart, 
        date: new Date().toString(),
        total: precioFinal,
        status: "generada"
      } 
      const db = getFirestore()
      const orderCollection = collection(db, "order")
      addDoc(orderCollection, newOrder).then(({id}) => 
      {console.log({id})
      Swal.fire({
        icon: 'success',
        title: `Compra exitosa, ${newOrder.buyer.name}! Id: ${id}`,
        showConfirmButton: true
      })
      }).then(cleanCart).catch((error) => console.error(error))
      console.log(newOrder);
    }

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
                <p className="mb-2">${finalPrice}</p>
              </div>
              <hr className="my-4"/>
              <div className="d-flex justify-content-between mb-4" >
                <p className="mb-2">Impuestos (IVA)</p>
                <p className="mb-2">${impuestoIva}</p>
              </div>
              <button type="button" className="btn bgBrown btn-block btn-lg" onClick={userWhoOrdered}>
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