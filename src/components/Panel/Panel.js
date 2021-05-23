import React, { Component, useEffect, useState } from "react";
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import './grid.css';
import Usuarios from './Usuario'
import { db, firebase, auth } from "./../../config/firebase.config";
import './Panel.css';
import Chat from '../Chat/Chat/Chat';
import { render } from "@testing-library/react";

function Panel() {
    const [searchTerm, setSearchTerm] = useState("");

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
    useEffect(() => {
        getUser();
    }, [])

    function countChat() {
        console.log("Entra correctamente")
        const db = firebase.firestore();
        console.log(auth.currentUser.displayName)
        const increment = firebase.firestore.FieldValue.increment(1);
        db.collection('panelchat').doc('esp19258@uvg.edu.gt').update({ closed: increment });

    }
    function failChat() {
        console.log("Entra correctamente")
        const db = firebase.firestore();
        console.log(auth.currentUser.displayName)
        const increment = firebase.firestore.FieldValue.increment(1);
        db.collection('panelchat').doc('esp19258@uvg.edu.gt').update({ fail: increment });

    }



    return (
        <div>


            <input type="text" className="buscador" placeholder="Buscar por estado" onChange={event => { setSearchTerm(event.target.value) }} />
            {
                users &&
                users
                    .filter(data => {

                        if (searchTerm == "") {

                            return data
                        } else if (data.status.toLowerCase().includes(searchTerm.toLowerCase())) {
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
                                            <button className="btnIniciar" >
                                                {data.status}
                                            </button>
                                            <button className="btnHistory" onClick={()=>{
                                                render(
                                                    <Chat chatId={data.id}/>
                                                )
                                                
                                            }}>
                                                START
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
                                            <button className="btnHistory" onClick={()=>{
                                                render(
                                                    <Chat chatId={data.id}/>
                                                )
                                                
                                            }}>
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
                                            <button onClick={failChat} className="btnCompleted">
                                                {data.status}
                                            </button>
                                            <button className="btnHistory" onClick={()=>{
                                                render(
                                                    <Chat chatId={data.id}/>
                                                )
                                                
                                            }}>
                                                HISTORY
                                            </button>
                                        </Col>
                                    </Row>
                                </Container>
                            )
                        }
                    })
            }
           
        </div >
    )
}

export default Panel;