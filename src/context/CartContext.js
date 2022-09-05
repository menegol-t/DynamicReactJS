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