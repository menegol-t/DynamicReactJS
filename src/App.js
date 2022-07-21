import "./App.css" 
import NavBar from "./components/NavBar"
import ItemListContainer from "./components/ItemListContainer"

function App() {
  const futuroContenido = "aca va  estar mi contenido"
  return (
    <div>
      <NavBar />  
      <ItemListContainer porAhoraUnGreeting={futuroContenido}/>
    </div>
  );
}

export default App;
/* */