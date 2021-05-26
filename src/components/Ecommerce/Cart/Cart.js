import React, { useEffect, useState } from "react";
import "./Cart.css";
import items from "../Shop/Shop";
import { useHistory } from 'react-router-dom';
import { db, firebase, auth } from "../../../config/firebase.config";

const Cart = () => {
    const [order, setOrder] = useState([]);
    const [totalPrices, setTotalPrices] = useState([]);
    const history = useHistory();
    
    const updateCart = async () => {
        const response = db.collection("order");
        const data = await response.get();
        data.docs.forEach((doc) => {
            if (doc.data().orderedBy === auth.currentUser.email) {
                setOrder((oldArray) => [...oldArray, doc]);
                setTotalPrices((oldArray) => [...oldArray, doc.data().total]);
            }
        });
    };

    useEffect(() => {
        updateCart();
    }, []);

    const getTotal = () => {
        let result = 0;
        totalPrices.forEach((price) => {
            result += parseFloat(price);
        });
        return result.toFixed(2);
    };

    const getTotalItems = () =>{
        let result = 0;
        order.forEach(elem =>{
            result += elem.data().qty;
        })
        return result;
    }

    const checkOut = async () => {
        //Restar la cantidad comprada de cada producto de la base de datos y borrar las ordenes de la coleccion 'order'
        //Hacer un recibo de la transaccion y almacenarlo en la coleccion 'receipt'
        let totalMoney = getTotal();
        let now = new Date();
        let nowtime = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds()
        const response = db.collection("order");
        const data = await response.get();
        const responseprods = db.collection("products");
        const dataprods = await responseprods.get();
        data.docs.forEach((doc) => {
            if (doc.data().orderedBy === auth.currentUser.email) {
                dataprods.docs.forEach((item) => {
                    if (item.id === doc.data().prodId) {
                        let initQuant = parseInt(item.data().Qty);
                        let finalQuant = initQuant - doc.data().qty;
                        let finalQuantI = parseInt(finalQuant);
                        db.collection("products").doc(item.id).update({
                            Qty: finalQuantI,
                        });
                    }
                });
                response.doc(doc.id).delete();
            }
        })

        db.collection('sales').doc().set({
            client: auth.currentUser.email,
            itemsPurchased: getTotalItems(),
            total: totalMoney,
            date: now.toLocaleDateString(),
            time: nowtime
        });

        alert("Thanks for your purchase. :)");

        history.push('/user/receipt');
    };

    const cancelOrder = (toDel) => {
        //Se borra la orden de la colecicon 'order'
        db.collection("order")
            .doc(toDel.id)
            .delete()
            .then(() => {
                window.location.reload();
                alert("Order deleted successfully.");
            })
            .catch((error) => {
                console.error("Error removing order: ", error);
            });
    };

    return (
        <div className="cartContainer">
            <div className="mainCart">
                <div className="row tableHeader">
                    <h4 className="col-4">Item</h4>
                    <h4 className="col-4">Quantity</h4>
                    <h4 className="col-4">Cost</h4>
                </div>
                <div className="separatorOne"></div>
                <div className="cartList">
                    <div className="cartProducts">
                        {order.map((item, index) => {
                            return (
                                <div
                                    key={`${item.data().orderedBy} + ${item.id} + ${index} + ${order.length
                                        }`}
                                    className="cartProduct margin-zero"
                                >
                                    <div className="row align-items-center prodInfo">
                                        <h2 className="col-4 prodTitleCart align-self-center margin-zero padding-zero">
                                            {item.data().prodTitle}
                                        </h2>
                                        <p className="col-4 prodQtyCart align-self-center margin-zero padding-zero">{`${item.data().qty
                                            }`}</p>
                                        <h2 className="col-4 prodPriceCart align-self-center margin-zero padding-zero">{`$${item.data().total.toFixed(2)
                                            }`}</h2>
                                    </div>
                                    <button
                                        className="row justify-content-center align-items-center cartDelete margin-zero"
                                        onClick={() => cancelOrder(item)}>
                                        Eliminar</button>
                                </div>
                            );
                        })}
                    </div>
                    <div className="separatorTwo"></div>
                </div>
            </div>

            <div className="orderSummary">
                <div className="Header">
                    <h2>Summary</h2>
                    <div className="separator"></div>
                </div>
                <div className="summary">
                    <h3>{`Items: ${getTotalItems()}`}</h3>
                    <h3>{`Total: $${parseFloat(getTotal()).toFixed(2)}`}</h3>
                    <button className="btn btn-primary checkoutButton" onClick={checkOut}>
                        Proceed to Checkout
        </button>
                </div>
            </div>
        </div>
    );
};
export default Cart;
