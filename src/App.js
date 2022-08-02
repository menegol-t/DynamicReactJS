import "./App.css" 
import NavBar from "./components/NavBar/NavBar"
// import ItemListContainer from "./components/ItemComponents/ItemListContainer"
// import ItemCount from "./components/ItemComponents/ItemCount";
import ItemDetailContainer from "./components/ItemComponents/ItemDetailContainer";

function App() {
  // const futuroContenido = "aca va  estar mi contenido"
  return (
    <div>
      <NavBar />  
      {/* <ItemListContainer porAhoraUnGreeting={futuroContenido}/>
      <ItemCount stock={2} prod="Nantes"/>
      <ItemCount stock={10} prod="Dijon"/>
      <ItemCount stock={0} prod="Le Mans"/>
      <ItemCount stock={7} prod="Lyon"/> */}
      <ItemDetailContainer/> 
      {/* Esta entrega me pide renderizar los detalles de un solo objeto */}
    </div>
  );
}

export default App;