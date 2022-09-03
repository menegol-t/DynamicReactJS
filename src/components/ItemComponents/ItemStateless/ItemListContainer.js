import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import ItemLoading from "../ItemLoading";

const ItemListContainer = () => {

    const [items, setItems] = useState([]);
    const {category} = useParams()

    useEffect(() => {
    const db = getFirestore()
    window.scrollTo({top: 0, behavior: 'smooth'})
    if(category){
        const itemsCollectionCategory = query(
            collection(db, "items"), where("categoria", "==", category)
        )
        getDocs(itemsCollectionCategory)
            .then((snapshot) => {
                const data = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
                setItems(data)
            })
            .catch((error) => console.error(error))
    }else{
        const itemsCollectionCategory = collection(db, "items")
        getDocs(itemsCollectionCategory)
            .then((snapshot) => { 
            const data = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
                setItems(data)
            })
            .catch((error) => console.error(error))
    }},[category]);

    return (
        <main>
            { items.length === 0 ? <ItemLoading/> : <ItemList items={items}/>} 
        </main>
    )
}

export default ItemListContainer;
/*ItemList empieza sin items L8. Se hace un useEffect L11 que busca a los items y los setea como "item". 
Si hay categoria en el router-dom, me hace lo mismo solo los productos con la categoria L23 & L35. Como 
paso final, alimenta todos los datos de item a ItemList L39. */

//ABAJO, CODIGO PARA MI DEBUBUGEO. 

// useEffect(() => {
    //     const db = getFirestore()
    //     const itemsCollectionCategory = collection(db, "items")
    //     getDocs(itemsCollectionCategory)
    //       .then((snapshot) => { 
    //         const data = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
    //         // if(category){
    //         //     setItems(data.filter((product) => product.categoria === category))
    //         // }else{
    //             setItems(data)
    //         // }
    //        })
    //       .catch((error) => console.error(error))
    
    //   }, []);

    // useEffect(() => {
    //         fetch("../productos.json")
    //         .then(anteojos => anteojos.json())
    //         .then((anteojos) => {7
    //             if(category){
    //                 setItems(anteojos.filter((product) => product.categoria === category))
    //             }else{
    //                 setItems(anteojos)
    //             }
    //         })

    // }, [category]); 