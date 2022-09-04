import { createContext, useState } from "react";
import Swal from "sweetalert2"
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        position: "bottom-right",
        autoClose: 3500,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    })}

    const addToCart = (item, amountToCart) => {

        const indexOfDuplicatedItem = cart.findIndex((itemInTheCart) => itemInTheCart.id === item.id)
        
        if (cart.length === 0){

            const itemToBeAdded = { ...item, amountToCart: amountToCart }
            
            setCart([itemToBeAdded])

            toastify()

        }else if(indexOfDuplicatedItem !== -1){

            const itemToAdd = { ...item, amountToCart: cart[indexOfDuplicatedItem].amountToCart + amountToCart }

            const cartCopy = [...cart]
            
            if( itemToAdd.amountToCart <= cartCopy[indexOfDuplicatedItem].stock ){

                cartCopy[indexOfDuplicatedItem] = itemToAdd

                setCart(cartCopy)

                toastify()
            
            }else{
                Swal.fire({ icon: 'error', title: `No tenemos tanto stock!`, showConfirmButton: true})
            }

        }else{

            const itemToBeAdded = { ...item, amountToCart: amountToCart }

            const cartCopy = [...cart, itemToBeAdded]
            
            setCart(cartCopy)

            toastify()
        }   
    }
    
    const removeFromCart = (item) => {
        setCart(cart.filter((prod) => prod.id !== item.id))
    }

    const amountNowInCart = cart.reduce((accumulator, object) => {
        return accumulator + object.amountToCart;
    }, 0)

    const totalPrice = cart.reduce((accumulator, object) => {
        return accumulator + object.precio2 * object.amountToCart
    }, 0);

    const ivaTax = totalPrice * 0.21

    const finalCheckoutPrice = ivaTax + totalPrice

    return(
        <CartContext.Provider value={{cart, isInCart, cleanCart, addToCart, removeFromCart,  amountNowInCart, totalPrice, finalCheckoutPrice, ivaTax}}>
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
si la variable indexOfDuplicatedItem me devolvió el index de un item que ya estaba en el carrito. Si me devuelve un 
index valido L27, uso ese index en el carrito para modificar la cantidad antigua del item a: la cantidad nueva + 
la cantidad vieja L29. Esto solo funciona si la cantidad a añadir + la cantidad ya añadida no son en total > que 
el stock disponible de ese producto L33. Si no me devuelve un idex valido L44 (es decir me devuelve -1), agarro 
lo que ya habia en el carrito y le añado el nuevo item L48. Para remover un item del carrito L55, creo un nuevo 
array que incluye a todos los items previos excepto al que quiero eliminar, y seteo ese nuevo array como el 
carrito L56. Para consultar el total de items en el carrito L60, solo acumulo la propiedad amountToCart de 
todos los objetos del array. Para calcular el precio total L64, hago lo mismo.   */