import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './grid.css';
import User from './images/user.png';
function prueba() {
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


    )

}


export default prueba;
