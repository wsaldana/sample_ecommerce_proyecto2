import { render } from "@testing-library/react";
import React from "react";
import User from './images/user.png';
import Chat from '../Chat/Chat/Chat'


class Usuarios extends React.Component {

    state = {
        clientEmail: this.props.clientEmail,
        status: this.props.status,
        id: this.props.id,
        clicked: false
    }
    //    this.handleClick = this.handleClick.bind(this);


    

render() {
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

        //NO borrar 
       <button onClick={()=>{this.setState({clicked:true})}} />
            {this.state.clicked ? <Chat chatID={this.state.id} /> : null}
       */
        <div>
            Hola {this.state.clientEmail}
           
            
        </div>

    )

}


}

export default Usuarios;