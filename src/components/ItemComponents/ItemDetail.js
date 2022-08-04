import React from 'react';
import ItemCount from "./ItemCount"

const ItemDetail = ({itemDetail}) => {
    /*Recibe "item" (de ItemList) que es cada objeto de un array siendo iterado. */
    return (
        <section>
			<div className="container-fluid">
				<div className="row" id="divProductos">
                    <article className='col-md-6'>
                        <figure className="width2" id={itemDetail.figure}>
                            <img src={itemDetail.src2} alt={itemDetail.alt} className="scale2 img-fluid"/>
                            <figcaption className="txtCenter mt-3 fontSpecial txtMed">{itemDetail.nombre} <br/> {itemDetail.precio}</figcaption>
                                <div className="text-center bgNormal">
                                    <div className="card-body noneBorder">
                                        <p>{itemDetail.descr}</p>
                                        <ItemCount stock={itemDetail.stock}/>
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