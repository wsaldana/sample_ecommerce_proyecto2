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
      badgeType = "bg-danger";
      badgeText = props.chatState;
      break;
  }

  return (
    <div className="chat-banner">
      <div className="userIcon">
        <h3 className="m-0">
          {props.title.charAt(0).toUpperCase()}{props.title.charAt(1).toUpperCase()}
        </h3>
      </div>
      <div className="ms-3 d-flex flex-column align-items-start">
        <p className="mb-1 display-7">{props.title.toUpperCase()}</p>
        <div className="d-flex align-items-center">
          <div className={`state me-1 ${badgeType}`}/>
          <p className="m-0">{badgeText.charAt(0).toUpperCase()}{badgeText.slice(1)}</p>
        </div>
      </div>
      {/*<span>Chat iniciado a las: &nbsp; {props.time}</span>*/}
      { (props.isChatFinished && props.isAdmin)? <button type="button" onClick={props.completeChat} className="btn btn-primary chat-btn">Completar</button>: null }
      {  (props.state ==='in progress' && !props.isAdmin)?<button type="button" onClick={props.abandonChat} className="btn btn-primary chat-btn">Finalizar</button>: null}
    </div>
  )
}
