import React, { useEffect, useState } from "react";
//import { Container, Row, Col } from 'react-bootstrap';
import './grid.css';
import Usuarios from './Usuario'
import { db, firebase, auth } from "./../../config/firebase.config";

class Panel extends React.Component {
  state = {
      users:null
  }
  componentDidMount(){
      console.log("Perroooooooooooos")
      db.collection('chats').get()
      .then(snapshot =>{
          const usuarios = []
          snapshot.forEach(doc=>{
              const data = doc.data()
              data.id = doc.id
              usuarios.push(data)
          })
          this.setState({users:usuarios})
      })
  }
  render(){
      return(
          <div>
              {
                  this.state.users &&
                  this.state.users.map(data =>{
                      return (
                        <Usuarios 
                        clientEmail={data.clientEmail}
                        status={data.status}
                        id={data.id}
                        />
                      )
                  })
              }
          </div>
      )
  }

}
/*
function Prueba() {
    const [elements, setElements] = useState([]);
    //var elements = []
    var oldElements = []
    const getUsers = async () => {
        //setElements([])
        db.collection('chats').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                const InfoUser = doc.data()
                InfoUser.id = doc.id
               
                setElements(elements.concat(InfoUser))
                    
            })
            //setElements(elements)
        })

    }

    useEffect(() => {
        //getChat();
        //setInterval(getUsers, 5000);
        getUsers()
        console.log(elements)
        console.log(oldElements)
        
    });
    
    
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
*/
export default Panel;