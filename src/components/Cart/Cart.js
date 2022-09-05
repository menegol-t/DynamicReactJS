import React from 'react';
import { CartContext } from "../../context/CartContext"
import { useContext } from "react";
import CartContainer from './CartContainer';
import EmptyCart from './EmptyCart';

const Cart = () => {
  const {cart} = useContext(CartContext)

  return(cart.length === 0 ? <EmptyCart/> : <CartContainer/>)
}

export default Cart;
