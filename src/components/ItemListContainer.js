import { useEffect, useState } from "react";
import ItemList from "./ItemList";

const ItemListContainer = ({porAhoraUnGreeting}) => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        setTimeout( () => {
            fetch("./productos.json") //fetch ya es una promesa
            .then(anteojos => anteojos.json())
            .then(anteojos => {
                setItems(anteojos)
            })}, 2000)
        
    }, []);

    return (
        <main>
            <header>
                <div>
                    <h2>
                    {porAhoraUnGreeting}
                    </h2>
                </div>
            </header>
            <ItemList items={items}/>
        </main>
        
    )
}

export default ItemListContainer;
