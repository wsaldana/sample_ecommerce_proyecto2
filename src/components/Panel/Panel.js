import React, { useEffect, useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import './grid.css';
import Usuarios from './Usuario'
import { db, firebase, auth } from "./../../config/firebase.config";
import './Panel.css';
import Chat from '../Chat/Chat/Chat.jsx';

function Panel() {

    const [users, setUser] = useState([]);
    function getUser() {
        db.collection('chats').onSnapshot((querySnapshot) => {
            const items = []
            querySnapshot.forEach((doc) => {
                const Data = doc.data();
                Data.id = doc.id
                items.push(Data)
            })
            setUser(items)
        })
    }
    useEffect(() =>{
        getUser();
    },[])

    function countChat() {
        console.log("Entra correctamente")
        const db = firebase.firestore();
        console.log(auth.currentUser.displayName)
        const increment = firebase.firestore.FieldValue.increment(1);
        db.collection('panelchat').doc('esp19258@uvg.edu.gt').update({ closed: increment });

    }




    return (
        <div>

            {
                users &&
                users
                    .filter(data => {
                        const estado = ""
                        if(estado.length>0){
                            return data.status === "completed"
                        }
                        else{
                            return data
                        }
                        
                    })
                    .map(data => {
                        if (data.status === "in progress") {
                            return (
                                <Container fluid className="grid">
                                    <Row justify="between">
                                        <Col className="Usuarios">

                                            <h1>{data.clientEmail}</h1>
                                        </Col>
                                        <Col className="botones">
                                            <button className="btnIniciar">
                                                {/* onClick={handleClick(data.id)}> */}
                                                {data.status}
                                                {/* <Chat chatId={D3dwXmbrFtYXIeHlgu89} /> */}
                                            </button>
                                            <button className="btnHistory">
                                                HISTORY
                                            </button>
                                        </Col>
                                    </Row>
                                </Container>
                            )
                        } if (data.status === "fail") {

                            return (
                                <Container fluid className="grid">
                                    <Row justify="between">
                                        <Col className="Usuarios">
                                            <h1>{data.clientEmail}</h1>
                                        </Col>
                                        <Col className="botones">
                                            <button className="btnFail">
                                                {data.status}
                                            </button>
                                            <button className="btnHistory">
                                                HISTORY
                                            </button>
                                        </Col>
                                    </Row>
                                </Container>
                            )
                        } if (data.status === "completed") {

                            return (
                                <Container fluid className="grid">
                                    <Row justify="between">
                                        <Col className="Usuarios">
                                            <h1>{data.clientEmail}</h1>
                                        </Col>
                                        <Col className="botones">
                                            <button onClick={countChat} className="btnCompleted">
                                                {data.status}
                                            </button>
                                            <button className="btnHistory">
                                                HISTORY
                                            </button>
                                        </Col>
                                    </Row>
                                </Container>
                            )
                        }

                        /* function handleClick(chat_id){
                            return (
                                <Chat chatId={chat_id} />
                              );
                        } */

                    })
            }
        </div>
    )


}

export default Panel;