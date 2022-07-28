import React from 'react';

const Item = ({item}) => {
    return (
        <section>
			<div class="container-fluid">
				<div class="row" id="divProductos">
                    <article className='col-md-6'>
                        <figure className="width2" id={item.figure}>
                            <img src={item.src} alt={item.alt} className="scale2 img-fluid"/>
                                <figcaption className="txtCenter mt-3 fontSpecial txtMed">{item.nombre} <br/> {item.precio}</figcaption>
                                <div class="text-center bgNormal">
                                    <div class="card-body noneBorder">
                                        <button id={item.id} type="button" className="comprarbtn btn btn-outline-light w-25 boton__responsive"> <span className="txtSmall2 ">Ver Detalle</span></button>
                                    </div>
                                </div>
                        </figure>
                    </article>
                </div>
            </div>
        </section>
    )
}

export default Item;
