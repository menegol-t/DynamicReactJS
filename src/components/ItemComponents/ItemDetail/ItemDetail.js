import React, { useContext } from 'react';
import ItemCount from '../ItemCount/ItemCount';
import { useState, useEffect } from 'react';
import { CartContext } from '../../../context/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom"

const ItemDetail = ({itemsDetails}) => {

    const {addToCart} = useContext(CartContext);

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }, []);

    const [count, setcount] = useState(0);
    console.log("ignorar esto es solo para sacar un warning: " + count);

    const handleAdd = (cantidadAlCarrito) =>{
        setcount(cantidadAlCarrito)
        addToCart(itemsDetails, cantidadAlCarrito)
    }

    return (
        <section>
			<div className="container-fluid  mt-3">
				<div className="row d-flex justify-content-evenly" id="divProductos">
                    <article className='col-md-6'>
                        <figure className="width3">
                            <img src={itemsDetails.src2} alt={itemsDetails.alt} className="scale2 img-fluid"/>
                            <figcaption className="txtCenter mt-5 fontSpecial txtMed">{itemsDetails.nombre} <br/> {itemsDetails.precio}</figcaption>
                                <div className="text-center bgNormal">
                                    <div className="card-body noneBorder">
                                        <p>{itemsDetails.descr}</p>
                                        <ItemCount stock={itemsDetails.stock} onAdd={handleAdd}/>
                                        <Link to="/cart"><ToastContainer/></Link>
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
/*Recibe de ItemDetailContainer L6 un item con ID unico. Recibe el numero que haya en el contador de 
ItemCount L15 y se encarga de agregarlo al carrito L18. Le da formato al detalle del producto L21 y 
le pasa Info del stock del item unico al ItemCount L32, asi como la funcion para añadir al carrito.*/