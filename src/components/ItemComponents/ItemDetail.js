import React from 'react';

const ItemDetail = ({itemDetail}) => {
    /*Recibe "item" (de ItemList) que es cada objeto de un array siendo iterado. */
    return (
        <section>
			<div className="container-fluid">
				<div className="row" id="divProductos">
                    <article className='col-md-6'>
                        <figure className="width2" id={itemDetail.figure}>
                            <img src={itemDetail.src} alt={itemDetail.alt} className="scale2 img-fluid"/>
                            <figcaption className="txtCenter mt-3 fontSpecial txtMed">{itemDetail.nombre} <br/> {itemDetail.precio}</figcaption>
                                <div className="text-center bgNormal">
                                    <div className="card-body noneBorder">
                                        <p>{itemDetail.descr}</p>
                                        <button id={itemDetail.id} type="button" className="comprarbtn btn btn-outline-light w-25 boton__responsive bgBrown"> <span className="txtSmall2 ">Comprar</span></button>
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