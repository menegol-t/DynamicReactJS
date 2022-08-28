import React, { useContext } from 'react';
import ItemCount from '../ItemCount/ItemCount';
import { useState } from 'react';
import { CartContext } from '../../../context/CartContext';
// import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ItemDetail = ({itemsDetails}) => {
    // const navigate = useNavigate()

    const {addToCart} = useContext(CartContext);

    const [count, setcount] = useState(0);
    console.log("ignorar esto es solo para sacar un warning: " + count);

    const handleAdd = (cantidadAlCarrito) =>{
        setcount(cantidadAlCarrito)
        // navigate("/cart")
        addToCart(itemsDetails, cantidadAlCarrito)
    }

    return (
        <section>
			<div className="container-fluid">
				<div className="row" id="divProductos">
                    <article className='col-md-6'>
                        <figure className="width2">
                            <img src={itemsDetails.src2} alt={itemsDetails.alt} className="scale2 img-fluid"/>
                            <figcaption className="txtCenter mt-5 fontSpecial txtMed">{itemsDetails.nombre} <br/> {itemsDetails.precio}</figcaption>
                                <div className="text-center bgNormal">
                                    <div className="card-body noneBorder">
                                        <p>{itemsDetails.descr}</p>
                                        <ItemCount stock={itemsDetails.stock} onAdd={handleAdd}/>
                                        <ToastContainer
                                            position="bottom-right"
                                            autoClose={3000}
                                            hideProgressBar={false}
                                            newestOnTop={false}
                                            closeOnClick
                                            rtl={false}
                                            pauseOnFocusLoss
                                            draggable
                                            pauseOnHover
                                        />
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