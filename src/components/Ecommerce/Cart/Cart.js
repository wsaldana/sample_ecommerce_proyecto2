import React, {useEffect, useState} from 'react';
import './Cart.css';
import items from '../Shop/Shop';
// import { db, firebase } from "../../config/firebase.config"

const Cart = () => {
    const [order,setOrder] = useState([]);

    return(
        <div className="cartContainer">
            <div className="cartProductcs">
                <div className="Header">
                    <h2>Shopping Cart</h2>
                    <h3>Items: {items.length}</h3>
                    <div className="separator"></div>
                </div>
                <div id="cartList" className="itemsToBuy">
                    {/*items.map((product) => {
                        return(
                            <li>
                                <h1>{product.title}</h1>
                            </li>
                        )
                    })*/}
                </div>
            </div>

            <div className="orderSummary">
                <div className="Header">
                    <h2>Summary</h2>
                    <div className="separator"></div>
                </div>
                <div className="summary">
                    <h3>Items: {items.length}</h3>
                    <h3>Total: </h3>
                </div>
            </div>
        </div>
        
    )
}
export default Cart;