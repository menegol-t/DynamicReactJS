import { useEffect, useState } from "react";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";

const ItemDetailContainer = () => {

    const [itemDetail, setItemsDetails] = useState([]); 

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
/*Envia individualmente cada producto para que se les haga un detalle. Hace un fetch de los productos
L12 cuyo ID coincida con el router-DOM L15. Escucha por cualquier cambio para mostrar otro producto 
en el router-DOM L19. Pone un estado de cargando o envia los productos que encontro a ItemDetail L29.
*/
