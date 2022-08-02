import { useEffect, useState } from "react";
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = () => {

    const [itemDetail, setItemsDetails] = useState([]); /* El estado incial del array es vacio, sin info */

    const getItem = () => {
        setTimeout( () => {
            fetch("./productos.json")
            .then(anteojos => anteojos.json())
            .then(anteojos => {
                setItemsDetails(anteojos[0]) //Esta entrega pide solo 1 detalle
            })}, 2000)
    }

    useEffect(() => {
        getItem()
    }, []); 
    /* Hace que cuando se monta el componente llame a la funcion que espera 2 segundos
    para traer el objeto [0] del JSON */

    return (
        <div>
            <ItemDetail itemDetail= {itemDetail}/>
        </div>
    )
}

export default ItemDetailContainer;