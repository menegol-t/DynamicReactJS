import { useEffect, useState } from "react";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";
import ItemLoading from "../ItemLoading";
import ItemNotAvaliable from "../ItemNotAvaliable";

const ItemDetailContainer = ({info}) => {

    const [itemsDetails, setItemsDetails] = useState([]); 

    const { id } = useParams()

    useEffect(()=>{
        setItemsDetails(info.find((product) => product.id === id))
    }, [id, info])

    return (
        <div>
            { itemsDetails !== undefined ? itemsDetails.length === 0 ? <ItemLoading/> : <ItemDetail itemsDetails={itemsDetails}/> : <ItemNotAvaliable/>}
        </div>
    )
}

export default ItemDetailContainer;