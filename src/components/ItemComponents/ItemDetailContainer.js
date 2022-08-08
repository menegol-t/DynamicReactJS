import { useEffect, useState } from "react";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";

const ItemDetailContainer = () => {

    const [itemDetail, setItemsDetails] = useState([]); /* El estado incial del array es vacio, sin info */

    const { id } = useParams()

    const getProductById = (id) => {
        fetch("../../productos.json")
        .then(anteojos => anteojos.json())
        .then(anteojos =>
            setItemsDetails(anteojos.filter((item)=>item.id === parseInt(id))[0])
        )
    } 

    useEffect(()=>{
        getProductById(id)
        return()=>{
            setItemsDetails([])
        }    
    }, [id])

    return (
        <div>
            {/* <ItemDetail itemDetail= {itemDetail}/> */}
            {itemDetail.length !== 0 ? (<ItemDetail itemDetail={itemDetail}/>) : (<h2>Cargando...</h2>)}
        </div>
    )
}

export default ItemDetailContainer;

