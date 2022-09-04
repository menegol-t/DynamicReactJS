import React from 'react';
import { useNavigate } from 'react-router-dom';

const ItemNotAvaliable = () => {
    const navigate = useNavigate()

    return (
        <div className="d-flex justify-content-center emptyCart__displayFlex">
            <h3 className='txtBig w-auto mt-5 mb-5'>No te preocupes, te avisaremos cuando tengamos cosas nuevas. <br/> <br/>Mientras tanto, ¿Porque no vuelves por donde viniste?</h3>
            <button className='btn bgBrown btn-block btn-lg w-auto txtMed' onClick={() => navigate('/')}>Ir a comprar</button>
        </div>
    );
}

export default ItemNotAvaliable;
