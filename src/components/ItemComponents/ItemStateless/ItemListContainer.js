import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";

const ItemListContainer = () => {

    const [items, setItems] = useState([]);
    const {category} = useParams()

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

    }, [category]); 

    return (
        <main>
            <ItemList items={items}/> 
        </main>
    )
}

export default ItemListContainer;
/*ItemList empieza sin items L7. Se hace un useEffect que hace fetch a los items y se los 
alimenta a ItemList. Si hay categoria en el router-dom, me fetchea solo los productos con 
esa categoria L14 & L15. Si no los hay, me fetchea todos los productos L17. Se queda 
escuchando por cambios en la categoria L21.*/