import React from "react";
import "./Message.css";

export default function Message(props) {
  const { content, isSender, time } = props;
  let typeOfMessage = "";
  if (isSender){
    typeOfMessage = "message-sender";
  } else {
    typeOfMessage = "message-receiver";
  }

  return (
    <div className={`d-flex align-items-end ${typeOfMessage}`}>
      <p className="m-0">{content}</p>
      <p className="time ms-3">{time}</p>
    </div>
  )
}
