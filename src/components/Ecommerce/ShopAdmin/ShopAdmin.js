import React, { useEffect, useState } from 'react';
import './shopAdmin.css';
import * as AiIcons from 'react-icons/ai';
import { db, firebase, auth } from "../../../config/firebase.config";
import { Link, useHistory } from 'react-router-dom';
import FormEdit from './FormEdit';

const EcommerceAdmin = () => {
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState([]);
    const [isAddEnabled, setIsAddEnabled] = useState(false);
    const [isEditEnabled, setIsEditEnable] = useState(false);
    const history = useHistory();

    const fetchProds = async () => {
        const response = db.collection('products');
        const data = await response.get();
        data.docs.forEach(item => {
            setProducts(oldArray => [...oldArray, item])
            setVisibleProducts((oldArray) => [...oldArray, item]);
        });
    }

    const EditProd = (datos) =>{
        /*history.push({
            pathname:'/admin/editProduct', 
            state: datos
        });*/
        setIsEditEnable(!isEditEnabled);
    }

    const AddProd = () =>{
        history.push('/admin/addProduct');
    }

    const deleteProducts = (item) => {
        db.collection('products').doc(item.id).delete().then(() => {
            alert("Product deleted Successfully.")
            window.location.reload();
        })
            .catch((error) => {
                console.error("Error removing product: ", error);
            });
    }

    const getQuantity = (index) => {
        //Se revisa que la cantidad sea menor a la estipulada
        let inputField = document.getElementById(`qty-${index}`);
        let val = inputField.value;
        let numeric;

        if (inputField.value === '' || inputField.value === 0) {
            inputField.value = 1;
        }
        try {
            numeric = parseInt(inputField.value);
            if (numeric > inputField.max) {
                inputField.value = inputField.max;
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            //Se cambia el texto del boton
            document.getElementById(`but-${index}`).innerHTML = `Add to Cart (${val})`;
        }
        return numeric;
    }

    useEffect(() => {
        fetchProds();
    }, []);

    const searchProduct = () => {
        let coming = document.getElementById("adminsearchBarInput");
        let search = coming.value.toUpperCase();
        if (search === "") {
            setVisibleProducts(products);
            console.log("No results.");
        } else {
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

    return (
        <div className='shopContainer'>
            <header className="row eShopHeader">
                <h1 className="col-7 eShopTitle align-middle ">Products</h1>
                <AiIcons.AiOutlineSearch className="col-3 justify-content-end lupaSearch" />
                <input onChange={() => searchProduct()} placeholder="Search" id="adminsearchBarInput" className="col-2 justify-content-end searchInput"></input>
            </header>
            <div className="row">
                <button className='col justify-content-center agregarP' type='button' onClick={() => AddProd()}>Add Product</button>
            </div>
            <div className='row'>
                {visibleProducts.map((datos, index) => {
                    return (
                        <div key={`${datos.data().Title} + ${index}`} className={datos.data().Qty > 0 ? 'col-3 eProductCard' : 'col-3 eProductCard disabled'}>
                            <h2 className='col align-middle productName '>{datos.data().Title}</h2>
                            <div className='row align-items-center'>
                                <img src={datos.data().img} className='col-12 align-middle productImage margin-zero' alt='imagen'></img>
                                <p className='col align-top prodDescription margin-zero'>{datos.data().descr}</p>
                            </div>
                            <div className='row align-items-center'>
                                <p className='col margin-zero'>{`${datos.data().Qty} in stock`}</p>
                            </div>
                            <div className='row align-items-center margin-zero'>
                                <h2 className='col-6 align-middle productPrice margin-zero'>{`$${datos.data().price}`}</h2>
                            </div>
                            <div className='row'>
                                <button className='col : editP' type='button' onClick={() => EditProd(datos.data())}>Edit Product</button> 
                                <button className='col : deleteP' type='button' onClick={() => deleteProducts(datos)}>Delete Product</button>
                            </div>
                            {isEditEnabled ? (<FormEdit info={datos}/>) : null}
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default EcommerceAdmin;