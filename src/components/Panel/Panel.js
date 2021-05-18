import React, { useEffect, useState } from "react";
//import { Container, Row, Col } from 'react-bootstrap';
import './grid.css';
import User from './images/user.png';
import { db, firebase, auth } from "./../../config/firebase.config";

const elements =[]

function Prueba() {
    
    const getChat = async () => {
        db.collection('chats').get().then(querySnapshot=>{
            //const documents = querySnapshot.docs.map(doc=>doc.data())
            const documents = querySnapshot.docs.map((doc)=>{

                var id_client = doc.id
                elements.push(id_client)
                
                var chat_status = doc.data().status
                elements.push(chat_status)
                
                var admEm = doc.data().adminEmail
                elements.push(admEm)
                
                var clientEm = doc.data().clientEmail
                elements.push(clientEm)

               })
            //console.log(documents[0].users[0])
        })
       
          
    }
    useEffect(() => {
        getChat();
        console.log(elements)
        //getChats();
      });
    
    return (
        <div className="divCentral">
            <ul>
                {elements.map((value, index) => {
                    return <div key={index}>{value}</div>
                })}
            </ul>
        </div >

    )
}

function Usuarios() {


    return (
        /*
        <Container fluid className="grid">
            <Row justify="between">
                <Col className="Usuarios">

                    <h1>User Name</h1>
                    <p> CHAT</p>
                    <img src={User} />



                </Col>
                <Col className="botones">

                    <button className="btnEstado">
                        START
                    </button>
                    <button className="btnIniciar">
                        COMPLETED
                    </button>
                    <button className="btnFail">
                        FAILED
                    </button>
                    <button className="btnHistory">
                        HISTORY
                    </button>

                </Col>

            </Row>



        </Container>
        */
       <div>Hola Mundo</div>
    )

}


export default Prueba;
