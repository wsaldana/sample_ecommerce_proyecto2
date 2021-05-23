import React, {useEffect, useState} from "react";
//import ChatInput from "../ChatInput/ChatInput";
//import Message from "../Message/Message"; hace tus importaciones
//import "./Chat.css"; importa el css


import { db, firebase, auth } from "../../../config/firebase.config";
//import ChatHeader from "../ChatHeader/ChatHeader"; otro componente

const Chat = (props) => {

  const [chatState, setChatState] = useState("Finished");
  const [chatName, setChatName] = useState("El Pepe");

  const getMessages = async () => {
    db.collection('chats').doc(props.chatId)
      .collection('mensajes').orderBy('time')
      .onSnapshot((snapshot) => {
        const mensajes = []
        snapshot.forEach(document => {
          const documentData = document.data();
          documentData.id = document.id;
          mensajes.push(documentData);
        });
        setMensajes(mensajes);
      }, (error) => {
        console.log(error)
      })
  }


  useEffect(() => {
    getMessages();
  });


  return (
    <div className="chat-message-container">
      <ChatHeader title={chatName} chatState={chatState} />
      <div className="chat-message-container">
        {
          mensajes.map((mensaje) => {
            return <Message
              key={mensaje.id}
              isSender={mensaje.sender === auth.currentUser.uid}
              content={mensaje.content}
            />
          })
        }
      </div>
      <ChatInput send={sendMessages}/>
    </div>
  );
}

export default Chat;