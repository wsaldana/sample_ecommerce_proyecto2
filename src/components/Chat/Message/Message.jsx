import React from "react";
import "./Message.css";

export default function Message(props) {
  const { content, isSender } = props;
  let typeOfMessage = "";
  if (isSender){
    typeOfMessage = "message-sender bg-primary";
  } else {
    typeOfMessage = "message-receiver bg-secondary";
  }

  return (
    <div className={typeOfMessage}>
      {content}
    </div>
  )
}
