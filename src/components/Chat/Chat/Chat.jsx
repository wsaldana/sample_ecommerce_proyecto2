import React, {useEffect, useState} from "react";
import ChatInput from "../ChatInput/ChatInput";
import Message from "../Message/Message";
import "./Chat.css";


import { db, firebase, auth } from "../../../config/firebase.config";
import ChatHeader from "../ChatHeader/ChatHeader";


let counterTimer = 0;

const Chat = (props) => {

  const [mensajes, setMensajes] = useState([]);
  const [chatState, setChatState] = useState("Finished");
  const [chatName, setChatName] = useState("Cargando...");


  const getChatInfo = async () => {
    db.collection('chats').doc(props.chatId)
      .onSnapshot((snapshot) => {
        const { status, clientEmail, adminEmail } = snapshot.data();
        setChatState(status);

        if (adminEmail === auth.currentUser.email) {
          setChatName(clientEmail.split('@')[0]);
        } else {
          setChatName(adminEmail.split('@')[0]);
        }
      });
  }


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
        setTimerr();
      }, (error) => {
        console.log(error)
      });
  }

  const sendMessages = async (text) => {
   
    await db.collection('chats').doc(props.chatId)
      .collection('mensajes').doc().set({
        content: text,
        sender: auth.currentUser.uid,
        time: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setTimerr();
  }

  const setFinalizado = (state) => {
    if (counterTimer === state){
      alert('Se termino el tiempo');
    }
  };

  const setTimerr = () => {
    const t = counterTimer + 1;
    setTimeout(()=>setFinalizado(t), 10000);
    counterTimer = t;
  }

  useEffect(() => {
    getMessages();
    getChatInfo();
    setTimerr();
  }, []);


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
