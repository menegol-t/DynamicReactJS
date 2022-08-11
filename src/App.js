import "./App.css" 
import NavBar from "./components/NavBar/NavBar"
import ItemListContainer from "./components/ItemComponents/ItemStateless/ItemListContainer"
import ItemDetailContainer from "./components/ItemComponents/ItemDetail/ItemDetailContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import CartContext from "./context/CartContext";

function App() {
  return (
    <div>
      <BrowserRouter>
        <CartContext.Provider value={[]}>
          <NavBar/>  
          <Routes>
            <Route path='/' element={ <ItemListContainer/> } /> 
            <Route path='/category/:category' element={ <ItemListContainer/> } /> 
            <Route path='/item/:id' element={ <ItemDetailContainer /> } />
            <Route path='/cart' element={ <Cart /> } />
            <Route path="*" element={<ItemListContainer/>} />
          </Routes> 
        </CartContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
