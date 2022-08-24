import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";

const ItemListContainer = () => {

    const [items, setItems] = useState([]);
    const {category} = useParams()

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

    useEffect(() => {
        const db = getFirestore()
        const itemsCollectionCategory = collection(db, "items")
        getDocs(itemsCollectionCategory)
            .then((snapshot) => { 
            const data = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
                setItems(data)
            })
            .catch((error) => console.error(error))
    
        }, []);

    useEffect(() => {
    if(category){
        const db = getFirestore()
        const itemsCollectionCategory = query(
            collection(db, "items"), where("categoria", "==", category)
        )
        getDocs(itemsCollectionCategory)
            .then((snapshot) => {
                const data = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
                setItems(data)
            })
            .catch((error) => console.error(error))
    }},[category]);

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