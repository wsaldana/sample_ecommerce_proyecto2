import React, { useEffect, useState } from "react";
//import { Container, Row, Col } from 'react-bootstrap';
import './grid.css';
import Usuarios from './Usuario'
import { db, firebase, auth } from "./../../config/firebase.config";



function Prueba() {
    const [elements, setElements] = useState([]);
    /*
    const getChat = async () => {
        db.collection('chats').get().then(querySnapshot=>{
            //const documents = querySnapshot.docs.map(doc=>doc.data())
            const documents = querySnapshot.docs.map((doc)=>{

                var id_client = doc.id
                
                
                var chat_status = doc.data().status
                
                
                var admEm = doc.data().adminEmail
                
                
                var clientEm = doc.data().clientEmail
                //elements.push(Usuarios(id_client,chat_status,clientEm))
                //elements.push(Usuarios(id_client,chat_status,clientEm))
               })
            //console.log(documents[0].users[0])
        })
       
          
    }
    */
    const getUsers = async () => {
        db.collection('chats').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                const InfoUser = doc.data()
                InfoUser.id = doc.id
                elements.push(InfoUser)
            })
            setElements(elements)
        })

    }

    useEffect(() => {
        //getChat();
        //getUsers();
        console.log(elements)
    });
    
    getUsers();
    
    return (
        <div className="divCentral">
            <ul>

                {
                    elements.map((doc) => {
                        return <Usuarios
                            key ={doc.id}
                            clientEmail={doc.clientEmail}
                            status={doc.status}
                            id={doc.id}
                        ></Usuarios>
                    })}
            </ul>
        </div >

    )

}

export default Prueba;
