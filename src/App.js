import "./App.css" 
import NavBar from "./components/NavBar"
import ItemListContainer from "./components/ItemListContainer"

function App() {
  const futuroContenido = "aca va  estar mi contenido"
  return (
    <div>
      <NavBar />  
      
    </div>
  );
}

export default App;
/*<ItemListContainer porAhoraUnGreeting={futuroContenido}/> */