import React, { useState } from "react"
import "./ItemCount.css"

const ItemCount = ({ stock, prod}) => {
    let [cantidad, setCantidad] = useState(1)

    if (stock <= 0){
        cantidad = 0

        return(
            <div className="itemCount__div ">
                <h2 className="txtCenter fontSpecial">{prod} "Stock: {stock}"</h2>

                <div className="itemCount__botoncitos">

                    <button className="comprarbtn btn btn-outline-light h-25 txtSmall boton__responsive bgBrown">-</button>
    
                    <p className="txtMed">{cantidad}</p>
    
                    <button className="comprarbtn btn btn-outline-light h-25 txtSmall boton__responsive bgBrown">+</button>
                    
                </div>

                <button className="txtCenter comprarbtn btn btn-outline-light txtSmall boton__responsive bgBrown">Agregar al carrito</button>

            </div>
        )

    }else{
        const agregar = () => {
            setCantidad(cantidad + 1)
        }
    
        const quitar = () => {
            setCantidad(cantidad - 1)
        }
    
        cantidad < 0 ? cantidad = 0 : console.log() 

        cantidad > stock ? cantidad = stock : console.log() 

        const addOnCart = () => {
            cantidad > 0 ? console.log("Estas añadiendo " + cantidad.valueOf() + " " + prod.valueOf() + " a tu carrito.") : console.log()
        }

        return(
            <div className="itemCount__div ">
                <h2 className="txtCenter fontSpecial">{prod} "Stock: {stock}"</h2>

                <div className="itemCount__botoncitos">

                    <button className="comprarbtn btn btn-outline-light h-25 txtSmall boton__responsive bgBrown" onClick={quitar}>-</button>
    
                    <p className="txtMed">{cantidad}</p>

                    <button className="comprarbtn btn btn-outline-light h-25 txtSmall boton__responsive bgBrown" onClick={agregar}>+</button>
                    
                </div>

                <button className="txtCenter comprarbtn btn btn-outline-light txtSmall boton__responsive bgBrown" onClick={addOnCart}>Agregar al carrito</button>

            </div>
        )
    }
}

export default ItemCount

