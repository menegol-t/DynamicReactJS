import React, { useContext, useState, useEffect } from 'react';
import ItemCount from '../ItemCount/ItemCount';
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
                                        <ItemCount stock={itemsDetails.stock} onAdd={handleAdd} count={count}/>
                                        <Link to="/cart"><ToastContainer limit={3}/></Link>
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