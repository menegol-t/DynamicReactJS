import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemNotAvaliable from '../ItemNotAvaliable';
import ItemList from './ItemList';

const ItemFilterList = ({info}) => {
    const {category} = useParams()
    const [items, setItems] = useState([])

    useEffect(()=>{
        if(category){
            setItems(info.filter((product) => product.categoria === category))
        }else{
            setItems(info)
        }
    }, [category, info])
    return (
        <>
        { items.length === 0 ? <ItemNotAvaliable/> : <ItemList items={items}/> }
        </>
    );
}

export default ItemFilterList;
