import Item from "./Item"


const ItemList = ({ items }) => {
    /*Recibe items de ItemListContainer que los primeros dos segundos es
    un array vacio, y despues se rellena con la info de un JSON*/

    console.log(items)
    return (
        <section>
            <div className="container-fluid">
                <div className="row" id="divProductos">
                    {items.map((item) => 
                        <Item key={item.id} item={item}/>
                    )}
                    {/*Por cada objeto que recibe del array, lo mete en un Item con
                    su propia key, y pasa el objeto indiviaulmente al componente Item. */}
                </div>
            </div>
        </section>
        
    )
}

export default ItemList