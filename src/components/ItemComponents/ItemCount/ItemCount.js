import React, { useState } from "react"

const ItemCount = ({ stock, onAdd}) => {

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
    
        cantidad < 1 ? cantidad = 1 : console.log() 
    
        cantidad > stock ? cantidad = stock : console.log() 

        return(
            <div className="itemCount__div ">
                <h2 className="txtCenter fontSpecial"> Stock: {stock}</h2>

                <div className="itemCount__botoncitos">

                    <button className="comprarbtn btn btn-outline-light h-25 txtSmall boton__responsive bgBrown" onClick={quitar}>-</button>
    
                    <p className="txtMed">{cantidad}</p>

                    <button className="comprarbtn btn btn-outline-light h-25 txtSmall boton__responsive bgBrown" onClick={agregar}>+</button>
                    
                </div>

                <button className="txtCenter comprarbtn btn btn-outline-light txtSmall boton__responsive bgBrown" onClick={() => onAdd(cantidad)}>{botonMainTxt}</button>

            </div>
        )
    }
}

export default ItemCount

/*Recibe de ItemDetail info del stock del producto a contar en el detalle L4, y usa su funcion
"onAdd" para devolverle por parametro el numero de items a añadir a carrito cuando se le da al
boton "añadir a carrito" L63. Por default el numero a comprar es 1 L6. Si no hay stock L10 la 
cantidad se setea a 0 L11 y el boton de comprar cambia a "sin stock" L12 sin botones para sumar
mas cantidad. Tampoco guarda la cantidad de 0 en los items a añadir al carrito con la funcion 
onAdd L28. Si hay stock L33, el boton indica "agregar al carrito" L35 y se establece la logica
de sumar o restar cantidades L37 & L41 a la default L6. No permite que la cantidad sea menor a
1 L45 o mayor al stock L47. Provee un formato de boostrap y custom que obtiene de CDN en el 
HTML principal.*/