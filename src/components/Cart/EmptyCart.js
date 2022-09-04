import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmptyCart = () => {
    const navigate = useNavigate()

    return (
        <div className="d-flex justify-content-center emptyCart__displayFlex">
            <h3 className='txtBig w-auto mt-5 mb-5'>Tu carrito ahora esta vacio, vuelve a comprar!</h3>
            <button className='btn bgBrown btn-block btn-lg w-auto txtMed' onClick={() => navigate('/')}>Ir a comprar</button>
        </div>
    );
}

export default EmptyCart;
