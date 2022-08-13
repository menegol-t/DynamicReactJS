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

        const itemDuplicadoIndex = cart.findIndex((itemInTheCart) => itemInTheCart.id === item.id)

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

    const totalPrice = cart.reduce((accumulator, object) => {
        return accumulator += object.precio * object.cantidadAlCarrito
    }, 0);


    return(
        <CartContext.Provider value={{cart, isInCart, cleanCart, addToCart, removeFromCart, 
        cantInCart: totalCarrito, finalPrice: totalPrice}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider

/*El cart es un array que empieza vacio L6. Para verificar si hay o no un producto devolviendo true o false L9. 
Para vaciar el carrito L13. Para añadir al carrito: Se recibe cualquiera item que se va a añadir y su cantidad 
L16. Se crea una constante que me devuelve el Indice de un item si es que ya estaba en el carrito. Si no estaba, 
me devuelve -1 L18. Si no hay nada previamente en el carrtio, se setea el array del carrito a incluir un objeto 
que tenga el item a incluir y la cantidad a llevarse. Si el carrito no esta vacio, se verifica si la variable 
itemDuplicadoIndex me haya devuelto el index de un item que ya estuveira en el carrito. Si me devuelve un index 
valido, uso ese index en el carrito para modificar la cantidad antigua del item a la cantidad nueva mas la cantidad 
vieja. Si no me devuelve un idex valido (es decir me devuelve -1), simplemente agarro lo que ya habia en el carrito 
y le añado el nuevo item. Para remover un item del carrito, creo un nuevo array que cumpla con la condicion de no 
incluir el item que quiero eliminar, y seteo ese nuevo array como el carrito. Para consultar el total de items en el 
carrito, solo acumulo la propiedad cantidadAlCarrito de todos los objetos del array. Para calcular el precio total, 
hago lo mismo.   */