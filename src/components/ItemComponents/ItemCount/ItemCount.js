import React, { useState } from "react"

const ItemCount = ({ stock, onAdd}) => {

    let [amount, setAmount] = useState(1)

    let buttonMainTxt

    if (stock <= 0){
        amount = 0
        buttonMainTxt = "Sin stock"

        return(
            <div className="itemCount__div ">
                <h2 className="txtCenter fontSpecial">Stock: {stock}</h2>

                <div className="itemCount__botoncitos">
                    <p className="txtMed">{amount}</p>  
                </div>

                <button className="txtCenter comprarbtn btn btn-outline-dark txtSmall boton__responsive">{buttonMainTxt}</button>

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

/*Recibe de ItemDetail info del stock del producto a contar en el detalle L3, y usa su funcion
"onAdd" para devolverle por parametro el numero de items a añadir a carrito cuando se le da al
boton "añadir a carrito" L62. Por default el numero a comprar es 1 L5. Si no hay stock L9 la 
amount se setea a 0 L10 y el boton de comprar cambia a "sin stock" L11 sin botones para sumar
mas amount. Tampoco guarda la amount de 0 en los items a añadir al carrito con la funcion 
onAdd L27. Si hay stock L32, el boton indica "agregar al carrito" L34 y se establece la logica
de sumar o restar amountes L36 & L40 a la default L5. No permite que la amount sea menor a
1 L44 o mayor al stock L46. Provee un formato de boostrap y custom que obtiene de CDN en el 
HTML principal.*/