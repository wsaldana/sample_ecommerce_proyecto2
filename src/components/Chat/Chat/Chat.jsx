import React, {useEffect, useState} from "react";
import ChatInput from "../ChatInput/ChatInput";
import Message from "../Message/Message";
import "./Chat.css";


import { db, firebase, auth } from "../../../config/firebase.config";
import ChatHeader from "../ChatHeader/ChatHeader";


let counterTimer = 0;
let terminado = false;
const Chat = (props) => {

  const [mensajes, setMensajes] = useState([]);
  const [inputState, setInputState] = useState(false);
  const [chatState, setChatState] = useState("in progress");
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
        alert("Ha habido un error con la conexión")
        
      });
  }

  const sendMessages = async (text) => {
   
    await db.collection('chats').doc(props.chatId)
      .collection('mensajes').doc().set({
        content: text,
        sender: auth.currentUser.uid,
        time: firebase.firestore.FieldValue.serverTimestamp(),
      }).catch(error => {
        alert("Ha habido un error con la conexión")
        throw new Error('Error: Getting document:');
    })
      setTimerr();
  }

  const setFinalizado = async (state) => {
    if ((counterTimer === state) && (!terminado)){
      console.log(terminado)
      alert('Se ha terminado el tiempo del chat');
      setChatState("Finished");
      await db.collection('chats').doc(props.chatId).update({
        status:"Finished",
      })
      .catch(error => {
        alert("Ha habido un error con la conexión")
        throw new Error('Error: Updating document:');
    })
    }
  };

  const setTimerr = () => {
    const t = counterTimer + 1;
    setTimeout(()=>setFinalizado(t), 300000);
    counterTimer = t;
  }

  useEffect(() => {
    getMessages();
    getChatInfo();
    setTimerr();
    setInputState(chatState === "Finished");
    

  }, []);


  useEffect(() => {
    
    setInputState(chatState === "Finished");
    terminado = chatState === "Finished";
    
  }, [chatState]);


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
      <ChatInput send={sendMessages} estado={inputState}/>
    </div>
  );
}

export default Chat;
