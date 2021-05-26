import React, { useEffect, useState } from "react";
import "./Shop.css";
import { db, auth } from "../../../config/firebase.config";
import { useHistory } from "react-router-dom";
import * as AiIcons from "react-icons/ai";

const Ecommerce = () => {
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState([]);

    const fetchProds = async () => {
        const response = db.collection("products");
        const data = await response.get();
        data.docs.forEach((item) => {
            setProducts((oldArray) => [...oldArray, item]);
            setVisibleProducts((oldArray) => [...oldArray, item]);
        });
    };

    const addToCart = (item, cuantity) => {
        let totall = item.data().price * cuantity;
        let now = new Date();
        let nowtime =
            now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
        //Se envia la informacion del item seleccionado a la base de datos
        if (cuantity > 0) {
            db.collection("order").doc().set({
                orderedBy: auth.currentUser.email,
                prodId: item.id,
                prodTitle: item.data().Title,
                prodImg: item.data().img,
                prodPrice: item.data().price,
                qty: cuantity,
                total: totall,
                date: now.toLocaleDateString(),
                time: nowtime,
            });
            alert("El pedido se agregó al carrito exitosamente.");
        } else {
            alert("Quantity not valid.");
        }
    };

    const getQuantity = (index) => {
        //Se revisa que la cantidad sea menor a la estipulada
        let inputField = document.getElementById(`qty-${index}`);
        let val = inputField.value;
        let numeric;

        if (inputField.value === "" || inputField.value === 0) {
            inputField.value = 1;
        }

        try {
            numeric = parseInt(inputField.value);
            if (numeric > inputField.max) {
                inputField.value = inputField.max;
            }
        } catch (error) {
            console.log(error);
        } finally {
            //Se cambia el texto del boton
            document.getElementById(
                `but-${index}`
            ).innerHTML = `Add to Cart (${val})`;
        }
        return numeric;
    };

    useEffect(() => {
        fetchProds();
    }, []);

    const searchProduct = () => {
        let coming = document.getElementById("searchBarInput");
        let search = coming.value.toUpperCase();
        if (search === "") {
            setVisibleProducts(products);
            console.log("No results.");
        }else{
            setVisibleProducts([]);
            products.forEach((prod) => {
                let product = prod.data().Title;
                let prodUpper = product.toUpperCase();
                let category = prod.data().category;
                let catUpper = category.toUpperCase();
                if (prodUpper.includes(search) || catUpper.includes(search)) {
                    setVisibleProducts((oldArray) => [...oldArray, prod]);
                }
            });
        }
    };
    
    const filterByPrice = () =>{
        let minPrice = parseFloat(document.getElementById("minAmmount").value)
        let maxPrice = parseFloat(document.getElementById("maxAmmount").value)
        if (minPrice === 0 && maxPrice === 0) {
            setVisibleProducts(products);
            console.log("No results.");
        }else{
            setVisibleProducts([]);
            products.forEach((prod) => {
                if (minPrice <= prod.data().price && prod.data().price < maxPrice) {
                    console.log(minPrice)
                    console.log(maxPrice)
                    console.log(prod.data().price)
                    setVisibleProducts((oldArray) => [...oldArray, prod]);
                }
            });
        }
        
    }

    return (
        <div className="shopContainer">
            <header className="row eShopHeader">
                <input onChange={() => filterByPrice()} type="number" step='0.01' min='0' placeholder='Min' id="minAmmount" className='col-1 priceLimits'></input>
                <input onChange={() => filterByPrice()} type="number" step='0.01' min='0' placeholder='Max' id="maxAmmount" className='col-1 priceLimits'></input>
                <h1 className="col-5 eShopTitle align-middle ">Products</h1>
                <AiIcons.AiOutlineSearch className="col-3 justify-content-end lupaSearch" />
                <input
                    onChange={() => searchProduct()}
                    placeholder="Search"
                    id="searchBarInput"
                    className="col-2 justify-content-end align-middle searchInput"
                ></input>
            </header>
            <div className="row">
                {visibleProducts.map((datos, index) => {
                    return (
                        <div
                            key={`${datos.data().Title} + ${index}`}
                            className={
                                datos.data().Qty > 0
                                    ? "col-5 eProductCard"
                                    : "col-5 eProductCard disabled"
                            }
                        >
                            <h2 className="col align-middle productName ">
                                {datos.data().Title}
                            </h2>
                            <div className="row align-items-center">
                                <img
                                    src={datos.data().img}
                                    className="col-12 align-middle productImage margin-zero"
                                    alt="imagen"
                                ></img>
                                <p className="col align-top prodDescription margin-zero">
                                    {datos.data().descr}
                                </p>
                            </div>
                            <div className="row align-items-center">
                                <p className="col margin-zero">{`${datos.data().Qty
                                    } in stock`}</p>
                            </div>
                            <div className="row align-items-center margin-zero">
                                <h2 className="col-6 align-middle productPrice margin-zero">{`$${datos.data().price
                                    }`}</h2>
                                <div className="col-6 align-middle justify-content-center margin-zero">
                                    {datos.data().Qty > 0 ? (
                                        <input
                                            id={`qty-${index}`}
                                            className="col-12 qtyInput"
                                            type="number"
                                            min="1"
                                            max={`${datos.data().Qty}`}
                                            autoComplete="off"
                                            defaultValue="1"
                                            onChange={() => getQuantity(index)}
                                            onKeyDown={() => {
                                                return false;
                                            }}
                                        />
                                    ) : (
                                        <input
                                            id={`qty-${index}`}
                                            className="col-12 qtyInput"
                                            type="number"
                                            min="0"
                                            max={`${datos.data().Qty}`}
                                            autoComplete="off"
                                            defaultValue="0"
                                            disabled
                                        />
                                    )}
                                </div>
                            </div>
                            {datos.data().Qty > 0 ? (
                                <button
                                    className="addBtn"
                                    id={`but-${index}`}
                                    type="button"
                                    onClick={() => addToCart(datos, getQuantity(index))}
                                >
                                    Add to Cart (1)
                                </button>
                            ) : (
                                <button type="button" disabled>
                                    Sold Out
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Ecommerce;
