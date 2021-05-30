import React, {useState, useEffect} from 'react';
import './Receipt.css';
import { db, auth } from "../../../config/firebase.config";
import { jsPDF } from 'jspdf';

const Receipt = () =>{
    
    const [sales, setSales] = useState([]);

    const fetchSales = async() =>{
        const response = db.collection("sales");
        const data = await response.get();
        data.docs.forEach((doc) => {
            if (doc.data().client === auth.currentUser.email) {
                setSales((oldArray) => [...oldArray, doc]);
            }
        });
    }

    useEffect(() => {
        fetchSales();
    }, []);

    const printReceipt = (theId) =>{
        //Se crea el pdf
        let pdf = new jsPDF();

        //Se le añade el titulo y el numero del recibo
        pdf.setFontSize(40);
        pdf.text(35, 25, '--- Ecommerce Store ---');
        pdf.setFontSize(30);
        pdf.text(35, 45, `Receipt #${theId.id}`);

        //Se le añaden los datos de compra
        pdf.setFontSize(20);
        pdf.text(35, 65, `Buyer:`);
        pdf.text(35, 75, `Items Purchased:`);
        pdf.text(35, 85, `Total:`);
        pdf.text(35, 95, `Date:`);
        pdf.text(35, 105, `Hour:`);

        //Se le añaden los datos de compra en otro color
        pdf.setTextColor(2, 117, 216);
        pdf.text(105, 65, `${theId.data().client}`);
        pdf.text(105, 75, `${theId.data().itemsPurchased}`);
        pdf.text(105, 85, `$${theId.data().total}`);
        pdf.text(105, 95, `${theId.data().date}`);
        pdf.text(105, 105, `${theId.data().time}`);

        //Se descarga el pdf
        pdf.save('receipt.pdf');

    }

    return(
        <div className='row justify-content-center receiptContainer'>
            {sales.map((item, index) =>{
                return(
                    <div key={`${index}+${item.id}`} className='col-3 justify-content-center receiptCont margin-zero' id={`#receipt-${item.id}`}>
                        <h2 className='col-12'>{`Receipt #${item.id}`}</h2>
                        <button className='col-12 btn btn-primary' type='button' onClick={() => printReceipt(item)}>Download PDF</button>
                        <h2 className='col-12'>{`Buyer: ${item.data().client}`}</h2>
                        <h3 className='col-12'>{`Items Purchased: ${item.data().itemsPurchased}`}</h3>
                        <h3 className='col-12'>{`Total: ${item.data().total}`}</h3>
                        <p className='col-12'>{`Date: ${item.data().date}`}</p>
                        <p className='col-12'>{`Hour: ${item.data().time}`}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Receipt;