import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmptyCart = () => {
    const navigate = useNavigate()

    return (
        <div>
            <h3>Oops... Parece que no tienes nada en tu carrito.</h3>
            <button className='btn bgBrown btn-block btn-lg' onClick={() => navigate('/')}>Ir a comprar</button>
        </div>
    );
}

export default EmptyCart;
