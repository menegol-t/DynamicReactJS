import "./App.css" 
import NavBar from "./components/NavBar/NavBar"
import ItemListContainer from "./components/ItemComponents/Items/ItemListContainer"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import CartProvider from "./context/CartContext";
import Footer from "./components/NavBar/Footer";

function App() {
  
  return (
    <div>
      <BrowserRouter>
        <CartProvider >
          <NavBar/>  
          <Routes>
            <Route path='/' element={ <ItemListContainer/> } /> 
            <Route path='/category/:category' element={ <ItemListContainer/> } />
            <Route path='/item/:id' element={ <ItemListContainer/> } />
            <Route path='/cart' element={ <Cart /> } />
            <Route path="*" element={<ItemListContainer/>} />
          </Routes> 
          <Footer/>
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;