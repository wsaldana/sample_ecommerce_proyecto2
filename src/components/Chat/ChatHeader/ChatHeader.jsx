import React from "react";
import "./ChatHeader.css";

export default function ChatHeader(props) {
  let badgeType;
  let badgeText;

  switch (props.chatState) {
    case "finished":
      badgeType = "bg-success";
      badgeText = "Finished";
      break;
    case "in progress":
      badgeType = "bg-warning";
      badgeText = "In Progress";
      break;
    default:
      badgeType = "bg-info";
      badgeText = props.chatState;
      break;
  }

  return (
    <div className="chat-banner">
      <h1 className="display-4">
        {props.title}
        <span className={`badge rounded-pill ms-3 ${badgeType}`}>{badgeText}</span>
        
      </h1>
      <span>Chat iniciado a las: &nbsp; {props.time}</span>
      { (props.isChatFinished && props.isAdmin)? <button type="button" onClick={props.completeChat} className="btn btn-secondary">Finalizar</button>: null }
      { (!props.isAdmin && !(props.isChatCompleted || props.isChatFinished))? <button type="button" onClick={props.abandonChat} className="btn btn-secondary">YEET</button>: null }
    </div>
  )
}
