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
        const itemsCollectionCategory = query(collection(db, "items"), where("categoria", "==", category))

        getDocs(itemsCollectionCategory)
            .then((snapshot) => {
                const data = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
                setItems(data)
            })
            .catch((error) => console.error(error))
    }else{
        const itemsCollection = collection(db, "items")
        getDocs(itemsCollection)
            .then((snapshot) => { 
            const data = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
            setItems(data)
            })
            .catch((error) => console.error(error))
    }
    },[category]);

    return (
        <main>
            { items.length === 0 ? <ItemLoading/> : <ItemList items={items}/>} 
        </main>
    )
}

export default ItemListContainer;
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