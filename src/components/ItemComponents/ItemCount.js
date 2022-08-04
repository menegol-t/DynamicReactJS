import React, { useState } from "react"
import "./ItemCount.css"

const ItemCount = ({ stock}) => {
    /*Por ahora recibe el nombre del producto y el stock directo desde dentro de App.js*/
    let [cantidad, setCantidad] = useState(1)

    let botonMainTxt

    if (stock <= 0){
        cantidad = 0
        botonMainTxt = "Sin stock"

        return(
            <div className="itemCount__div ">
                <h2 className="txtCenter fontSpecial">Stock: {stock}</h2>

                <div className="itemCount__botoncitos">

                    {/* <button className="comprarbtn btn btn-outline-light h-25 txtSmall boton__responsive bgBrown">-</button> */}
    
                    <p className="txtMed">{cantidad}</p>
    
                    {/* <button className="comprarbtn btn btn-outline-light h-25 txtSmall boton__responsive bgBrown">+</button> */}
                    
                </div>

                <button className="txtCenter comprarbtn btn btn-outline-dark txtSmall boton__responsive">{botonMainTxt}</button>

            </div>
        )

    }else{

        botonMainTxt = "Agregar al carrito"

        const agregar = () => {
            setCantidad(cantidad + 1)
        }
    
        const quitar = () => {
            setCantidad(cantidad - 1)
        }
    
        cantidad < 0 ? cantidad = 0 : console.log() 
    
        cantidad > stock ? cantidad = stock : console.log() 
    
        const addOnCart = () => {
            cantidad > 0 ? console.log("Estas añadiendo " + cantidad.valueOf() + " a tu carrito.") : console.log()
        }
        // + prod.valueOf() + 
        return(
            <div className="itemCount__div ">
                <h2 className="txtCenter fontSpecial"> Stock: {stock}</h2>

                <div className="itemCount__botoncitos">

                    <button className="comprarbtn btn btn-outline-light h-25 txtSmall boton__responsive bgBrown" onClick={quitar}>-</button>
    
                    <p className="txtMed">{cantidad}</p>

                    <button className="comprarbtn btn btn-outline-light h-25 txtSmall boton__responsive bgBrown" onClick={agregar}>+</button>
                    
                </div>

                <button className="txtCenter comprarbtn btn btn-outline-light txtSmall boton__responsive bgBrown" onClick={addOnCart}>{botonMainTxt}</button>

            </div>
        )
    }
}

export default ItemCount

