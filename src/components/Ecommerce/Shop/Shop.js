import React, {useEffect, useState} from 'react';
import './Shop.css';
import * as AiIcons from 'react-icons/ai';
import { db, firebase } from "../../../config/firebase.config";
import { Link, useHistory } from 'react-router-dom';

const Ecommerce = () => {
    const [products, setProducts] = useState([]);
    
    const history = useHistory();
    
    const fetchProds = async() =>{
        const response = db.collection('products');
        const data = await response.get();
        data.docs.forEach(item =>{
            setProducts(oldArray => [...oldArray, item.data()])
        });
    }

    useEffect(() =>{
        fetchProds();
    }, [])

    const addToCart = (item, cuantity) =>{
        //Se envia la informacion del item seleccionado
        history.push('/user/cart', [item, cuantity]);

    }

    const getQuantity = (index) =>{
        //Se revisa que la cantidad sea menor a la estipulada
        let inputField = document.getElementById(`qty-${index}`);
        let val = inputField.value;
        let numeric;
        
        if(inputField.value === ''){
            inputField.value = 1;
        } 

        try{
            numeric = parseInt(inputField.value);
            if(numeric > inputField.max){
                inputField.value = inputField.max;
            }
        }
        catch(error){
            console.log(error);
        }
        finally{
            //Se cambia el texto del boton
            document.getElementById(`but-${index}`).innerHTML = `Add to Cart (${val})`;
        }
        return numeric;
    }

    return (
        <div className='shopContainer'>
            <header className='eShopHeader'>
            <h1 className='eShopTitle'>Products</h1>
            </header>
            <ul className='custom-ul'>
                {products.map((datos, index) => {
                    return (
                        <div key={`${datos.Title} + ${index}`} className={datos.Qty > 0 ? 'row eProductCard' : 'row eProductCard disabled'}>
                            <img src={datos.img} className='col-12 align-middle productImage margin-zero' alt='imagen'></img>
                            <div className='row align-items-center'>
                                <h2 className='col productName margin-zero'>{datos.Title}</h2>
                                <p className='col margin-zero'>{`${datos.Qty} in stock`}</p>
                            </div>
                            <div className='row align-items-center'>
                                <p className='col-12 align-middle prodDescription margin-zero'>{datos.descr}</p>
                            </div>
                            <div className='row align-items-center margin-zero'>
                                <h2 className='col-6 align-middle productPrice margin-zero'>{`$${datos.price}`}</h2>
                                <div className='col-6 align-middle margin-zero'>
                                    {datos.Qty > 0 ?
                                        <input id={`qty-${index}`} className='col-12 qtyInput' type='number' min='1' max={`${datos.Qty}`} 
                                        autoComplete='off' defaultValue='1' onChange={() => getQuantity(index)} onKeyDown={() =>{return false}}/> :
                                        <input id={`qty-${index}`} className='col-12 qtyInput' type='number' min='0' max={`${datos.Qty}`} 
                                        autoComplete='off' defaultValue='0' disabled/>}
                                </div>
                            </div>
                            {datos.Qty > 0 ? 
                            <button className='addBtn' id={`but-${index}`} type='button' onClick={() => addToCart(datos, getQuantity(index))}>Add to Cart (1)</button> :
                            <button type='button' disabled>Sold Out</button>
                            }
                        </div>
                    );
                })}
            </ul>
        </div>
    )
}

export default Ecommerce;