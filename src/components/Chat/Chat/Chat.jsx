import React, {useEffect, useState} from "react";
import ChatInput from "../ChatInput/ChatInput";
import Message from "../Message/Message";
import "./Chat.css";

import { db, firebase } from "../../../config/firebase.config";

const Chat = (props) => {

  // TODO cambiar el nombre del header del chat
  // TODO poner en algún lugar el estado del chat
  const [mensajes, setMensajes] = useState([]);


  const getMessages = async () => {
    db.collection('chats').doc(props.chatId)
      .collection('mensajes').orderBy('time')
      .onSnapshot(snapshot => {
        const mensajes = []
        snapshot.forEach(coso => {
          mensajes.push(coso.data());
        });
        setMensajes(mensajes);
      })
  }

  const sendMessages = async (text) => {
    await db.collection('chats').doc(props.chatId)
      .collection('mensajes').doc().set({
        content: text,
        sender: "io",
        time: firebase.firestore.FieldValue.serverTimestamp(),
      })
  }

  useEffect(() => {
    getMessages();
  }, []);


  return (
    <div className="chat-message-container">
      <div className="chat-banner">
        <h1 className="display-4">{"El Pepe"}</h1>
      </div>
      <div className="chat-message-container">
        {
          mensajes.map((mensaje) => {
            return <Message
              isSender={false}
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
