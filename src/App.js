import "./App.css" 
import NavBar from "./components/NavBar"
import ItemListContainer from "./components/ItemListContainer"
import ItemCount from "./components/ItemCount";

function App() {
  const futuroContenido = "aca va  estar mi contenido"
  return (
    <div>
      <NavBar />  
      <ItemListContainer porAhoraUnGreeting={futuroContenido}/>
      <ItemCount stock={2} prod="Nantes"/>
      <ItemCount stock={10} prod="Dijon"/>
      <ItemCount stock={0} prod="Le Mans"/>
      <ItemCount stock={7} prod="Lyon"/>
    </div>
  );
}

export default App;

/* 

*/