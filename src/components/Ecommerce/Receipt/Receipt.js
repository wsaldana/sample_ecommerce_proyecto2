import React, {useState, useEffect} from 'react';
import './Receipt.css';
import { db, firebase, auth } from "../../../config/firebase.config";
import html2canvas from "html2canvas";
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
        let paper = document.getElementById(`receipt-${theId}`);
        html2canvas(paper).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'JPEG', 0, 0);
            pdf.save("receipt.pdf");
        })
    }

    return(
        <div className='row justify-content-center receiptContainer'>
            {sales.map((item, index) =>{
                return(
                    <div key={`${index}+${item.id}`} className='col-5 justify-content-center receiptCont margin-zero' id={`receipt-${item.id}`}>
                        <h2 className='col-12'>{`Recibo No. ${item.id}`}</h2>
                        <button className='col-12 btn btn-primary' type='button' onClick={printReceipt(item.id)}>Descargar PDF</button>
                        <h2 className='col-12'>{`Usuario: ${item.data().client}`}</h2>
                        <h3 className='col-12'>{`Cantidad de productos: ${item.data().itemsPurchased}`}</h3>
                        <h3 className='col-12'>{`Total de compra: ${item.data().total}`}</h3>
                        <p className='col-12'>{`Fecha de compra: ${item.data().date}`}</p>
                        <p className='col-12'>{`Hora de compra: ${item.data().time}`}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Receipt;