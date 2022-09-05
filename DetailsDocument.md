# Details Document:

En esta documento se encuentran comentarios de componentes explicando el codigo, asi como funciones para su debuggeo en caso de modificarlo. 

Primero, asegurate de leer [README](https://github.com/menegol-t/Aubier-TomasMenegolReactJS/blob/master/README.md).

Este documento añade `funciones utiles` para debuggeo u otras utilidades.

Todo mi proyecto funciona haciendo una sola request al servidor, cumpliendo con una de las metas de eficiencia "extra" de la rubrica de evaluación.

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

### Dependencias: NavBar, ItemDetail, CartWidget, CartContainer, CartDetail

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

Cuando el user pone especificamente una ruta /item o /category que no existe, este es llamado mostrando un error personalizado (solicitado por entrega). Cualquier otro link que los route no reconozcan es siempre devolverte al landing.

---
## `Items: ItemListContainer, hace el llamado al servidor.`

### Dependencias: ItemDetailContainer, ItemFilterList & ItemLoading

Info L10 es un array que empieza vacio, que es despues enviado a ItemFilterList o ItemDetailContainer L28. Scrollea hasta arriba L14, busca en el servidor todos los items L16. Esta es la unica instancia cuando se buscan los items en el servidor, en el componente principal. Eso significa que los items cargaran instantaneamente (excepto las imagenes, que como se encuentran en Firebase van a ser buscadas al servidor por link). 

L28: Si el servidor todavia no respondio, se pone ItemLoading. Si se esta buscando un item por Id, se le envia la info a ItemDetailContainer. Si no, se le manda la info a ItemFilterList quien determinara si se filtran los items por categoria o no. 

`Adjunto codigo mas obtuso que requerian las entregas, porque era necesario usar "querys". Utilizo una mia version mas optimizada.`

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
## `ItemComponents: ItemFilterList, filtra por categoria.`

### Dependencias: ItemList & ItemNotAvailable

Recibe la info del servidor de ItemListContainer L7. Si hay categoria, filtra por la misma. Si no la hay, muestra toda la informacion de los items, y se queda escuchando por cambios en categoria. Si el user puso una categoria no valida, L13 devolvera un array vacio, con lo cual se mostrara un mensaje de no disponible con un prompt para voler al landing L20. Si la categoria si es adecuada, se envian los items a ItemList. 

---
## `Items: ItemList, organiza la informacion en cajas.`

### Dependencias: Item

Simplemente agarra la informacion de los items de ItemFilterList L3, las mete en cajas de bootstrap y las envia a Item L9.

---
## `Items: Item, renderiza la informacion y redirige al item en detalle.`

Recibe item despues de que ItemList los metiera en una caja general L4, y se encaga de meterlos en cajas individuales compatibles con boostrap por CDN en HTML principal. Tambien redirige al detalle del item cuando se lo clickea. 

---
## `ItemDetail: ItemDetailContainer, filtra por Id.`

### Dependencias: ItemLoading, ItemDetail & ItemNotAvailable

Recibe condicionalmente la info de ItemListContainer L7. Presenta el Item en detalle segun cual haya sido clickeado, filtrando el item correcto de todo el array que recibe L40, y escuchando por cambios L41.
Si el usuario pone un id de Item que no existe en el route, este id no es encontrado con lo cual se le presenta con ItemNotAvailable como en categoria L45. 
Hay un breve periodo en el que la info todavia no fue filtrada pero el componente ya fue llamado, aqui se pone una pantalla de carga. Cuando todo este corecto, se le pasa el item en cuestion como objeto unico a ItemDetail. Esto solo funciona si el item tiene un ID unico, el cual tiene. 


`Adjunto codigo para buscar items por ID desde un JSON, suponiendo que se descargo el banco de imagenes:`
```javascript
const getProductById = (id) => {
    fetch("../../productos.json")
    .then(anteojos => anteojos.json())
    .then(anteojos =>
        setItemsDetails(anteojos.filter((item)=>item.id === parseInt(id))[0])
    )
} 
```

`Adjunto codigo requerido en una de las entregas, donde se buscaba el item por ID individual:`
```javascript
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
```

---
## `ItemDetail: ItemDetail, muestra el detalle de un item.`

### Dependencias: ItemCount

Recibe un objeto que renderizar de ItemDetailContainer L9. Se establece la logica para sumar pedidos al carrito L18 y se la pasa al ItemCount junto con el stock del producto individual L34.

---
## `ItemDetail: ItemCount, el contador para añadir al carrito.`

Recibe stock y posibilidad de sumar items al carrito de ItemCount L3. Genera dos posibles componentes, teniendo en cuenta si se tiene stock o no. Si no se tiene stock L9, se muestra nada mas un boton estatico que dice sin stock L16. Si hay stock, se establecen las logicas de sumar L25 y restar L29 a un numero, que despues es enviado al carrito mediante la funcion pasada por ItemDetail que es sacada de context. Se establece que la cantidad no puede ser ni menor a 1 L33 ni mayor al stock disponible L35 (El console.log es solo para que la funcion tenga una opcion, pero nunca llega a ejecutarse). 
Se renderizan los botones para sumar, restar y el ultimo para sumar al carrito la cantidad en la variable "amount".    

---
## `Cart: EmptyCart, se muestra cuando se va a Cart y este esta vacio, tira un prompt para volver a comprar.`

Unicamente renderiza un boton para volver al landing. 

---
## `Cart: CartWidget, muestra la cantidad de items en el cart y un icono clickeable.`

Saca la cantidad de items en el cart de CartContext.

---
## `Cart: Cart, determina que hacer cuando se va a /cart.`

### Dependencias: EmptyCart & CartContainer

Si el cart del context esta vacio, muestra EmptyCart. Si tiene algo, lleva a CartContainer.

---
## `Cart: CartContainer, prepara la logica para enviar lo que haya en cart.`

### Dependencias: EmptyCart & CartContainer

Se encarga de saltar con un prompt L17 y capturar los datos del usuario con L26. Tiene mensajes de error por si se ponen datos incompletos L37, o si el email no es valido L43. Todo esto es asumiendo que el usuario no cerro el formulario L36. Si se pasan estas pruebas L49, se llama a sendOrder L50 con los datos del user L55 mas los datos de la compra L62 y envia la orden a firebase, devolviendole al usuario su id de orden L74. Posterior a eso, se limpia el carrito L80 para que salte EmptyCart. 
Todo esto tiene un trigger desde CartDetail L85, pero lo programe en el presente componenete porque si bien tiene mini aspectos presentacionales, es mas que nada un componente funcional. 

---
## `Cart: CartDetail, da estructura al cart, y calcula totales finales.`

### Dependencias: CartItems

Se crea la tabla bajo la cual estaran todos los items de Cart individualmente L35. Se calcula el total de precio L50, el total de impuestos L55 y el total final L60 con elementos del CartContext. Tambien se dispara el formulario de CartContainer L57.

---
## `Cart: CartItems, da estructura al item a comprar mostrado su detalle del checkout.`

Se ordenan y renderizan los items en el carrito, mostrando sus propiedades y metodos (como por ejemplo eliminarlos individualmente, L21).