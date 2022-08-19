import { useEffect, useState } from "react";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const ItemDetailContainer = () => {

    const [itemsDetails, setItemsDetails] = useState([]); 

    const { id } = useParams()

    // const getProductById = (id) => {
    //     fetch("../../productos.json")
    //     .then(anteojos => anteojos.json())
    //     .then(anteojos =>
    //         setItemsDetails(anteojos.filter((item)=>item.id === parseInt(id))[0])
    //     )
    // } 

    // const getProductById = (id) => {
    //     const db = getFirestore()
    //     const itemsCollectionRef = collection(db, "items")
    //     getDocs(itemsCollectionRef)
    //     .then((snapshot) => { 
    //     const data = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
    //     setItemsDetails(data.filter((item)=>item.id === id)[0])
    //     console.log(itemsDetails);
    //     })
    //     .catch((error) => console.error(error))
    // }

    useEffect(() => {
        const db = getFirestore()
    
        const itemRef = doc(db, "items", `${id}`)
        getDoc(itemRef)
        .then((snapshot) => { 
            if (snapshot.exists()){
            const data = {
                id: snapshot.id,
                ...snapshot.data()
            }
            
            setItemsDetails(data)
            console.log(data)
            }
        })
        .catch((error) => console.error(error))

    }, []);

    useEffect(()=>{
        return()=>{
            setItemsDetails([])
        }    
    }, [id])

    return (
        <div>
            {/* <ItemDetail itemsDetails= {itemsDetails}/> */}
            {itemsDetails.length === 0 ? (<h2>Cargando...</h2>) : (<ItemDetail itemsDetails= {itemsDetails}/>) }
        </div>
    )
}

export default ItemDetailContainer;
/*Envia individualmente cada producto para que se les haga un detalle. Hace un fetch de los productos
L12 cuyo ID coincida con el router-DOM L15. Escucha por cualquier cambio para mostrar otro producto 
en el router-DOM L19. Pone un estado de cargando o envia los productos que encontro a ItemDetail L29.
*/
