import { createContext, useState } from "react";
import Swal from "sweetalert2"
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDoc, collection, getFirestore } from "firebase/firestore";

export const CartContext = createContext({})

const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);

    const isInCart = (item) => {
        return cart.some((prod) => prod.id === item.id)
    }

    const cleanCart = () => {
        setCart([])
    }

    const toastify = () => {toast.success("Vamos al carrito!", {
        position: "bottom-left",
        autoClose: 3500,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    })}

    const addToCart = (item, cantidadAlCarrito) => {

        const itemDuplicadoIndex = cart.findIndex((itemInTheCart) => itemInTheCart.id === item.id)
        
        if (cart.length === 0){

            const itemToBeAdded = { ...item, cantidadAlCarrito: cantidadAlCarrito }
            
            setCart([itemToBeAdded])

            toastify()

        }else if(itemDuplicadoIndex !== -1){

            const itemToAdd = { ...item, cantidadAlCarrito: cart[itemDuplicadoIndex].cantidadAlCarrito + cantidadAlCarrito }

            const cartCopy = [...cart]
            
            if( itemToAdd.cantidadAlCarrito <= cartCopy[itemDuplicadoIndex].stock ){

                cartCopy[itemDuplicadoIndex] = itemToAdd

                setCart(cartCopy)
                console.log(cartCopy)

                toastify()
            
            }else{
                Swal.fire({ icon: 'error', title: `No tenemos tanto stock!`, showConfirmButton: true})
            }

        }else{

            const itemToBeAdded = { ...item, cantidadAlCarrito: cantidadAlCarrito }

            const cartCopy = [...cart, itemToBeAdded]
            
            setCart(cartCopy)
            console.log([cartCopy])

            toastify()
        }   
    }
    
    const removeFromCart = (item) => {
        setCart(cart.filter((prod) => prod.id !== item.id))
    }

    const cantInCart = cart.reduce((accumulator, object) => {
        return accumulator + object.cantidadAlCarrito;
    }, 0)

    const totalPrice = cart.reduce((accumulator, object) => {
        return accumulator + object.precio2 * object.cantidadAlCarrito
    }, 0);

    const impuestoIva = totalPrice * 0.21

    const precioFinal = impuestoIva + totalPrice

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
                let user = {
                  name: formValues[0],
                  surname: formValues[1],
                  phone: formValues[2],
                  email: formValues[3]
                }
                sendOrder(user)
        }}
    }
  
    const sendOrder = (user) => {
    const newOrder = {
        buyer: user, 
        items: cart, 
        date: new Date().toString(),
        total: precioFinal,
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

    return(
        <CartContext.Provider value={{cart, isInCart, cleanCart, addToCart, removeFromCart, userDataOrder,  cantInCart, totalPrice, precioFinal, impuestoIva}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider

/*El cart es un array que empieza vacio L6. Para verificar si hay o no un producto devolviendo true o false L9. 
Para vaciar el carrito L13. Para añadir al carrito: Se recibe cualquier item que se va a añadir y su cantidad 
L16. Se crea una constante que me devuelve el Indice de un item si es que ya estaba en el carrito. Si no estaba, 
me devuelve -1 L18. Si no hay nada previamente en el carrtio L20, se setea el array del carrito L24 a incluir 
un objeto que tenga el item y la cantidad a solicitada L22. Si el carrito no esta vacio L27 & L44, se verifica 
si la variable itemDuplicadoIndex me devolvió el index de un item que ya estaba en el carrito. Si me devuelve un 
index valido L27, uso ese index en el carrito para modificar la cantidad antigua del item a: la cantidad nueva + 
la cantidad vieja L29. Esto solo funciona si la cantidad a añadir + la cantidad ya añadida no son en total > que 
el stock disponible de ese producto L33. Si no me devuelve un idex valido L44 (es decir me devuelve -1), agarro 
lo que ya habia en el carrito y le añado el nuevo item L48. Para remover un item del carrito L55, creo un nuevo 
array que incluye a todos los items previos excepto al que quiero eliminar, y seteo ese nuevo array como el 
carrito L56. Para consultar el total de items en el carrito L60, solo acumulo la propiedad cantidadAlCarrito de 
todos los objetos del array. Para calcular el precio total L64, hago lo mismo.   */