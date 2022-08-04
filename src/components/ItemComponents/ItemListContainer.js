import { useEffect, useState } from "react";
import ItemList from "./ItemList";

const ItemListContainer = () => {

    const [items, setItems] = useState([]); /* El estado incial del array es vacio, sin info */

    useEffect(() => {
        setTimeout( () => {
            fetch("./productos.json")
            .then(anteojos => anteojos.json())
            .then(anteojos => {
                setItems(anteojos)
            })}, 0)     
    }, []); 
    /* Hace que cuando se monta el componente se esperen 2 segundos,
y despues se reemplace el "items" por cada objeto encontrado en el array del JSON */

    return (
        <main>
            <ItemList items={items}/> {/*items es un array vacio hasta que se haga el fetch*/}
        </main>
    )
}

export default ItemListContainer;
