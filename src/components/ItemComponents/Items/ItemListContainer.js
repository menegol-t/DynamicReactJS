import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore} from "firebase/firestore";
import ItemLoading from "../ItemLoading";
import ItemFilterList from "./ItemFilterList";
import { useParams } from "react-router-dom";
import ItemDetailContainer from "../ItemDetail/ItemDetailContainer";

const ItemListContainer = () => {

    const [info, setInfo] = useState([])

    useEffect(()=>{
        const db = getFirestore()
        window.scrollTo({top: 0, behavior: 'smooth'})
        const itemsCollectionCategory = collection(db, "items")
        getDocs(itemsCollectionCategory)
        .then((snapshot) => { 
            const data = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
            setInfo(data)
        })
        .catch((error) => console.error(error))
    }, [])
    
    const { id } = useParams()

    return (
        <main>
            {/* { info.length === 0 ? <ItemLoading/> : <ItemFilterList info={info}/> } */}
            { info.length === 0 ? <ItemLoading/> : id ?  <ItemDetailContainer info={info}/> : <ItemFilterList info={info}/> } 
        </main>
    )
}

export default ItemListContainer;