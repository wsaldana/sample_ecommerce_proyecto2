import React, {useEffect, useState} from 'react';
import './Cart.css';
import items from '../Shop/Shop';
import {useLocation} from 'react-router-dom';
// import { db, firebase } from "../../config/firebase.config"

const Cart = () => {
    const [order,setOrder] = useState([]);

    const currentLocation = useLocation();

    const updateCart = () =>{
        if(currentLocation.state){
            let newElement = {
                Title: currentLocation.state[0].Title,
                descr: currentLocation.state[0].descr,
                img: currentLocation.state[0].img,
                price: currentLocation.state[0].price,
                Qty: currentLocation.state[0].Qty,
                index: currentLocation.state[1]
            }
            setOrder(oldArray => [...oldArray, newElement])
        }
    }

    updateCart();

    return(
        <div className="cartContainer">
            <div className="cartProducts">
                <div className="Header">
                    <h2>Shopping Cart</h2>
                    <h3>Items: {items.length}</h3>
                    <div className="separator"></div>
                </div>
                <div id="cartList" className="itemsToBuy">
                    <ul>
                        {order.map((item,index) =>{
                            return(
                                <div key={`${order.Title} + ${index}`} className='row cartProduct'>
                                    <img src={order.img} className='col-12 align-middle inCartImg'></img>
                                    <h2>{order.Title}</h2>
                                </div>
                            )
                        })}
                    </ul>
                </div>
            </div>

            <div className="orderSummary">
                <div className="Header">
                    <h2>Summary</h2>
                    <div className="separator"></div>
                </div>
                <div className="summary">
                    <h3>Items: {order.length}</h3>
                    <h3>Total: </h3>
                </div>
            </div>
        </div>
        
    )
}
export default Cart;