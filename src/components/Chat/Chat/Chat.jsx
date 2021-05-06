import React from "react";
import ChatInput from "../ChatInput/ChatInput";
import Message from "../Message/Message";
import "./Chat.css";

export default function Chat(props) {
  const list = []
  for (let i = 0; i < 30; i++) {
    list.push(<Message
        isSender={true}
        content={"Este es un mensaje de ejemplo"}
      />)
  }
  return (
    <div className="chat-message-container">
      <div className="chat-banner">
        <h1 className="display-4">{"El Pepe"}</h1>
      </div>
      <div className="chat-message-container">
        {list}

      </div>
      <ChatInput />

    </div>
  )
}
