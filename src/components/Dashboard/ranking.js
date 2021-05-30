import React, { useEffect, useState } from "react";

import './rankign.css';
import {db, firebase, auth} from './config/firebase.config';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
//import {database} from 'firebase'
import {

  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";





function toPDF(){
 
    const input = document.getElementById('chartrankning');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG',300, 800,50,50);
        // pdf.output('dataurlnewwindow');
        pdf.save("charts.pdf");
      })
    ;
}


  

function Ranking() {

  const [users, setUser] = useState([]);
  function getUser() {
    db.collection('panelchat').onSnapshot((querySnapshot) => {
        const items = []
        querySnapshot.forEach((doc) => {
            const Data = doc.data();
            Data.id = doc.id
            
            items.push(Data)
        })
        setUser(items)
    })
  }
  useEffect(() => {
    getUser();
  }, [])
  const ddb= []
  for(var i =0 ; i<users.length;i++)
  {
    const e= Object.entries(users[i])
    ddb.push(e)
  }
  const inda=[]
for(var j=0; j<ddb.length;j++)
{
  for(var i =0; i<ddb[j].length;i++){
    if (ddb[j][i].indexOf("id")!=-1)
     {
       inda.push(ddb[j][i][1])
     }   
     
  }
}
const indc=[]
for(var j=0; j<ddb.length;j++)
{
  for(var i =0; i<ddb[j].length;i++){
    if (ddb[j][i].indexOf("closed")!=-1)
     {
       indc.push(ddb[j][i][1])
     }   
     
  }
}

  console.log(ddb)
  console.log(inda)
  console.log(indc)

  const datas=[]
  for(var i=0; i <inda.length;i++)
  {
    datas.push({name:inda[i],chats:indc[i]})
  }
  console.log(datas)
  let mensajes = []



 
 
 return (
   
    <div style={{ textAlign: "center" }} id="chartadminr">
      <h1></h1>
      <div className="App" id="chartrankning">
      {()=>toPDF()}
        <BarChart
          width={1200}
          height={300}
          data={datas}
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="chats" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
      </div>
      <button class="btn btn-accept" onClick= {toPDF} > Descarga pdf</button>
    </div>
  );
};

export default Ranking;
