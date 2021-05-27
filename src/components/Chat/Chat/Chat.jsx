import React, {useEffect, useState} from "react";
import ChatInput from "../ChatInput/ChatInput";
import Message from "../Message/Message";
import "./Chat.css";


import { db, firebase, auth } from "../../../config/firebase.config";
import ChatHeader from "../ChatHeader/ChatHeader";
//IMPORTANTE
//Estados

//Finished: significa que el usuario abandono o se le acabo el tiempo
//completed: que el administrador dio por concluido el chat
//in progress: El chat ha iniciado o esta en progreso

let counterTimer = 0;
let terminado = false;
const Chat = (props) => {

  const month_name = [
    "JAN", "FEB", "MAR",
    "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP",
    "OCT", "NOV", "DEC"
  ];

  const [mensajes, setMensajes] = useState([]);
  const [inputState, setInputState] = useState(false);
  const [chatState, setChatState] = useState("in progress");
  const [chatName, setChatName] = useState("Cargando...");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isChatFinished, setIsChatFinished] = useState(true);
  const [isChatCompleted, setIsChatCompleted] = useState(true);


  const getChatInfo = async () => {
    db.collection('chats').doc(props.chatId)
      .onSnapshot((snapshot) => {
        const { status, clientEmail, adminEmail } = snapshot.data();
        setChatState(status);

        if (adminEmail === auth.currentUser.email) {

          setChatName(clientEmail.split('@')[0]);
        } else {
          setChatName(adminEmail.split('@')[0]);
          setIsAdmin(true)
          //aquí trigger si es admin
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
      alert('Se ha Finalizado el chat por tiempo');
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


  const completeChat = async () => {
    await db.collection('chats').doc(props.chatId).update({
      status:"completed",
    })
    .catch(error => {
      alert("Ha habido un error con la conexión")
      throw new Error('Error: Updating document:');
  })};


  const abandonChat = async () => {
    await db.collection('chats').doc(props.chatId).update({
      status:"Finished",
    })
    .catch(error => {
      alert("Ha habido un error con la conexión")
      throw new Error('Error: Updating document:');
  })};


  useEffect(() => {
    getMessages();
    getChatInfo();
    setTimerr();
    //setInputState(chatState === "Finished");


  }, []);


  useEffect(() => {
    setInputState((chatState === "Finished")||(chatState === "completed")||(chatState === "fail"));
    terminado = ((chatState === "Finished")||(chatState === "completed")||(chatState === "fail"));
    setIsChatFinished(chatState === "Finished");
    setIsChatCompleted(chatState === "completed");

  }, [chatState]);


  return (
    <div className="chat-container">
      <ChatHeader
        title={chatName}
        chatState={chatState}
        isAdmin={isAdmin}
        isChatCompleted={isChatCompleted}
        isChatFinished={isChatFinished}
        completeChat={() => completeChat()}
        abandonChat={() => abandonChat()}
      />
      <div className="chat-message-container">
        <p className="text-center"> {mensajes.length > 0 ?
          month_name[mensajes[0].time.toDate().getMonth()] +' '+ mensajes[0].time.toDate().getDate() +', '+ mensajes[0].time.toDate().getFullYear() : 'No hay mensajes'}</p>
        {
          mensajes.map((mensaje) => {
            return <Message
              key={mensaje.id}
              isSender={mensaje.sender === auth.currentUser.uid}
              content={mensaje.content}
              time={mensaje.time !== null? mensaje.time.toDate().toLocaleTimeString(): ''}

            />
          })
        }
      </div>
      <ChatInput send={sendMessages} estado={inputState}/>
    </div>
  );
}

export default Chat;
