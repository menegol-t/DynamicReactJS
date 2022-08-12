import React, { useContext } from 'react';
import ItemCount from '../ItemCount/ItemCount';
import { useState } from 'react';
import { CartContext } from '../../../context/CartContext';

// import { useNavigate } from 'react-router-dom';

const ItemDetail = ({itemDetail}) => {
    // const navigate = useNavigate()

    const {addToCart} = useContext(CartContext);

    const [count, setcount] = useState(0);
    console.log("ignorar esto es solo para sacar un warning: " + count);

    const handleAdd = (cantidadAlCarrito) =>{
        setcount(cantidadAlCarrito)
        // navigate("/cart")
        addToCart(itemDetail, cantidadAlCarrito)
    }

    return (
        <section>
			<div className="container-fluid">
				<div className="row" id="divProductos">
                    <article className='col-md-6'>
                        <figure className="width2">
                            <img src={itemDetail.src2} alt={itemDetail.alt} className="scale2 img-fluid"/>
                            <figcaption className="txtCenter mt-5 fontSpecial txtMed">{itemDetail.nombre} <br/> {itemDetail.precio}</figcaption>
                                <div className="text-center bgNormal">
                                    <div className="card-body noneBorder">
                                        <p>{itemDetail.descr}</p>
                                        <ItemCount stock={itemDetail.stock} onAdd={handleAdd}/>
                                    </div>
                                </div>
                        </figure>
                    </article>
                </div>
            </div>
        </section>
    )
}

export default ItemDetail;
/*Recibe de ItemDetailContainer L6 un item con ID unico. Recibe el numero en el contador de ItemCount
L11. Le da formato al detalle del producto L17 y le pasa Info del stock del item unico al ItemCount
L28*/