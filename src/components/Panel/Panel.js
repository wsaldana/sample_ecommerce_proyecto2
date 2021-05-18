import React, { useEffect, useState } from "react";
//import { Container, Row, Col } from 'react-bootstrap';
import './grid.css';
import User from './images/user.png';
import { db, firebase, auth } from "./../../config/firebase.config";


var elements =[]
function Prueba() {
    
    const [elements, setElements] = useState([]);
    const getChat = async () => {
        db.collection('chats').get().then(querySnapshot=>{
            //const documents = querySnapshot.docs.map(doc=>doc.data())
            const documents = querySnapshot.docs.map((doc)=>{

                var id_client = doc.id
                
                
                var chat_status = doc.data().status
                
                
                var admEm = doc.data().adminEmail
                
                
                var clientEm = doc.data().clientEmail
               
                setElements(Usuarios(id_client,chat_status,clientEm))
                //elements.push(Usuarios(id_client,chat_status,clientEm))
               })
            //console.log(documents[0].users[0])
        })
       
          
    }
    useEffect(() => {
        getChat();
        //getChats();
        
      });
    console.log(elements)
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

function Usuarios(id,status,clientEm) {


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
       <div>Hola {clientEm}</div>
    )

}


export default Prueba;
