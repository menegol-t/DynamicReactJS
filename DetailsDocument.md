# Details Document:

En esta documento se encuentran comentarios de componentes explicando el codigo, asi como funciones para su debuggeo en caso de modificarlo. 

Primero, asegurate de leer [README](https://github.com/menegol-t/Aubier-TomasMenegolReactJS/blob/master/README.md).

Este documento añade `funciones utiles` para debuggeo u otras utilidades.

---
### `App`

Contiene las rutas a los componentes visuales principales, el landing por default, landing filtrando por categoria, detalle de items y cart.

`Añadir productos, desde un JSON`

```javascript
useEffect(() => {
    const db = getFirestore()
    const itemsCollection = collection(db, "items")
    fetch("../../productos.json")
    .then(anteojos => anteojos.json())
    .then(anteojos => anteojos.map((newItem) => {addDoc(itemsCollection, newItem)
    .then(({id}) => console.log({id}))}))
},[])
```
Toda la app usa css traido de App.css y bootstrap.

---
## `CartContext: Contiene la logica mas pesada con el objetivo de manipular items en el carrito.`
### Dependencias: NavBar

El cart es un array que empieza vacio L9. 

Verificar si hay o no un producto devolviendo true o false L11 (incluido nada mas porque lo requiere el desafío). 

Vaciar el carrito L15. 

Toast que redirige al carrito en caso de que se añada un producto exiosamente L19. 

Para añadir al carrito: Se recibe cualquier item que se va a añadir y su cantidad L28. Se crea una constante que me devuelve el Indice de un item si es que ya estaba en el carrito L30, y si no estaba me devuelve -1. Si no hay nada previamente en el carrtio L32, se setea el array del carrito L36 a incluir un objeto que tenga el item y la cantidad a solicitada L34. 
Si el carrito no esta vacio L40 & L58, se verifica si la variable indexOfDuplicatedItem me devolvió el index de un item que ya estaba en el carrito. 
* Si me devuelve un index valido L40, uso ese index en el carrito para modificar la cantidad antigua del item a la cantidad nueva + la cantidad vieja L42. Esto solo funciona si la cantidad a añadir + la cantidad ya añadida no son en mayores que el stock disponible de ese producto L46. En caso de que la nueva cantidad fuera mayor, sale un error por la cantidad de stock L55. 
* Si indexOfDuplicatedItem no me devuelve un idex válido L58 (es decir me devuelve -1), agarro lo que ya habia en el carrito y le añado el nuevo item L62. 

Remover un item del carrito L70, creo un nuevo array que incluye a todos los items previos excepto al que quiero eliminar, y seteo ese nuevo array como el carrito L71. 

Consultar el total de items en el carrito L74, solo acumulo cuantos items van a ir al carrito en todos los objetos del array. 

Calcular el precio total L78, hago lo mismo que calcular el numero de items.  

Calcular impuesto IVA (Argentina) L82.

Calcular el precio final a pagar (el total de items mas el impuesto) L84.

---
## `NavBar:`

Contiene la Nav, adicionalmente muestra un widget de cart con la cantidad de items en carrito dependiendo de si hay algun item o no L42.

---
## `Footer:`

Contiene un footer puramente visual. El mapa de L8 se puede eliminar para no recibir un warning en la consola, pero no afecta en anda al funcionamiento normal de la app. El mapa y los datos de la empresa son puramente ficcionales, este NO es un E-Commerce real. 

---
## `ItemComponents:`

### ItemLoading: 

Muestra un spinner cuando es llamado.

### ItemNotAvailable: 

Cuando el user pone especificamente una ruta /item con un item que no existe, este es llamado mostrando un error personalizado (solicitado por entrega). Este NO es el caso para /category. Tmpoco es el caso para cualquie otro link que los route no reconozcan, debido a que App se encarga de siempre devolverte al landing.

---
## `ItemComponents: ItemListContainer`

### Dependencias: ItemList & ItemLoading

Items L9 es un array que empieza vacio, que es despues enviado a ItemList L29. Scrollea hasta arriba L14, busca en el servidor todos los items L16. Ahi, filtra por categoria L19 o agarra todos L22 y los envia al landing (ItemList). Si los items no estan disponibles todavia, muestra un ItemLoading L19.

`Adjunto dos codigos mas obtusos que requerian las entregas, porque era necesario usar "querys". Utilizo una version mas optimizada.`

```javascript
useEffect(() => {
    const db = getFirestore()

    if(category){
        const itemsCollectionCategory = query(collection(db, "items"), where("categoria", "==", category))

        getDocs(itemsCollectionCategory)
            .then((snapshot) => {
                const data = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
                setItems(data)
            })
            .catch((error) => console.error(error))
    }else{
        const itemsCollection = collection(db, "items")
        getDocs(itemsCollection)
            .then((snapshot) => { 
            const data = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
            setItems(data)
            })
            .catch((error) => console.error(error))
    }
    },[category]);

 useEffect(() => {
        const db = getFirestore()
        window.scrollTo({top: 0, behavior: 'smooth'})
        const itemsCollectionCategory = collection(db, "items")
        getDocs(itemsCollectionCategory)
            .then((snapshot) => { 
            const data = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
            if(category){
                setItems(data.filter((product) => product.categoria === category))
            }else{
                setItems(data)
            }})
            .catch((error) => console.error(error))
    }, [category]);
```

`Adjunto codigo para buscar los items por JSON suponiendo que se tiene el banco de imagenes descargado.`

```javascript
useEffect(() => {
    fetch("../prod.json")
    .then(prod => prod.json())
    .then((prod) => {
        if(category){
            setItems(prod.filter((product) => product.categoria === category))
        }else{
            setItems(prod)
        }
    })
}, [category]); 
```

---
## `ItemComponents: ItemList`

### Dependencias: Item

Recibe items de ItemListContainer L4. Los mete en una caja general de boostrap que viene 
por CDN en el HTML principal, y se los envia a Item que los mete en una caja individual para
cada uno L10. Por cada objeto que recibe del array, lo mete en un Item con su propia key, y 
pasa el objeto indiviaulmente al componente Item.






