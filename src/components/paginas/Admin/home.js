import React, { useState, useEffect } from "react";
import Panel from '../../Panel/Panel.js';
import Chat from '../../Chat/Chat/Chat'
//<Chat chatId ="3U1KybtBjT3DSRcx6xjl"/>  <h1>{ID}</h1>
function Home() {
  const [ID, setId] = useState("D3dwXmbrFtYXIeHlgu89");
  const [OldID, setOldId] = useState("");
  function handlePanel(id) {
    setOldId(ID)
    setId(id)
   
  }
  function ChatR(){
    if(OldID===ID){
      return(
        <Chat chatId ={OldID}/>
      )
      
    }
    if(OldID!=ID){
      return(
        <h1>Loading ...</h1>
      )
      
    }
    
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setOldId(ID)
    }, 500);
    return () => clearInterval(interval);
    
  }, ID)

  return (
    <div className="RowHomePanel">
      <div  className="ColHomePanel">
        <Panel home={handlePanel} />
      </div>
      <div  className="ColHomePanel">
        {ChatR()}
      </div>
    </div>
  );
}

export default Home;