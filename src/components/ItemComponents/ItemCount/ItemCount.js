import React, { useState } from "react"

const ItemCount = ({ stock, onAdd}) => {

    let [amount, setAmount] = useState(1)

    let buttonMainTxt

    if (stock <= 0){
        amount = 0
        buttonMainTxt = "Sin stock"

        return(
            <div className="itemCount__div ">

                <button className="txtCenter comprarbtn btn btn-outline-dark txtSmall boton__responsive boton__deactiv pe-none">{buttonMainTxt}</button>

            </div>
        )

    }else{

        buttonMainTxt = "Agregar al carrito"

        const agregar = () => {
            setAmount(amount + 1)
        }
    
        const quitar = () => {
            setAmount(amount - 1)
        }
    
        amount < 1 ? amount = 1 : console.log() 
    
        amount > stock ? amount = stock : console.log() 

        return(
            <div className="itemCount__div ">
                <h2 className="txtCenter fontSpecial"> Stock: {stock}</h2>

                <div className="itemCount__botoncitos">

                    <button className="comprarbtn btn btn-outline-light h-25 txtSmall boton__responsive bgBrown" onClick={quitar}>-</button>
    
                    <p className="txtMed">{amount}</p>

                    <button className="comprarbtn btn btn-outline-light h-25 txtSmall boton__responsive bgBrown" onClick={agregar}>+</button>
                    
                </div>
                
                <button className="txtCenter comprarbtn btn btn-outline-light txtSmall boton__responsive bgBrown" onClick={() => onAdd(amount)}>{buttonMainTxt}</button>

            </div>
        )
    }
}

export default ItemCount