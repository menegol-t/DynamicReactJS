import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";

const ItemListContainer = () => {

    const [items, setItems] = useState([]); /* El estado incial del array es vacio, sin info */
    const {category} = useParams()
    console.log(category);

    useEffect(() => {
            fetch("../productos.json")
            .then(anteojos => anteojos.json())
            .then((anteojos) => {
                if(category){
                    setItems(anteojos.filter((product) => product.categoria === category))
                }else{
                    setItems(anteojos)
                }
            })

            return()=>{
                setItems([])
            }

        }, [category]); 

    return (
        <main>
            <ItemList items={items}/> 
        </main>
    )
}

export default ItemListContainer;
