import React from "react";
import User from './images/user.png';

export default function Usuarios(props) {

    const { clientEmail, status,id } = props;
    console.log(clientEmail)
    console.log(status)
    console.log(id)
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
        <div>Hola {clientEmail}</div>
    )
}