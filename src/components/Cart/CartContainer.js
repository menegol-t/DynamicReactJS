import React from 'react';
import { CartContext } from "../../context/CartContext"
import { useContext} from "react";
import Swal from "sweetalert2"
import { addDoc, collection, getFirestore } from "firebase/firestore";
import CartDetail from './CartDetail';

const CartContainer = () => {

    const {cart} = useContext(CartContext)
  
    const {cleanCart} = useContext(CartContext)

    const {finalCheckoutPrice} = useContext(CartContext)

    const userDataOrder = async() => {
      const { value: formValues } = await Swal.fire({
        title: 'Ingresa tus datos para finalizar la compra!',
        html:
          '<input id="swal-input1" class="swal2-input" placeholder="Nombre" type="text" required>' +
          '<input id="swal-input2" class="swal2-input" placeholder="Apellido" type="text" required>' +
          '<input id="swal-input3" class="swal2-input -webkit-appearance: none; -moz-appearance: none; appearance: none;" placeholder="Telefono simplificado" type="number" min="0" onkeydown="javascript: return [`Backspace`,`Delete`,`ArrowLeft`,`ArrowRight`].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code!==`Space`">' +
          '<input id="swal-input4" class="swal2-input" placeholder="Email">' +
          '<input id="swal-input5" class="swal2-input" placeholder="Confirmar Email" type="email">',
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
      if(formValues !== undefined){
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
              sendOrder(formValues)
      }}
  }

  const sendOrder = (formValues) => {
      let user = {
          name: formValues[0],
          surname: formValues[1],
          phone: formValues[2],
          email: formValues[3]
      }

      const newOrder = {
          buyer: user, 
          items: cart, 
          date: new Date().toString(),
          total: finalCheckoutPrice,
          status: "accepted"
      } 

      const db = getFirestore()
      const orderCollection = collection(db, "order")
      addDoc(orderCollection, newOrder).then(({id}) => 
      {console.log({id})
      Swal.fire({
          icon: 'success',
          title: `Compra exitosa, ${newOrder.buyer.name}! Id: ${id}`,
          showConfirmButton: true,
          allowOutsideClick: false
      })
      }).then(cleanCart).catch((error) => console.error(error))
      console.log(newOrder);
  }

    return (
      <CartDetail cart={cart} cleanCart={cleanCart} finalCheckoutPrice={finalCheckoutPrice} userDataOrder={userDataOrder} />
    ); 
}

export default CartContainer;