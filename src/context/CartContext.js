import { createContext, useState } from "react";

export const CartContext = createContext({})

const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);

    const isInCart = (item) => {
        return cart.some((prod) => prod.id === item.id)
    }

    const cleanCart = () => {
        setCart([])
    }

    const addToCart = (item, cantidadAlCarrito) => {

        const itemDuplicadoIndex = cart.findIndex((itemInTheCart) => itemInTheCart.id == item.id)

        if (cart.length === 0){
            const itemToBeAdded = {
                ...item, cantidadAlCarrito: cantidadAlCarrito
            }
            setCart([itemToBeAdded])
            console.log(itemToBeAdded);
            return
        }else if(itemDuplicadoIndex > 0){
            const itemToAdd = {
                ...item, cantidadAlCarrito: cart[itemDuplicadoIndex].cantidadAlCarrito + cantidadAlCarrito
            }
            const cartCopy = [...cart]
            cartCopy[itemDuplicadoIndex] = itemToAdd
            setCart(cartCopy)
            console.log(cartCopy)
        }else{
            const itemToBeAdded = {
                ...item, cantidadAlCarrito: cantidadAlCarrito
            }
            const cartCopy = [...cart, itemToBeAdded]
            setCart(cartCopy)
            console.log([cartCopy])
        }   
    }

    const removeFromCart = (item) => {
        setCart(cart.filter((prod) => prod.id !== item.id))
    }

    const totalCarrito = cart.reduce((accumulator, object) => {
        return accumulator + object.cantidadAlCarrito;
    }, 0)

    const totalPrice = () => cart.reduce((accumulator, prod) => {
        return accumulator += prod.precio * prod.cantidadAlCarrito
    }, 0);
    

    return(
        <CartContext.Provider value={{cart, isInCart, cleanCart, addToCart, removeFromCart, 
        cantInCart: totalCarrito}}>
            {children}
        </CartContext.Provider>
    )

}

export default CartProvider