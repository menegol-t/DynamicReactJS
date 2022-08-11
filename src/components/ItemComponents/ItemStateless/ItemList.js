import Item from "./Item"


const ItemList = ({ items }) => {
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

/*Recibe items de ItemListContainer L4. Los mete en una caja general de boostrap que viene 
por CDN en el HTML principal, y se los envia a Item uelos mete en una caja individual para
cada uno L10.*/