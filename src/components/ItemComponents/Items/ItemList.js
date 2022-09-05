import Item from "./Item"

const ItemList = ({ items }) => {
    return (
        <section>
            <div className="container-fluid">
                <div className="row" id="divProductos">
                    {items.map((item) => 
                        <Item key={item.id} item={item}/>
                    )}
                </div>
            </div>
        </section>
        
    )
}

export default ItemList