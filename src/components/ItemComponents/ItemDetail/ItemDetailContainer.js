import { useEffect, useState } from "react";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import ItemLoading from "../ItemLoading";
import ItemNotAvaliable from "../ItemNotAvaliable";

const ItemDetailContainer = () => {

    const [itemsDetails, setItemsDetails] = useState([]); 

    const { id } = useParams()

    const [itemDoesntExist, setItemDoesntExist] = useState(false)

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
            }else{
                setItemDoesntExist(true)
            }
        })
        .catch((error) => console.error(error))

        return(
            setItemsDetails([])
        )

    }, [id]);

    return (
        <div>
            {itemDoesntExist ? <ItemNotAvaliable/>: itemsDetails.length === 0 ? (<ItemLoading/>) : (<ItemDetail itemsDetails= {itemsDetails}/>) }
        </div>
    )
}

export default ItemDetailContainer;
/*Envia individualmente cada producto para que se les haga un detalle. Busca los productos
L12 cuyo ID coincida con el router-DOM L10, L14 & L16. Escucha cualquier cambio de ID L35, 
desmonta L3 y muestra otro producto si se cambia el roter DOM. Pone un estado de cargando 
o envia los productos que encontro a ItemDetail L39.
*/

//Funciones para mi debbuggeo
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
