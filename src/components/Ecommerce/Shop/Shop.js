import React, {useEffect, useState} from 'react';
import './Shop.css';
import * as AiIcons from 'react-icons/ai';
import { db, firebase } from "../../../config/firebase.config";
import { Link } from 'react-router-dom';

export const items = [];

const Ecommerce = () => {
    const [products, setProducts] = useState([]);
    const fetchProds = async() =>{
        const response = db.collection('products');
        const data = await response.get();
        data.docs.forEach(item =>{
            setProducts(oldArray => [...oldArray,item.data()])
        });
    }

    useEffect(() =>{
        fetchProds();
    }, [])

    const addToCart = (item) =>{
        /*
        let cart = document.getElementById("cartList");
        let titulo = document.createElement("h1");
        titulo.innerHTML = item.title;
        cart.appendChild(titulo);*/
        
    }

    return (
        <div className='shopContainer'>
            <h1 className='eShopTitle'>Productos</h1>
            <ul className='custom-ul'>
                {products.map((datos) => {
                    return (
                        <li key = {datos.id} className='row eProductCard'>
                            <img src={datos.img} className='col-12 productImage' alt='imagen'></img>
                            <h2 className='col-12 productName'>{datos.title}</h2>
                            <p className='col-12 prodDescription'>{datos.descr}</p>
                            <h2 className='col-6 align-middle productPrice'>{datos.price}</h2>
                            <AiIcons.AiOutlineShoppingCart className='col-6 align-middle eCart' />
                            <button type='button' onClick={addToCart(datos)}>Agregar al Carrito</button>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default {Ecommerce, items};