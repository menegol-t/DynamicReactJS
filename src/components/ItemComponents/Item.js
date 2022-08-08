import React from 'react';
import {Link} from "react-router-dom"

const Item = ({item}) => {
    /*Recibe "item" (de ItemList) que es cada objeto de un array siendo iterado. */
    return (
        
        
            <article className='col-md-6'>
                <figure className="width2" id={item.figure}>
                    <Link to={`/item/${item.id}`}>
                        <img src={item.src} alt={item.alt} className="scale2 img-fluid"/>
                    </Link>
                    <figcaption className="txtCenter mt-5 fontSpecial txtMed ">{item.nombre} <br/> {item.precio}</figcaption>
                        <div className="text-center bgNormal">
                            <div className="card-body noneBorder">
                                <Link to={`/item/${item.id}`}>
                                    <button id={item.id} type="button" className="comprarbtn btn btn-outline-light w-25 boton__responsive bgBrown"> <span className="txtSmall2 ">Ver Detalle</span></button>
                                </Link>
                            </div>
                        </div>
                </figure>
            </article>
    
        
    )
}

export default Item;
