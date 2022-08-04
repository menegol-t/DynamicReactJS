import "./App.css" 
import NavBar from "./components/NavBar/NavBar"
import ItemListContainer from "./components/ItemComponents/ItemListContainer"
// import ItemCount from "./components/ItemComponents/ItemCount";
import ItemDetailContainer from "./components/ItemComponents/ItemDetailContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  // const futuroContenido = "aca va  estar mi contenido"
  return (
    <div>
      <BrowserRouter>
        <NavBar/>  
        <Routes>
          <Route path='/' element={ <ItemListContainer/> } /> 
          <Route path='/category/:category' element={ <ItemListContainer/> } /> 
          <Route path='/item/:id' element={ <ItemDetailContainer /> } />  
          <Route path="*" element={<ItemListContainer/>} />
        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;

/* 
        <ItemCount stock={10} prod="Dijon"/>
        <ItemCount stock={0} prod="Le Mans"/>
        <ItemCount stock={7} prod="Lyon"/> */