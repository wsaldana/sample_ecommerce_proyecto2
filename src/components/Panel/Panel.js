import React, { useEffect, useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import './grid.css';
import Usuarios from './Usuario'
import { db, firebase, auth } from "./../../config/firebase.config";
import './Panel.css';
import Chat from '../Chat/Chat/Chat.jsx';

class Panel extends React.Component {
    state = {
        users: null
    }
    componentDidMount() {
        
        db.collection('chats').get()
            .then(snapshot => {
            
                const usuarios = []
                snapshot.forEach(doc => {
                    const data = doc.data()
                    data.id = doc.id
                    usuarios.push(data)
                    
                })
                this.setState({ users: usuarios })
                
            })
    }
    countChat() {
        console.log("Entra correctamente")
        const db = firebase.firestore();
        console.log(auth.currentUser.displayName)
        const increment = firebase.firestore.FieldValue.increment(1);
        db.collection('panelchat').doc('esp19258@uvg.edu.gt').update({closed:increment});

    }


            
    render(){
        return (
            <div>

                {
                    this.state.users &&
                    this.state.users.map(data => {
                        if (data.status == "in progress") {
                            
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
                        } if (data.status == "fail") {
                            
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
                        } if (data.status == "completed") {
                            
                            return (
                                <Container fluid className="grid">
                                    <Row justify="between">
                                        <Col className="Usuarios">
                                            <h1>{data.clientEmail}</h1>
                                        </Col>
                                        <Col className="botones">
                                        <button onClick={this.countChat} className="btnCompleted">
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

}

export default Panel;