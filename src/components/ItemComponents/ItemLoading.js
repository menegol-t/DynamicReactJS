import React from 'react';

const ItemLoading = () => {
    return (
        <div>
            <div className="d-flex justify-content-center">
                <div className='txtBig w-auto'>Cargando...</div>
                <div className="spinner-border width5" role="status" aria-hidden="true" style={{width: "6rem", height: "6rem"}} ></div>
            </div>
        </div>
    );
}

export default ItemLoading;
