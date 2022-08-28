import "./App.css" 
import NavBar from "./components/NavBar/NavBar"
import ItemListContainer from "./components/ItemComponents/ItemStateless/ItemListContainer"
import ItemDetailContainer from "./components/ItemComponents/ItemDetail/ItemDetailContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import CartProvider from "./context/CartContext";



function App() {
  
  return (
    <div>
      <BrowserRouter>
        <CartProvider >
          <NavBar/>  
          <Routes>
            <Route path='/' element={ <ItemListContainer/> } /> 
            <Route path='/category/:category' element={ <ItemListContainer/> } /> 
            <Route path='/item/:id' element={ <ItemDetailContainer /> } />
            <Route path='/cart' element={ <Cart /> } />
            <Route path="*" element={<ItemListContainer/>} />
          </Routes> 
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

/* Funcion que añade mas productos de un JSON que yo le diga: 
 useEffect(() => {
    const db = getFirestore()
	  const itemsCollection = collection(db, "items")
		
		fetch("../../productos.json").then(anteojos => anteojos.json()).then(anteojos => anteojos.map((newItem) => {addDoc(itemsCollection, newItem).then(({id}) => console.log({id}))}))
  },[])
*/