import React, { useEffect, useState } from "react";
//import { Container, Row, Col } from 'react-bootstrap';
import './grid.css';
import User from './images/user.png';
import { db, firebase, auth } from "./../../config/firebase.config";

function Prueba() {
    const [chatState, setChatState] = useState("Finished");
    const getChats = async () => {
        db.collection('chats').doc("3U1KybtBjT3DSRcx6xjl")
          .onSnapshot((snapshot) => {
            const { status, clientEmail, adminEmail } = snapshot.data();
            setChatState(status);
    
            
          })
          console.log(chatState)
    }
    const getChat = async () => {
        db.collection('chats').get().then(querySnapshot=>{
            //const documents = querySnapshot.docs.map(doc=>doc.data())
            const documents = querySnapshot.docs.map((doc)=>{
                console.log(doc.id)
                console.log(doc.data().status)
                console.log(doc.data().adminEmail)
                console.log(doc.data().clientEmail)
               })
            //console.log(documents[0].users[0])
        })
       
          
    }
    useEffect(() => {
        getChat();
        //getChats();
      });
    const elements = [Usuarios(), Usuarios(), Usuarios(), Usuarios(), Usuarios(), Usuarios(), Usuarios(), Usuarios(), Usuarios(), Usuarios()];
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
